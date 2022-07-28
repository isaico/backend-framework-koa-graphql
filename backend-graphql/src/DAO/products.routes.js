import Router from 'koa-router'

import {
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct
} from '../Controllers/index.js'

// export const productRouter = express.Router()
export const router = new Router({
    prefix:'/api'
});

productRouter.get('/products',getProducts)
productRouter.get('/products/:id',getProductById)
productRouter.post('/products',addProduct)
productRouter.put('/products/:id',updateProduct)
productRouter.delete('/products/:id',deleteProduct)
