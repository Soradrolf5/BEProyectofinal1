import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import {engine} from "express-handlebars"
import __dirname from "./utils.js"
import * as path from "path"
import { Server } from 'socket.io';
import ProductManager from './controllers/ProductManager.js'


let filePath = './files/products.json';
const pmanager = new ProductManager(`${filePath}`);
let productsList = pmanager.products;

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = new Server(server); // crea el servidor de sockets

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter)
//estructura handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

//archivos estaticos
app.use("/", express.static(__dirname + "/public"));

// Eventos socket.io
io.on('connection', socket => { 
    console.log("New connection started");

    socket.emit('productsList', productsList);

    socket.on('addProduct', () => {
        io.sockets.emit('productsList', productsList);
    });

});