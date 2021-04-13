const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("mascotas", {
        arrayMascotas: [
            {id: 'asdasd', nombre: 'rex', descripcion: 'rex descripcion'},
            {id: 'asdasdaa', nombre: 'chanchan', descripcion: 'chanchan descripcion'},
        ]
    })
})

module.exports = router;