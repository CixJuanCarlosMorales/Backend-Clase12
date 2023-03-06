// instalado npm i express-handlebars
//para instalar todas las dependencias que se necesitan, se descarga el package.json que tenemos y se escribe en el terminal : npm i, y se instala todas las dependencias que tiene package.json
// para agrega import de handlebars: https://www.npmjs.com/package/express-handlebars

import express from "express";
import routerProduct from "./routes/productos.routes.js";
import routerSocket from "./routes/socket.routes.js";
import { __dirname } from "./path.js";
import multer from 'multer'
import { engine } from 'express-handlebars';
import * as path from 'path'
import { Server } from "socket.io";

//const upload = multer({dest:'src/public/img'}) Forma basica de utilizar multer
const storage = multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, 'src/public/img')
  },
  filename: (req,file,cb) => {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({storage:storage})

const app = express()
const PORT = 4000 

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})


//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //__dirname + './views' ... enlaza la carpeta views

//Server IO
const io = new Server(server)

const mensajes = []

io.on("connection", (socket) => {
    console.log("Cliente conectado")
    socket.on("mensaje", info => {
      console.log(info)
      mensajes.push(info)
      io.emit("mensajes", mensajes)
    })
})



//Routes
app.use('/', express.static(__dirname + '/public')) //puedo utilizar la carpeta de css para darle color, se accede a la capeta publica
app.use('/api/products', routerProduct) /
app.use ("/", routerSocket)
app.post('/upload',upload.single('product'), (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
})
// carga imagenes desde el postman


//HBS
app.get('/', (req,res) => {
  const user = {
    nombre: "Pablop",
    email: "p@p.com",
    rol: "Tutor"
  }
    const cursos = [
      {numero: 123, dia: "LyM", horario: "Noche"},
      {numero: 456, dia: "MyJ", horario: "Mañana"},
      {numero: 789, dia: "S", horario: "Mañana"}
    ]

    res.render("home", { //Renderizar el siguiente contenido
      titulo: "Ecommerce Backend",
      mensaje: "Pepe",
      usuario: user,
      isTutor: user.rol === "Tutor",
      cursos
    })
})

