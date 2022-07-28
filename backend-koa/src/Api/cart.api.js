import CartsDaoDb from '../DAO/carts.db.DAO.js';
import Carts_itemsDaoDb from '../DAO/carts_items.db.DAO.js';


export default class CartsApi {
  constructor() {
    this.cartsDao = new CartsDaoDb();
    this.cartsItemsDao = new Carts_itemsDaoDb();
  }
  async crear() {
    return await this.cartsDao.create();
  }
  async buscar(id) {
    let carrito;
    if (id) {
      carrito = await this.cartsDao.getById(id);
    } else {
      carrito = await this.cartsDao.getAll();
    }
    return carrito;
  }

  async borrar(id) {
    if (id) {
      return await this.cartsDao.deleteById(id);
    } else {
      await this.cartsDao.deleteAll();
    }

  }
  /* ------------------------ METODOS DE ITEMS DEL CART ----------------------- */
  async agregarAlCart(cartId, productId, qty) {
    
    // let validCartId = await this.cartsDao.getById(cartId);
    // let validProductId = await this.productsDao.getById(productId);
    if (qty == null || qty == undefined) qty = 1; //si no se pasa ningun valor, se transforma por def, en 1
    if (cartId && productId) {
      let validProduct= await this.cartsItemsDao.addToCart(
        cartId,
        productId,
        qty
      );
      return validProduct
     
    } else {
      return null;
    }
  }
  async eliminarDelCart(cartId, productId) {
    if (cartId && productId) {
      const resp =  await this.cartsItemsDao.removeFromCart(cartId, productId);
      return resp
    } else {
      return null
    }
  }
  exit() {
    this.cartsDao.exit();
    this.cartsItemsDao.exit();
  }
}
