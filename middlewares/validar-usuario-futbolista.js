const Futbolista = require("../models/futbolista");


const validarUsuarioFutbolista = async ( req, res, next ) => {

    const usuario = req.usuario;
   
    if( !usuario ){
        res.status( 401 ).json({
            status: false,
            message: 'No existen datos del usuario.'
        });
    }

    //No es un usuario administrador
    if( !usuario.isAdmin ){
        const id = req.params.id;
        const futbolista = await Futbolista.findById( id );

        if( !futbolista ){
            res.status( 401 ).json({
                status: false,
                message: 'No existen datos del futbolista.'
            });
        }

       /*  console.log( usuario );
        console.log( futbolista );
        console.log( "equals", usuario._id.equals( futbolista.usuario ) ); */

        if( !usuario._id.equals( futbolista.usuario ) ){
            res.status( 401 ).json({
                status: false,
                message: `Usuario ${usuario.nombre} no tiene permisos.`
            });
        }

    }

    next();
}


module.exports = {
    validarUsuarioFutbolista
}
