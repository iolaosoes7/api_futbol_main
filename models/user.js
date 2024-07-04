const { Schema, model  } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio.' ]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}


module.exports = model( 'Usuario', UserSchema );