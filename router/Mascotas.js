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


//las rutas vienen después de /mascotas, sería /mascotas/crear
router.get('/crear', (req, res) => {
    res.render('crear')
})

//obtiene el post de crear por POST
router.post('/', async (req, res) => {
    const body = req.body
    try {
        //la respuesta de la bd
        const mascotaBD = new Mascota(body)
        await mascotaBD.save()

        //se puede hacer solo con esto: await Mascota.create(body)

        res.redirect('/mascotas')
    } catch (error) {
        console.log(error)
    }
})


//ruta para el edit get
router.get('/:id', async (req, res) => {
    
    const id = req.params.id

    try {
        //Mascota es de route
        const mascotaDB = await Mascota.findOne({_id: id})
        console.log(mascotaDB)

        //se renderea a una vista en específico
        res.render('detalle', {
            mascota: mascotaDB,
            error : false
        })
    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error : true,
            mensaje: 'No se ha encontrado el id seleccionado'
        })
    }
})

//ruta de delete
//cada vez que se hace una solicitud a la base de datos se pone async
//se captura el /:id, ese id intentará eliminar el documento.
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    try {
        const mascotaBD = await Mascota.findByIdAndDelete({_id: id})

        if (mascotaBD) {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        }else{
            res.json({
                estado: flase,
                mensaje: 'Falló eliminar!'
            })
        }

    } catch (error) {

    }

})


router.put('/:id', async(req, res) =>{

    const id = req.params.id
    const body = req.body

    try {

        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false })
        console.log(mascotaDB)

        res.json({
            estado: true,
            mensaje: 'Editado'
        })

    } catch (error) {

        res.json({
            estado: false,
            mensaje: 'Fallamos'
        })
    }
})


module.exports = router;