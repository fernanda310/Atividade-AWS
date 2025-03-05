const AWSRepository = require('../Repository/AWSRepository');

class AWSService {
    async buscarImagem(referencia) {
        return await AWSRepository.buscarImagem(referencia);
    }

    async enviarImagemParaS3(file) {
        try {
            return await AWSRepository.enviarImagemParaS3(file);
        } catch (error) {
            throw new Error("Erro ao enviar imagem para o S3: " + error.message);
        }
    }
}

module.exports = new AWSService();