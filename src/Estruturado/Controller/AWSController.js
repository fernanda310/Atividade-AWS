const AWSService = require('../Service/AWSService');
const ImagemService = require('../Service/ImagemService');

class AWSController {
   
    async enviarImagem(req, res) {
        try {
            const { file } = req;
            const { id } = req.params;  
            if (!file) {
                return res.status(400).json({ error: "Nenhum arquivo enviado." });
            }

            const resultadoS3 = await AWSService.enviarImagemParaS3(file);

            const { referencia } = req.body; 
            const novaImagem = {
                referencia: resultadoS3.fileName,  
                usuario_id: id,  
            };

            const resultadoBanco = await ImagemService.criarNovaImagem(novaImagem); 

            res.json({ resultadoS3, resultadoBanco });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async buscarImagem(req, res) {
        try {
            const { referencia } = req.body;
            if (!referencia) {
                return res.status(400).json({ error: "A referência da imagem é obrigatória." });
            }
            const resultado = await AWSService.buscarImagem(referencia);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new AWSController();
