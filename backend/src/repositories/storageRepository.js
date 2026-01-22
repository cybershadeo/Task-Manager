const superbase = require('../config/supabase');
const { ExternalServiceError } = require("../utils/customErrors");

const uploadProfilePicture = async (userId, file) => {
    const  fileExt = file.mimetype.split('/')[1];
    const fileName = `${userId}/${userId}-${Date.now()}.${fileExt}`;

    const { data, error } = await superbase.storage
        .from('profiles')
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600',
            upsert: true
        });

    if(error) {
        console.error('Superbase upload error:', error);
        throw new ExternalServiceError('Upload failed');
    }   
    
    const { data: urlData} = superbase.storage
        .from('profiles')
        .getPublicUrl(fileName);
    
    return urlData.publicUrl;
}

module.exports= {uploadProfilePicture}