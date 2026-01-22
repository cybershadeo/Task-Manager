const storageRepository = require('../../../src/repositories/storageRepository');
const supabase = require('../../../src/config/supabase');

jest.mock('../../../src/config/supabase', () => ({
    storage: {
        from:jest.fn()
    }
}));


describe('StorageRepository - uploadProfilePicture', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should upload file to Supabase and return public url', async () => {
        const userId = 1;
        const mockFile = {
            buffer: Buffer.from('fake-image'),
            mimetype: 'image/png'
        };

        const mockUrl = 'https://supabase.co/profiles/1-123.png';

        const mockUpload = jest.fn().mockResolvedValue({ data: {}, error: null});
        const mockGetPublicUrl = jest.fn().mockReturnValue({
            data: { publicUrl: mockUrl }
        });

           supabase.storage.from.mockReturnValue({
      upload: mockUpload,
      getPublicUrl: mockGetPublicUrl
    });

    const result = await storageRepository.uploadProfilePicture(userId, mockFile);

    expect(supabase.storage.from).toHaveBeenCalledWith('profiles');
    expect(mockUpload).toHaveBeenCalled();
    expect(mockGetPublicUrl).toHaveBeenCalled();
    expect(result).toBe(mockUrl);
  });

  it('should throw error if Supabase upload fails', async () => {
    const userId = 1;
    const mockFile = { buffer: Buffer.from('fake'), mimetype: 'image/jpeg' };

    const mockUpload = jest.fn().mockResolvedValue({ 
      data: null, 
      error: { message: 'Storage error' } 
    });

    supabase.storage.from.mockReturnValue({
      upload: mockUpload
    });

    await expect(storageRepository.uploadProfilePicture(userId, mockFile))
      .rejects.toThrow();
  });
});
