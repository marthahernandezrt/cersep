const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    primerNombre: {
        type: String,
        required: [true, 'El primer nombre es obligatorio']
    },
    segundoNombre: {
        type: String,
    },
    primerApellido: {
        type: String,
        required: [true, 'El primer apellido es obligatorio']
    },
    segundoApellido: {
        type: String,
        required: [true, 'El segundo apellido es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        required: [true,  'El password es obligatorio']
    },
    fechaRegistro: {
        type: String
    },
    token: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    idGestor: {
        type: String,
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);