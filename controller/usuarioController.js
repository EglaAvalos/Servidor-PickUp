const fs = require('fs');
const Usuario = require('../module/Usuario'); 
const dataPath = './data/usuariosData.json';

exports.getAllUsuarios = (req, res) => { 
    try {
        const usuarioData = JSON.parse(fs.readFileSync(dataPath));
        res.json(usuarioData);
    } catch(err){
        console.error(err.stack);
        res.status(500).json({ err: "No se pudieron encontrar los usuarios."});
    }
}

exports.getUsuarioById = (req, res) => { 
    const usuarioId = parseInt(req.params.id); 
    if (isNaN(usuarioId)) {
        return res.status(400).json({ error: "El ID del usuario no es válido."});
    }
    try {
        const usuarioData = JSON.parse(fs.readFileSync(dataPath));
        const usuario = usuarioData.find((u) => u.id === usuarioId); 
        if(!usuario) {
            return res.status(404).json({ error: "El usuario no fue encontrado."});
        }
        res.json(usuario);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo obtener al usuario."});
    }
}

exports.addUsuario = (req, res) => { 
    try {
        const usuarioData = JSON.parse(fs.readFileSync(dataPath));
        const newUsuario = new Usuario(
            Date.now(), 
            req.body.nombre, 
            req.body.correo,
            req.body.rol
        ); 
        if (!newUsuario.nombre || !newUsuario.correo || !newUsuario.rol) {
             return res.status(400).json({ error: "Faltan datos requeridos." });
        }
        usuarioData.push(newUsuario); 
        fs.writeFileSync(dataPath, JSON.stringify(usuarioData, null, 2));
        res.json(newUsuario);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo agregar el usuario."});
    }
}

exports.updateUsuario = (req, res) => { 
    const usuarioId = parseInt(req.params.id); 
    if (isNaN(usuarioId)) {
        return res.status(400).json({ error: "El ID del usuario no es válido."});
    }
    try {
        const usuarioData = JSON.parse(fs.readFileSync(dataPath));
        const index = usuarioData.findIndex((u) => u.id == usuarioId); 
        if (index === -1) {
            return res.status(404).json({error: "El usuario no fue encontrado."});
        }
        const updateUsuario = usuarioData[index]; 
        if (req.body.nombre) updateUsuario.nombre = req.body.nombre;
        if (req.body.correo) updateUsuario.correo = req.body.correo;
        if (req.body.rol) updateUsuario.rol = req.body.rol;
        fs.writeFileSync(dataPath, JSON.stringify(usuarioData, null, 2));
        res.json(updateUsuario);
    } catch(err){
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo actualizar el usuario."});
    }
}

exports.deleteUsuario = (req, res) => { 
    const usuarioId = parseInt(req.params.id); 
    if (isNaN(usuarioId)) {
        return res.status(400).json({ error: "El ID del usuario no es válido."});
    }
    try {
        const usuarioData = JSON.parse(fs.readFileSync(dataPath));
        const index = usuarioData.findIndex((u) => u.id == usuarioId); 
        if (index === -1) {
            return res.status(404).json({error: "El usuario no fue encontrado."});
        }
        usuarioData.splice(index, 1); 
        fs.writeFileSync(dataPath, JSON.stringify(usuarioData, null, 2));
        res.json({ message: "El usuario ha sido eliminado exitosamente."}); 
    } catch (err) { 
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo eliminar el usuario."});
    }
}
