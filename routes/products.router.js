import {Router} from 'express'
import ProductManager from '../controllers/ProductManager.js';

let filePath = `../files/products.json`
const productsRouter =  Router()
const pmanager = new ProductManager(`${filePath}`)

productsRouter.get('/', async (req,res)=>{
    res.send (await pmanager.getProducts())
    })
    
    productsRouter.get('/:pid', async (req,res)=>{
      const id = parseInt(req.params.pid);

      const result = await pmanager.getProductById(id);
    
      if (result.status === "successful") {
        res.send(result.value);
      } else {
        res.status(404).send(result.error);
      }
        })
    
    productsRouter.post('/', async (req, res)  => {
      const newProduct = req.body;
      const result = await pmanager.addProduct(newProduct);
      res.send(result);
    
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


