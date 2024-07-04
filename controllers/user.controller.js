const { request, response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/user');

const userGet = async ( req = request, res = response ) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ result, total  ] = await Promise.all([
        Usuario.find( query ).limit( Number(limite) ).skip( Number(desde) ),
        Usuario.countDocuments( query )
    ]);
    
    res.json({
      status: true,
      result, 
      total
    });
}

const userById = async ( req = request, res = response ) => {
    const id = req.params.id;

    const result = await Usuario.findById( id );

    if( !result ){
        res.status(404).json({
            status: false,
            message: `No se ha podido encontrar datos del usuario ${id}`
        });
    }

    res.json({
        status: true,
        result
    });
}

const userPost = ( req = request, res = response ) =>{

    const { nombre, email, password, estado, isAdmin, imagen } = req.body;

    const usuario = new Usuario({ nombre, email, password, estado, isAdmin, imagen });

    //encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    //grabar usuario
    usuario.save();

    res.json({
        status: true,
        message: 'Usuario registrado correctamente.',
        result: { nombre, email, password, estado, isAdmin, imagen }
    });
}

const userUpdate = async( req = request, res = response ) => {
    const id = req.params.id;
    const {  _id, email, password, ...resto } = req.body;

    if( password ){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const result = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        status: true,
        result,
        message: `Usuario ${resto.nombre} actualizado correctamente.`
    });
}

const userDelete = async( req = request, res = response ) => {
    const id = req.params.id;

    //borrado fisico
    //const result = await Usuario.findByIdAndDelete( id );

    //actualizar solo el estado en false
    const result = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json({
        status: true,
        result,
        message: `Usuario ${id} eliminado correctamente.`
    });

};

module.exports = {
    userGet,
    userById,
    userPost,
    userUpdate,
    userDelete
};