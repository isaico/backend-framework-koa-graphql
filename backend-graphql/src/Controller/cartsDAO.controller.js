import CartsApi from '../Api/cart.api.js';
import CustomError from '../Errors/CustomError.js';
import ProductosApi from '../Api/productos.api.js';
const cartsApi = new CartsApi();
const productosApi = new ProductosApi();

export const createCart = async (req, res, next) => {
  try {
    const dbResp = await cartsApi.crear();
    if (dbResp) {
      res.send({ id: dbResp }); //retorna el id del carrito
    } else {
      throw new CustomError(500, 'error al crear el carrito', {
        response: dbResp,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    let cart;
    if (cartId) {
      cart = await cartsApi.buscar(cartId);
    } else {
      cart = await cartsApi.buscar();
    }
    if (cart) {
      res.send(cart);
    } else {
      throw new CustomError(500, 'error al encontrar el carrito en la db', {
        cartId: cartId,
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const deleteCart = (req, res, next) => {
  try {
    const cartId = req.params.id;
    if (cartId) {
      const dbResp = cartsApi.borrar(cartId);
      if (dbResp) {
        res.send(`Carrito con id ${cartId} borrado`);
      } else {
        throw new CustomError(
          500,
          'error en la respuesta de la base de datos',
          dbResp
        );
      }
    } else {
      cartsApi.borrar();
      res.send(`se eliminaron todos los carritos`);
    }
  } catch (error) {
    next(error);
  }
};
/* ---------------------- METODOS DE PRODUCTOS DEL CART --------------------- */
export const addProductToCart = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const productId = req.params.productId;
    const qty = req.body.amount;
    const validProduct = await productosApi.buscar(productId);
    const validCart = await cartsApi.buscar(cartId);
    const validProductId = await validProduct[0]._id.toString();
    const validCartId = await validCart[0]._id.toString();
    console.log(validCartId, validProductId, 'validacion de ids');
    const dbRes = await cartsApi.agregarAlCart(
      validCartId,
      validProductId,
      qty
    );
    if (dbRes) {
      res.send(
        `Producto con id: ${productId} añadido al carrito con id:${cartId}`
      );
      
    } else {
      res.send('error al agregar producto');
      throw new CustomError(500, 'error al agregar productos', {
        error: 'error en respuesta de db',
      });
    }
  } catch (error) {
    next(error);
  }
};
export const removeProductOnCart = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const productId = req.params.productId;
    const dbRes = await cartsApi.eliminarDelCart(cartId, productId);
    if (dbRes) {
      res.send(
        `Producto con id: ${productId} removido con exito del carrito con id: ${cartId}`
      );
    } else {
      res.send('error al remover un producto, no se encontro en el carrito ');
      throw new CustomError(500, 'error al remover un producto', {
        error: 'error en la db response',
      });
    }
  } catch (error) {
    next(error);
  }
};
