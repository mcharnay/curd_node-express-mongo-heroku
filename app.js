const express = require("express");
const bodyParser = require('body-parser'); //import bodyParser
const app = express();

//otro midleware
// parse application/x-www-form-urlencoded, procesa form por método post.
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json, sirve para mandar fetch con json
app.use(bodyParser.json())


//import dotenv
require('dotenv').config()

const port = process.env.PORT || 3000;

//motor de plantillas express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//conexión a mongo bd
const mongoose = require('mongoose');

//uri de conexión, datos vienen de .env
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.moyic.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


//conexión a mongodb por medio mongoose
mongoose.connect(uri,
 {useNewUrlParser: true, useUnifiedTopology: true}
 )
.then(() => console.log('Base de Datos Conectada'))
.catch(e => console.log(e))





//midleware para llamar archivos estáticos de public
//__dirname carpeta de servidor.
//poniendo esta linea de código en esta posición, al poner localhost:3000, se abrirá primero el index.html
app.use(express.static(__dirname + "/public"));

//Rutas web, llama  los routes.
//mascotas es http://localhost:3000/mascotas, require la ruta
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas')); //todo lo que se haga en routes, después de esto, siempre tendrá ´rimero el /mascotas

//status para 404
app.use((req, res, next) => {
    res.status(404).render("404", {
      titulo: "404",
      descripcion: "Título del sitio web"
    })
})

/*
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/

app.listen(port, () => {
  console.log('servidor a su servicio  en el puerto', port);
});

//midleware de 404
app.use((req, res, next) => {
    // res.status(404).send("Sorry cant find that!");
    res.status(404).sendFile(__dirname + "/public/404.html");
});
