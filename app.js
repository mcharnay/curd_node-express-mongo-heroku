const express = require("express");
const app = express();
const port = 3000;

//motor de plantillas express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


//midleware para llamar archivos estáticos de public
//__dirname carpeta de servidor.
//poniendo esta linea de código en esta posición, al poner localhost:3000, se abrirá primero el index.html
app.use(express.static(__dirname + "/public"));


//fue necesario borrar los archivos dentro de views
app.get("/", (req, res) => {
  res.render("index", {titulo : "mi titulo dinamico"});
});

app.get("/servicios", (req, res) => {
    res.render("servicios", {tituloServicios : "Este es un mensaje de servicio"});
});

app.use((req, res, next) => {
    res.status(404).render("404", {
      titulo: "404",
      descripcion: "Título del sitio web"
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//midleware de 404
app.use((req, res, next) => {
    // res.status(404).send("Sorry cant find that!");
    res.status(404).sendFile(__dirname + "/public/404.html");
});
