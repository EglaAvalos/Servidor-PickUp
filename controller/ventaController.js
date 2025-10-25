const fs = require('fs');
const venta = require('../module/venta');
const dataPath = './data/ventaData.json'


exports.getAllVentas = (req, res) => {
    try {
        const ventaData = JSON.parse(fs.readFileSync(dataPath));
        res.json(schoolData);
    } catch(err){
        console.error(err.stack);
        res.status(500).json({ err: "Venta inecxistente ."});
    }
}

exports.getVentaById = (req,res) => {
    const ventaId = parseInt(req.params.id);

    if (isNaN(ventaId)) {
        return res.status(400).json({ error: "ID de venta invalido"});
    }

    try {
        const ventaData = JSON.parse(fs.readFileSync(dataPath));
        const venta = ventaData.find((a) => a.id === ventaId);

        if(!venta) {
            res.status(404).json({ error: "Venta no encontrada."})
        }

        res.json(venta);

    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo obtener la venta."});
    }
}

exports.addVenta = (req, res) => {
    try {
        const ventaData = JSON.parse(fs.readFileSync(dataPath));
        const newVenta = new Venta(Date.now(), req.body.producto, req.body.precio);

        ventaData.push(newVenta);

        fs.writeFileSync(dataPath, JSON.stringify(ventaData, null, 2));

        res.json(newVenta);

    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo registrar la venta."});
    }
}

exports.updateVenta = (req, res) => {
    const ventaId = parseInt(req.params.id);

    if (isNaN(ventaId)) {
        return res.status(400).json({ error: "El ID de la venta no es valido"})
    }

    try {
        const ventaData = JSON.parse(fs.readFileSync(dataPath));
        const index = ventaData.findIndex((a) => a.id == ventaId);

        if (index === -1) {
            return res.status(404).json({error: "La venta no fue encontrada."})
        }

        const updateVenta = ventaData[index];

        if (req.body.producto){
            updateVenta.producto = req.body.producto;
        }
        if (req.body.precio){
            updateVenta.precio = req.body.precio;
        }

        fs.writeFileSync(dataPath,JSON.stringify(ventaData,null, 2));

        res.json(updateVenta);

    } catch(err){
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo actualizar la venta"});
    }
}

exports.deleteVenta = (req, res) => {
    const ventaId = parseInt(req.params.id);

    if (isNaN(ventaId)) {
        return res.status(400).json({ error: "El ID de la venta no existe."})
    }

    try {
        const ventaData = JSON.parse(fs.readFileSync(dataPath));
        const index = ventaData.findIndex((a) => a.id == ventaId);

        if (index === -1) {
            return res.status(404).json({error: "La venta no fue encontrada."})
        }

        ventaData.splice(index, 1);

        fs.writeFileSync(dataPath, JSON.stringify(ventaData,null, 2));

        res.json({ message: "La venta fue eliminada exitosamente."})

    } catch (err) { 
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo eliminar la venta"});
    }

}