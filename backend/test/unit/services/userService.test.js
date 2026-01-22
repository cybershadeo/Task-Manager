jest.mock('../../../src/repositories/storageRepository');
jest.mock('../../../src/repositories/userRepository');

const userService = require('../../../src/services/userService');
const storageRepository = require('../../../src/repositories/storageRepository');
const userRepository = require('../../../src/repositories/userRepository');
const { ExternalServiceError } = require('../../../src/utils/customErrors');


describe('UserService - updateProfielPicture', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should upload file and update database with URL', async () => {
        const userId = 1 ;
        const mockFile = {
            buffer: Buffer.from('fake-image'),
            mimetype: 'image/jpeg',
            originalname: 'test.jpg'
        };
        const mockUrl = 'https://supabase.co/profiles/1-123456.jpeg';
        
        storageRepository.uploadProfilePicture.mockResolvedValue(mockUrl);
        userRepository.updateProfilePictureUrl.mockResolvedValue();

        const result = await userService.updateProfilePicture(userId, mockFile);

        expect(storageRepository.uploadProfilePicture).toHaveBeenCalledWith(userId, mockFile);
        expect(userRepository.updateProfilePictureUrl).toHaveBeenCalledWith(userId, mockUrl);
        expect(result).toBe(mockUrl);
    });

    it('should throw error if upload fails', async () => {
        const userId = 1;
        const mockFile = {buffer: Buffer.from('fake'), mimetype: 'image/jpeg'};

        storageRepository.uploadProfilePicture.mockRejectedValue(new ExternalServiceError('Upload failed'));

        await expect(userService.updateProfilePicture(userId, mockFile))
            .rejects.toThrow('Upload failed');
    });
});