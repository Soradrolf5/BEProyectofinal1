import {Router} from 'express'
import CartManager from '../controllers/CartManager.js'
import ProductManager from '../controllers/ProductManager.js'

let filePath = 'C:\\Users\\Admin\\Desktop\\BEProyectofinal1\\files\\carts.json'
const cartsRouter = Router()
const pmanager = new ProductManager()
const cmanager = new CartManager(`${filePath}`)


cartsRouter.post('/', async (req, res) => {
    try {
    const newCart = await cmanager.createNewCart();
    res.send(newCart);
    } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear el carrito.");
    }
    })
    cartsRouter.get('/:cid?', async(req, res) => {
        const cartId = req.params.cid;
        const cart = await cmanager.getCartById(cartId);
        res.send(cart); 
    });

    cartsRouter.post('/:cid/product/:pid', async (req, res) => {
        try {
            const productId = parseInt(req.params.pid);
            const cartId = parseInt(req.params.cid);
            const product = await pmanager.getProductById(productId);
            const cart = await cmanager.getCartById(cartId);
            if (!product) {
                throw new Error(`Product with id ${productId} not found`);
            }
            const updatedCart = await cmanager.updateCart(cart, product);
            res.send(updatedCart);
        } catch (error) {
            console.log(`ERROR updating cart. Msg: ${error.message}`);
            res.status(500).send(`Error updating cart: ${error.message}`);
        }
    }
);
export default cartsRouter