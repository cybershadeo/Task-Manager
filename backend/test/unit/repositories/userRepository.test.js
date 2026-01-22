const userRepository = require('../../../src/repositories/userRepository');


// Mock database
jest.mock('../../../src/config/prisma', () => ({
  user: {
    update: jest.fn()
  }
}));

const prisma = require('../../../src/config/prisma');

describe('UserRepository - updateProfilePictureUrl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update profile picture URL in database', async () => {
    const userId = 1;
    const profilePictureUrl = 'https://supabase.co/profiles/1-123.jpg';

    prisma.user.update.mockResolvedValue({ 
        id: userId,
        profilePictureUrl: profilePictureUrl
    });

    await userRepository.updateProfilePictureUrl(userId, profilePictureUrl);

    expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { profilePicture: profilePictureUrl }    
    });
  });

  it('should throw error if database update fails', async () => {
    const userId = 1;
    const profilePictureUrl = 'https://supabase.co/profiles/1-123.jpg';

    prisma.user.update.mockRejectedValue(new Error('Prisma error'));

    await expect(userRepository.updateProfilePictureUrl(userId, profilePictureUrl))
      .rejects.toThrow();
  });
});