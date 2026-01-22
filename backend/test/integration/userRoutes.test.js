
// test/integration/userRoutes.test.js

// Mock ALL dependencies BEFORE any imports
jest.mock('../../src/controllers/userController', () => ({
  uploadProfilePictuer: jest.fn((req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({
      message: 'Profile picture updated successfully',
      profilePictureUrl: 'https://mocked-url.com/image.jpg'
    });
  }),
  registerUser: jest.fn(),
  loginUser: jest.fn(),
  getUserProfile: jest.fn(),
  getUserMetrics: jest.fn()
}));

jest.mock('../../src/middleware/authentication', () => ({
  authUser: jest.fn((req, res, next) => {
    req.user = { id: 1 };
    next();
  })
}));

jest.mock('../../src/middleware/validation', () => ({
  validateCreateUser: jest.fn((req, res, next) => next()),
  validateExistingUser: jest.fn((req, res, next) => next())
}));

jest.mock('../../src/config/supabase');

const request = require('supertest');
const express = require('express');
const userRoutes = require('../../src/routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/user', userRoutes);

describe('PUT /user/profile-picture', () => {
  it('should upload profile picture successfully', async () => {
    const response = await request(app)
      .put('/user/profile-picture')
      .attach('profilePicture', Buffer.from('fake-image'), 'test.jpg');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Profile picture updated successfully');
    expect(response.body.profilePictureUrl).toBeTruthy();
  });

  it('should return 400 if no file uploaded', async () => {
    const response = await request(app)
      .put('/user/profile-picture');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No file uploaded');
  });
});