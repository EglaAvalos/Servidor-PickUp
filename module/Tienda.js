// module/Tienda.js
class Tienda {
  constructor(id, nombre, direccion, telefono, horario, propietario) {
    this.id = id;                     // identificador único (number o string)
    this.nombre = nombre;             // nombre de la tienda
    this.direccion = direccion;       // dirección física
    this.telefono = telefono;         // teléfono de contacto
    this.horario = horario;           // string con horario (ej: "9:00-18:00")
    this.propietario = propietario;   // nombre del propietario/encargado
  }
}

module.exports = Tienda;
