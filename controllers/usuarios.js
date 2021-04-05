const { response, request } = require('express');
const enviarMensaje = require('./telegram');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const usuariosGet = async(req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = {estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({
        msg: 'get API - controlador',
        total,
        usuarios
    });
}

const usuariosPost = async(req = Request, res = response) => {

    const {password, email, ...body} = req.body;
    const usuario = new Usuario(body);

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Agregar el email al modelo
    usuario.email = email;

    // Guardar en la DB
    await usuario.save();

    // Enviar mensaje al grupo de telegram
    enviarMensaje(`Usuario creado: ${usuario}`);

    res.json({
        msg: 'post API - usuariosPost',
        usuario: usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;

    // Validar contra base de datos
    if(password){

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    enviarMensaje(`Usuario Actualizado: ${usuario}`);

    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    // Borrar Fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg: 'delete API - usuariosDelete',
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}