//imports de mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//schema mascotaSchema
  const mascotaSchema = new Schema({
    nombre: String,
    descripcion: String
  });

  //crear modelo
  const Mascota = mongoose.model('Mascota', mascotaSchema);

  module.exports = Mascota;