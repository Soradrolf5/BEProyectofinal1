import fs from 'fs'

export default class ProductManager {
    constructor() {
        this.path = '../files/products.json'
        this.latestId = 1;
        this.products = []
    }
   
 


    async addProduct (newProduct) {
        const { title, description, price, thumbnail, code, stock } = newProduct;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
          console.log("Error: todos los campos son obligatorios");
          return; 
        }
        const found = this.products.some(product => product.code === code);

        if (found) {
        
        console.log(`Error: Ya existe un producto con el código ${code}`);
        
        return;
        
        }

    const newproduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: ++ this.latestId //arreglado el problema del id que debe de ser único y buscar por ID
    }

    this.products.push (newproduct);
    console.log("Producto agregado con éxito");
       await fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
            if (err) throw err;
            console.log('Archivo guardado con éxito');
        });
        
    }
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            console.log(products);
            return products;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    
   
    async getProductById(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        const products = JSON.parse(data);
        const product = products.find(product => product.id === id);
        if (product) {
          return product;
      } else {
          throw new Error(`Product with id ${id} not found`);
      }
    } 

    async updateProduct(productId, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
      
        const index = products.findIndex((product) => product.id === productId);
        if (index === -1) {
          console.log('Error: producto no encontrado');
          return;
        }
      
        // Actualizar los campos especificados en updateData
        for (let field in updateData) {
          if (field in products[index]) {
            products[index][field] = updateData[field];
          }
        }
      
        fs.writeFile(this.path, JSON.stringify(products), (err) => {
          if (err) throw err;
          console.log('Producto actualizado con éxito desde updateProduct');
        });
      }

      async deleteProduct (productId){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
      
        const deleteItemFilter = products.filter(product => product.id !== productId);
      
        if (deleteItemFilter.length === products.length) {
          console.log(`Error: No se encontró producto con ID ${productId}`);
          return;
        }
      
        fs.writeFile(this.path, JSON.stringify(deleteItemFilter), err => {
          if (err) throw err;
          console.log('Producto borrado con éxito desde deleteProduct');
        });
    }
}
