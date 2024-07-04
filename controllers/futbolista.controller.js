const { request, response } = require('express');
const Futbolista = require('../models/futbolista');

const futbolistasGet = async ( req =  request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query

    //const futbolistas = await Futbolista.find().limit( Number(limite) ).skip( Number(desde) ).populate('usuario')
    const futbolistas = await Futbolista.find().limit( Number(limite) ).skip( Number(desde) )

    res.json({
        status: true,
        result: futbolistas
    });

}

const futbolistaById = async ( req = request, res = response ) => {

    const id = req.params.id;

    const futbolista = await Futbolista.findById(id);

    res.json({
        status: true,
        result: futbolista
    });
}

const futbolistaSave = async ( req = request, res = response ) => {

    const { apodo, edad, equipos, imagen, nombre, posicion, nacionalidad, usuario } = req.body;

    const futbolista = new Futbolista({ apodo, edad, equipos, imagen, nombre, posicion, nacionalidad, usuario });
    futbolista.save();

    res.json({
        status: true,
        message: 'Futbolista registrado correctamente.',
        result: futbolista
    });

}

const futbolistaUpdate = async ( req = request, res = response ) => {

    const id = req.params.id;
    const { apodo, edad, equipos, imagen, nombre, posicion, nacionalidad } = req.body;

    const futbolista = await Futbolista.findByIdAndUpdate( id, { apodo, edad, equipos, imagen, nombre, posicion, nacionalidad } );

    res.json({
        status: true,
        message: 'Futbolista actualizado correctamente.',
        result: futbolista
    });

}

const futbolistaDelete =  async ( req = request, res = response ) => {

    const id = req.params.id;

    const futbolista = await Futbolista.findByIdAndDelete( id );

    res.json({
        status: true,
        message: 'Futbolista eliminado correctamente.',
        result: futbolista
    });
}

module.exports = {
    futbolistasGet,
    futbolistaById,
    futbolistaSave,
    futbolistaUpdate,
    futbolistaDelete
}