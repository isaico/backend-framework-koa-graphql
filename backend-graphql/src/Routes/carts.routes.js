import Router from 'koa-router'
import {
  createCart,
  getCart,
  addProductToCart,
  deleteCart,
  removeProductOnCart,
} from '../Controller/index.js';

// export const cartRouter = express.Router();
export const cartRouter = new Router({
  prefix:'/api'
});

cartRouter.post('/cart', createCart);
cartRouter.delete('/cart/:id', deleteCart);
cartRouter.get('/cart/:id/products', getCart);
cartRouter.post('/cart/:id/products/:productId', addProductToCart);
cartRouter.delete('/cart/:id/products/:productId', removeProductOnCart);
