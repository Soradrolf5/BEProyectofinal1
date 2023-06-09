import {Router} from 'express'
import ProductManager from '../controllers/ProductManager.js';

let filePath = './files/products.json'
const productsRouter =  Router()
const pmanager = new ProductManager(`${filePath}`)

productsRouter.get('/', async (req,res)=>{
    res.send (await pmanager.getProducts())
    })
    
    productsRouter.get('/:pid', async (req,res)=>{
      const id = parseInt(req.params.pid);

      try {
        const result = await pmanager.getProductById(id);
        res.send(result);
      } catch (error) {
        res.status(404).send(`Product with id ${id} not found`);
      }
        })
    
        productsRouter.post('/', async (req, res) => {
          const newProduct = req.body;
          try {
            await pmanager.addProduct(newProduct);
            res.status(201).send('Producto agregado con éxito');
          } catch (error) {
            console.error(error);
            res.status(400).send(error.message);
          }
        })
    productsRouter.put('/:pid?', async (req, res) => {
      const productId = parseInt(req.params.pid);
      const updateData = req.body;
      await pmanager.updateProduct(productId, updateData);
      res.send('Producto actualizado');
        }
    );
    productsRouter.delete('/:pid?', async (req, res) => {
      const productId = parseInt(req.params.pid);
      await pmanager.deleteProduct(productId);
      res.send('Producto eliminado');
        }
    );
    export default productsRouter


