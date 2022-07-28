import ProductosDao from './productos.DAO.js';
import { ProductsModel } from '../Module/Products.model.js';
import CustomError from '../Errors/CustomError.js';
import MyMongoClient from '../Config/db.clientMongo.config.js';
import Config from '../Config/db.config.js';

class ProductosDaoDb extends ProductosDao {
  constructor() {
    super();
    this.client = new MyMongoClient();
    this.client.connect();
    this.projection = Config.db.projection;
  }

  async getAll() {
    try {
      const buscados = await ProductsModel.find({}, this.projection).lean();
      return buscados;
    } catch (err) {
      throw new CustomError(500, 'error al obtener todos los productos', err);
    }
  }

  async getById(idBuscado) {
    let buscado;
    try {
      buscado = await ProductsModel.findOne(
        { _id: idBuscado },
        this.projection
      );
    } catch (err) {
      throw new CustomError(500, 'error al buscar producto por dni', err);
    }

    if (!buscado) {
      throw new CustomError(404, 'producto no encontrado con ese ID', {
        id: idBuscado,
      });
    }

    return [buscado];
  }

  async add(prodNuevo) {
    try {
      console.log(prodNuevo);
      return await ProductsModel.create(prodNuevo);
    } catch (error) {
      throw new CustomError(500, 'error al crear un nuevo producto', error);
    }
  }

  async deleteById(idParaBorrar) {
    let result;
    try {
      result = await ProductsModel.deleteOne({ _id: idParaBorrar });
      if (result.deletedCount == 0) {
        throw new CustomError(
          404,
          `no existe un producto para borrar con id: ${idParaBorrar}`,
          {
            idParaBorrar,
          }
        );
      } else {
        return result;
      }
    } catch (error) {
      throw new CustomError(500, `error al borrar producto`, error);
    }
  }

  async deleteAll() {
    try {
      await ProductsModel.deleteMany();
    } catch (error) {
      throw new CustomError(
        500,
        `error al borrar a todos los productos`,
        error
      );
    }
  }

  async updateById(idParaReemplazar, nuevoProd) {
    let result;
    try {
      result = await ProductsModel.findOneAndReplace(
        { _id: idParaReemplazar },
        nuevoProd,
        this.projection
      );
      if (!result) {
        throw new CustomError(
          404,
          `no se encontró para actualizar un producto con id: ${idParaReemplazar}`,
          { idParaReemplazar }
        );
      }

      return nuevoProd;
    } catch (error) {
      throw new CustomError(500, `error al reemplazar al producto`, error);
    }
  }
  exit() {
    this.client.disconnect();
  }
}

export default ProductosDaoDb;
