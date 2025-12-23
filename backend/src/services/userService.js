const path = require("path");

//moving 2 dir up to find the .env file
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  findUserByUsername,
  storeCreatedUser,
  findUserById,
} = require("../repositories/userRepository");
const { isEmailValid } = require("../utils/externalApis");
const {
  ValidationError,
  ExternalServiceError,
  ConflictError,
  NotFoundError,
} = require("../utils/customErrors");
const { TaskRepository } = require("../repositories/taskRepository");
const { CategoryRepository } = require("../repositories/categoryRepository");
const { SubtaskRepository } = require("../repositories/subtaskRepository");

//@Creates users
//@checks whether the user exists
//@Hashing the users password
async function createUser(username, email, password) {
  const emailCheck = await isEmailValid(email);
  if (!emailCheck.valid) {
    if (emailCheck.isServiceError) {
      throw new ExternalServiceError(emailCheck.reason);
    } else {
      throw new ValidationError(emailCheck.reason);
    }
  }

  //checking if there is a user with such username
  const userAvailable = await findUserByUsername(username);
  if (userAvailable) {
    throw new ConflictError("Username already taken");
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
  //hashing passwrod for security
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //passing the user data to be stored in the DB
  const user = await storeCreatedUser({
    username,
    email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    username: user.username,
  };
}

//@login user
//check wether user exist
//@use jwt to keep user logged in
async function existingUser(username, password) {
  //storing the info of the user from DB
  const user = await findUserByUsername(username);

  //compare the hashedPassword & input Password
  if (user && (await bcrypt.compare(password, user.password))) {
    //creating a jwt accessToken that keeps the user signed in
    //jwt contains the time in which it expires
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    return accessToken;
  } else {
    throw new ValidationError("Username or password is invalid");
  }
}

async function getUserData(userId) {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  return {
    username: user.username,
    email: user.email,
  };
}

class DashboardService {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.categoryRepository = new CategoryRepository();
    this.subtaskRepository = new SubtaskRepository();
  }
  async getDashboardStats(userId) {
    // 1. Task stats by status
    const taskStats = await this.taskRepository.Stats(userId) || [];

    // 2. Subtask stats by status 
    const subtaskStats =
      await this.subtaskRepository.getSubtaskStats(userId) || [];

    // 3. Uncategorized tasks
    const orphanTasks = await this.taskRepository.orphanCount(userId) || 0;

    // 4. Category data with task/subtask COUNTS only
    const categoryMeta =
      await this.categoryRepository.userStats(userId) || [];

    // Process task breakdown
    const taskBreakdown = {
      completed: 0,
      pending: 0,
      inProgress: 0,
    };
    let totalTasks = 0;
    for (const stat of taskStats) {
      const count = stat._count?._all ?? 0;
      totalTasks += count;
      if (stat.status === "completed") taskBreakdown.completed = count;
      if (stat.status === "pending") taskBreakdown.pending = count;
      if (stat.status === "inProgress") taskBreakdown.inProgress = count;
    }

    // Process subtask breakdown 
    const subtaskBreakdown = {
      completed: 0,
      pending: 0,
      inProgress: 0,
    };
    let totalSubtasks = 0;
    for (const stat of subtaskStats) {
      const count = stat._count?.id ?? 0;
      totalSubtasks += count;
      if (stat.status === "completed") subtaskBreakdown.completed = count;
      if (stat.status === "pending") subtaskBreakdown.pending = count;
      if (stat.status === "inProgress") subtaskBreakdown.inProgress = count;
    }

    // Process categories
    const categories = categoryMeta.map((cat) => {
      const subtaskCount = cat.tasks.reduce(
        (sum, task) => sum + (task._count?.subtasks ?? 0),
        0
      );

      return {
        categoryId: cat.id,
        categoryName: cat.name,
        taskCount: cat._count?.tasks ?? 0,
        subtaskCount,
      };
    });

    return {
      overview: {
        totalCategories: categoryMeta.length,
        totalTasks,
        totalSubtasks, 
        uncategorizedTasks: orphanTasks,
      },
      taskBreakdown,
      subtaskBreakdown, 
      categories,
    };
  }
}

module.exports = { createUser, existingUser, getUserData, DashboardService };
