const { Schema, model } = require('mongoose');

const FutbolistaSchema = Schema({
    apodo: {
        type: String,
    },
    edad: {
        type: Number
    },
    equipos: {
        type: String
    },
    imagen: {
        type: String,
        required: true,
    },
    nacionalidad: {
        type: String
    },
    nombre: {
        type: String,
        required: true,
    },
    posicion: {
        type: String,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

FutbolistaSchema.methods.toJSON = function(){
    const { __v, _id, ...furtbolista } = this.toObject();
    furtbolista.uid = _id;
    return furtbolista;
}

module.exports = model('Futbolista', FutbolistaSchema);