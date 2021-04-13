const express = require('express');
const router = express.Router();


//fue necesario borrar los archivos dentro de views
router.get("/", (req, res) => {
    res.render("index", {titulo : "mi titulo dinamico"});
  });

router.get("/servicios", (req, res) => {
      res.render("servicios", {tituloServicios : "Este es un mensaje de servicio"});
  });

module.exports = router;