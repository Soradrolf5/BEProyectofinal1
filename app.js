import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import {engine} from "express-handlebars"
import __dirname from "./utils.js"
import * as path from "path"
import ProductManager from './controllers/ProductManager.js'

let filePath = 'C:\\Users\\Admin\\Desktop\\BEProyectofinal1\\files\\products.json'
const pmanager = new ProductManager(`${filePath}`)

const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//estructura handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))




//archivos estaticos
app.use("/", express.static(__dirname + "/public") )

app.get("/", async (req,res) =>  {
    let allProducts = await pmanager.getProducts()
    res.render("home",   {
        title:"Productos",
        products: allProducts
    })
})

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
})