const fs = require('fs');
const Student = require('../models/venta');
const dataPath = './data/ventaData.json'


exports.getAllVentas = (req, res) => {
    try {
        const ventaData = JSON.parse(fs.readFileSync(dataPath));
        res.json(schoolData);
    } catch(err){
        console.error(err.stack);
        res.status(500).json({ err: "No se pudieron encontrar los estudiantes."});
    }
}

exports.getStudentById = (req,res) => {
    const studentId = parseInt(req.params.id);

    if (isNaN(studentId)) {
        return res.status(400).json({ error: "El ID del estudiante no es válido."});
    }

    try {
        const schoolData = JSON.parse(fs.readFileSync(dataPath));
        const student = schoolData.find((a) => a.id === studentId);

        if(!student) {
            res.status(404).json({ error: "El estudiante no fue encontrado."})
        }

        res.json(student);

    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo obtener al estudiante."});
    }
}

exports.addStudent = (req, res) => {
    try {
        const studentData = JSON.parse(fs.readFileSync(dataPath));
        const newStudent = new Student(Date.now(), req.body.name, req.body.career);

        studentData.push(newStudent);

        fs.writeFileSync(dataPath, JSON.stringify(studentData, null, 2));

        res.json(newStudent);

    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo agregar el estudiante."});
    }
}

exports.updateStudent = (req, res) => {
    const studentId = parseInt(req.params.id);

    if (isNaN(studentId)) {
        return res.status(400).json({ error: "El ID del estudiante no es válido."})
    }

    try {
        const studentData = JSON.parse(fs.readFileSync(dataPath));
        const index = studentData.findIndex((a) => a.id == studentId);

        if (index === -1) {
            return res.status(404).json({error: "El estudiante no fue encontrado."})
        }

        const updateStudent = studentData[index];

        if (req.body.name){
            updateStudent.name = req.body.name;
        }
        if (req.body.career){
            updateStudent.career = req.body.career;
        }

        fs.writeFileSync(dataPath,JSON.stringify(studentData,null, 2));

        res.json(updateStudent);

    } catch(err){
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo actualizar el estudiante."});
    }
}

exports.deleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id);

    if (isNaN(studentId)) {
        return res.status(400).json({ error: "El ID del estudiante no es válido."})
    }

    try {
        const studentData = JSON.parse(fs.readFileSync(dataPath));
        const index = studentData.findIndex((a) => a.id == studentId);

        if (index === -1) {
            return res.status(404).json({error: "El estudiante no fue encontrado."})
        }

        studentData.splice(index, 1);

        fs.writeFileSync(dataPath, JSON.stringify(studentData,null, 2));

        res.json({ message: "El estudiante ha sido eliminado exitosamente."})

    } catch (err) { 
        console.error(err.stack);
        res.status(500).json({ err: "No se pudo eliminar el estudiante."});
    }

}