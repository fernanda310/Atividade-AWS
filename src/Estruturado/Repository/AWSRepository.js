const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
});

const s3 = new AWS.S3();

class AWSRepository {
    async buscarImagem(referencia) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia
            };

            const url = s3.getSignedUrl('getObject', params);
            return { url };
        } catch (error) {
            throw new Error("Erro ao buscar imagem no S3: " + error.message);
        }
    }

    async enviarImagemParaS3(file) {
     try {
         const fileExtension = file.originalname.split('.').pop();
         const fileName = `${uuidv4()}.${fileExtension}`;

         const params = {
             Bucket: 'bucketmi74',
             Key: fileName,
             Body: file.buffer,
             ContentType: file.mimetype 
         };

         const result = await s3.upload(params).promise();
         return { url: result.Location, fileName }; 
     } catch (error) {
         throw new Error("Erro ao postar imagem no S3: " + error.message);
     }
 }

}

module.exports = new AWSRepository();
