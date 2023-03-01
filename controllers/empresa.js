const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Empresa = require('../models/empresa');

const getEmpresas = async (req = request, res = response) => {

    const listaEmpresas = await Promise.all([
        Empresa.countDocuments(),
        Empresa.find()
    ]);

    res.json({
        msg: 'GET EMPRESAS',
        listaEmpresas
    });

}

const postEmpresa = async (req = request, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const empresaDB = new Empresa({nombre, correo, password, rol});

    const salt = bcryptjs.genSaltSync();
    empresaDB.password = bcryptjs.hashSync(password, salt);

    await empresaDB.save();

    res.json(201).json({
        msg: 'POST EMPRESAS',
        empresaDB
    });
}

const putEmpresa = async (req = request, res = response) => {

    const {id} = req.params;

    const {_id, rol, ...resto} = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    const empresaEditada = await Empresa.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT EMPRESAS',
        empresaEditada
    });
}

const deleteEmpresa = async (req = request, res = response) => {
    const {id} = req.params;

    const empresaEliminada = await Empresa.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE EMPRESAS',
        empresaEliminada
    });
}

module.exports = {
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
}