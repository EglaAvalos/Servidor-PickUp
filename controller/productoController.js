const fs = require('fs');
const Producto = require('../module/Producto');
const dataPath = './data/productoData.json'


exports.getAllProductos = (req, res) => {
    try {
        const productoData = JSON.parse(fs.readFileSync(dataPath));
        res.json(productoData);
    } catch(err){
        console.error(err.stack);
        res.status(500).json({ err: "No se pudieron encontrar los productos."});
    }
}

exports.getProductoById = (req,res) => {
    const productoId = parseInt(req.params.id);

    if (isNaN(productoId)) {
        return res.status(400).json({ error: "El ID del producto no es válido."});
    }

    try {
        const schoolData = JSON.parse(fs.readFileSync(dataPath));
        const producto = schoolData.find((a) => a.id === productoId);

        if(!producto) {
            res.status(404).json({ error: "El producto no fue encontrado."})
        }

        res.json(producto);

    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo obtener al producto."});
    }
}

exports.addProducto = (req, res) => {
    try {
        const productoData = JSON.parse(fs.readFileSync(dataPath));
        const newProducto = new Producto(Date.now(), req.body.nombre, req.body.precio, req.body.stock, req.body.descripcion, req.body.marca);

        productoData.push(newProducto);

        fs.writeFileSync(dataPath, JSON.stringify(productoData, null, 2));

        res.json(newProducto);

    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo agregar el producto."});
    }
}

exports.updateProducto = (req, res) => {
    const productoId = parseInt(req.params.id);

    if (isNaN(productoId)) {
        return res.status(400).json({ error: "El ID del producto no es válido."})
    }

    try {
        const productoData = JSON.parse(fs.readFileSync(dataPath));
        const index = productoData.findIndex((a) => a.id == productoId);

        if (index === -1) {
            return res.status(404).json({error: "El producto no fue encontrado."})
        }

        const updateProducto = productoData[index];

        if (req.body.nombre){
            updateProducto.nombre = req.body.nombre;
        }
        if (req.body.precio){
            updateProducto.precio = req.body.precio;
        }
         if (req.body.stock){
            updateProducto.stock = req.body.stock;
        }
         if (req.body.descripcion){
            updateProducto.descripcion = req.body.descripcion;
        }
         if (req.body.marca){
            updateProducto.marca = req.body.marca;
        }

        fs.writeFileSync(dataPath,JSON.stringify(productoData,null, 2));

        res.json(updateProducto);

    } catch(err){
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo actualizar el producto."});
    }
}

exports.deleteProducto = (req, res) => {
    const productoId = parseInt(req.params.id);

    if (isNaN(productoId)) {
        return res.status(400).json({ error: "El ID del producto no es válido."})
    }

    try {
        const productoData = JSON.parse(fs.readFileSync(dataPath));
        const index = productoData.findIndex((a) => a.id == productoId);

        if (index === -1) {
            return res.status(404).json({error: "El producto no fue encontrado."})
        }

        productoData.splice(index, 1);

        fs.writeFileSync(dataPath, JSON.stringify(productoData,null, 2));

        res.json({ message: "El producto ha sido eliminado exitosamente."})

    } catch (err) { 
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo eliminar el producto."});
    }

}