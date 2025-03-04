const express = require('express');
const multer = require('multer'); 
const router = express.Router();

const AWSController = require('../Estruturado/Controller/AWSController');
const ImageControllerNova = require('../Estruturado/Controller/ImageController');
const UserControllerNova = require('../Estruturado/Controller/UsuarioController');

const storage = multer.memoryStorage();  
const upload = multer({ storage: storage });  

//imagem 
router.post('/novaImagem', ImageControllerNova.novaImagem);
router.get('/imagens', ImageControllerNova.listarImagem);
router.get('/imagem/:id', ImageControllerNova.buscarImagem);
router.put('/editarImagem/:id', ImageControllerNova.atualizarImagem);
router.delete('/apagarImagem/:id', ImageControllerNova.removerImagem);


//usuario
router.post('/novoUsuario', UserControllerNova.novaUsuario);
router.get('/usuarios', UserControllerNova.listarUsuario);
router.get('/usuario/:id', UserControllerNova.buscarUsuario);
router.put('/editarUsuario/:id', UserControllerNova.atualizarUsuario);
router.delete('/apagarUsuario/:id', UserControllerNova.removerUsuario);


//aws
router.get('/awscontroller/buscar', AWSController.buscarImagem);
router.post('/awscontroller/enviar/:id', upload.single('imagem'), AWSController.enviarImagem);

module.exports = router;
