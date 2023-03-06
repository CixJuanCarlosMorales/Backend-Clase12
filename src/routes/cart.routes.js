// import { Router } from "express";
// import { ProductManager } from "../controllers/ProductManager.js";
// const routerProduct = Router()
// const productManager = new ProductManager('src/models/productos.txt')

// routerProduct.get('/', async (req, res) => { 
//     const { limit } = req.query; 
//     console.log(limit)
//     const productos = await productManager.getProducts()
//     console.log(productos)
//     res.send(JSON.stringify(productos))
// })
  
// routerProduct.get('/:id', async (req, res) => { 
//     const producto = await productManager.getProductById(req.params.id)
//     console.log(producto)
//     res.send(JSON.stringify(producto))
// })
  
// routerProduct.post('/', async (req, res) => { 
//     let mensaje = await productManager.addProduct(req.body)
//     res.send(mensaje)
// })
  
// routerProduct.delete('/:id', async (req, res) => {
//     let mensaje = await productManager.deleteProduct(req.params.id) 
//     res.send(mensaje)
// })
  
// routerProduct.put('/:id', async (req, res) => { 
//     let mensaje = await productManager.updateProduct(req.params.id, req.body)
//     res.send(mensaje)
// })

// export default routerProduct


import { Router } from "express";

const routerCart = Router()


routerCart.post('/:idCart/product/:idProducto', async (req,res) => {
    //Consultar los carritos exitentes dado un id
    //carrito.some() Buscar si existe el producto en el carrito
    //Si no existe, creo un nuevo objeto producto con el id y la cantidad
    //Lo puseo y lo guardo en el txt
})

routerCart.post('/', async (req,res) => {
    //Crear carrito
})

routerCart.get('/:id', async (req,res) => {
    //Devolver un carrito dado su id
})