import Carts_itemsDao from './carts_items.DAO.js';
import { Cart_items } from '../Module/Cart_items.model.js';
import CustomError from '../Errors/CustomError.js';
import MyMongoClient from '../Config/db.clientMongo.config.js';
import Config from '../Config/db.config.js';
import ProductosDaoDb from './productos.db.DAO.js';

class Carts_itemsDaoDb extends Carts_itemsDao {
  constructor() {
    super();
    this.client = new MyMongoClient();
    this.client.connect();
    this.projection = Config.db.projection;
  }
  async addToCart(cartId, productId, qty) {
    try {
      const Producto = new ProductosDaoDb();
      const product = await Producto.getById(productId);
      //aqui crear una funcion o metodo que verifique que el cartId no se encuentre actualmente en la db CART_ITEMS
      const resp = await Cart_items.create({
        cart_id: cartId,
        product_id: productId,
        product: product,
        quantity: qty,
      });
      console.log(resp, 'carts_itemsDao response of DB');
      if (resp) {
        return resp;
      } else {
        return null
      }
    } catch (error) {
      throw error
    }
  }

  async removeFromCart(cartId,productId) {
    try {
      const resp = await Cart_items.deleteOne({
        product_id: productId,
        cart_id: cartId,
      });
      if (resp.deletedCount == 1) {
        return true
      }
      // } else {
      //   throw new CustomError(404, 'Producto no encontrado, error al borrar', {
      //     cartId,
      //     productId,
      //   });
      // }
    } catch (error) {
        throw new CustomError(500,"error al eliminar producto del cart",error)
    }
  }
  exit() {
    this.client.disconnect();
  }
}
export default Carts_itemsDaoDb