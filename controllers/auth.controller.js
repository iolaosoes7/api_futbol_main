const { request, response } = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req = request, res = response ) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        if( !usuario ){
            return res.status( 400 ).json({
                status: false,
                message: 'Usuario o contraseña incorrectos - email'
            });
        }

        //validar si el usuario esta activo
        if( !usuario.estado ){
            return res.status( 400 ).json({
                status: false,
                message: 'Usuario bloqueado o suspendido.'
            });
        }

        //validar contraseña
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        if( !validarPassword ){
            return res.status( 400 ).json({
                status: false,
                message: 'Usuario o contraseña incorrectos - password'
            });
        }

        //generar el JWT (token)
        console.log(usuario.id);
        const token = await generarJWT( usuario.id );

        res.json({
            status: true,
            result: usuario,
            token
        });

        
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            status: false,
            message: 'Oops! Algo salió mal.'
        });
    }

}

module.exports = {
    login
}