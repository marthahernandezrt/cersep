const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}


// Verificar si el correo existe
const existeEmail = async(email = '')=>{
    const esixteMail = await Usuario.findOne({email: email});
    if(esixteMail){
        throw new Error(`El correo: ${email} ya se encuentra registrado`)
        // return res.status(400).json({
        //     mgs: `El correo: ${email} ya se encuentra registrado`
        // });
    }
}


// Verificar si el usuario existe por id
const existeUsuarioPorId = async(id)=>{
    const esixteUsuario = await Usuario.findById(id);
    if(!esixteUsuario){
        throw new Error(`El id: ${id} no existe`)
        // return res.status(400).json({
        //     mgs: `El correo: ${email} ya se encuentra registrado`
        // });
    }
}



module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}