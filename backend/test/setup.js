require('dotenv').config({ path: '.env.test '});

jest.mock('../src/config/supabase', () => ({
    storage: {
        from: jest.fn(() => ({
            upload: jest.fn(),
            getPublicUrl: jest.fn()
        }))
    }
}));