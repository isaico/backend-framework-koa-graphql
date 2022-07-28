import CartsDao from './carts.DAO.js';
import { CartsModel } from '../Module/Carts.model.js';
import CustomError from '../Errors/CustomError.js';
import MyMongoClient from '../Config/db.clientMongo.config.js';
import Config from '../Config/db.config.js';

class CartsDaoDb extends CartsDao {
  constructor() {
    super();
    this.client = new MyMongoClient();
    this.client.connect();
    this.projection = Config.db.projection;
  }
  async create() {
    try {
      const result = await CartsModel.create({ timeStamp: new Date() });
      const cartId = result._id;
      return cartId.toHexString();
    } catch (err) {
      throw new CustomError(500, 'error al crear el carrito', err);
    }
  }

  async getById(idBuscado) {
    let buscado;
    try {
      buscado = await CartsModel.findOne({ _id: idBuscado }, this.projection);
    } catch (err) {
      throw new CustomError(500, 'error al buscar carrito por id', err);
    }

    if (!buscado) {
      throw new CustomError(404, 'carrito no encontrado con ese ID', {
        id: idBuscado,
      });
    }

    return [buscado];
  }

  async deleteById(idParaBorrar) {
    let result;
    try {
      result = await CartsModel.deleteOne({ _id: idParaBorrar });
    } catch (error) {
      throw new CustomError(500, `error al borrar carrito`, error);
    }
    if (result.deletedCount == 0) {
      throw new CustomError(
        404,
        `no existe un producto para borrar con id: ${idParaBorrar}`,
        {
          idParaBorrar,
        }
      );
    } else if (result.deletedCount > 0) return result;
  }

  async deleteAll() {
    try {
      await CartsModel.deleteMany({});
    } catch (error) {
      throw new CustomError(500, `error al borrar a todos los carritos`, error);
    }
  }

  exit() {
    this.client.disconnect();
  }
}
export default CartsDaoDb;
