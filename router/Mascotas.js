const express = require('express');
const router = express.Router();

//import mascota model
const Mascota = require('../models/mascota')


//Ruta que hace select all desde el modelo.
router.get('/', async (req, res) => {
    try {

        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)

        res.render("mascotas", {

            arrayMascotas: arrayMascotasDB

        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;