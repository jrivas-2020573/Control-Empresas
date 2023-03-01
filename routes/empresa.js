//importaciones
const { Router } = require('express');

const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');


const router = Router();

router.get('/mostrar', getEmpresas);

router.post('/agregar', postEmpresa);

router.put('/editar/:id', putEmpresa);

router.delete('/eliminar/:id', deleteEmpresa);


module.exports = router;