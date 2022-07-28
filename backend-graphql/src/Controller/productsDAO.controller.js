import ProductosApi from '../Api/productos.api.js';
const productosApi = new ProductosApi();

export const getProducts = async (ctx, next) => {
  try {
    const products = await productosApi.buscar();
    ctx.response.estatus = 200;
    ctx.body = products;
    // res.send(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (ctx, next) => {
  try {
    const productId = ctx.params.id;
    let dbResProduct = ' ';
    if (productId) dbResProduct = await productosApi.buscar(productId);
    if (dbResProduct !== ' ' && dbResProduct !== null) {
      // res.send(dbResProduct);
      ctx.response.estatus = 200;
      ctx.body = dbResProduct;
    } else {
      const error = new Error(`producto con id ${productId} no encontrado`);
      error.code = 'PRODUCT_NOT_FOUND';
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};

export const addProduct = async (ctx, next) => {
  try {
    const newProduct = {
      nombre: ctx.request.body.nombre,
      descripcion: ctx.request.body.descripcion,
      stock: ctx.request.body.stock,
      precio: ctx.request.body.precio,
      foto: ctx.request.body.foto,
    };
    const dbRes = await productosApi.agregar(newProduct);
    if (dbRes) {
      // res.send({ ...newProduct, _id: dbRes });
      ctx.response.estatus = 200;
      ctx.body =  dbRes ;
    } else {
      throw dbRes;
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (ctx, next) => {
  try {
    const productId = ctx.params.id;
    let dbRes;
    if (productId) {
      dbRes = await productosApi.borrar(productId);
      if (dbRes) {
        // res.send(`Producto con id ${productId} borrado con exito`);
        ctx.response.estatus = 200;
        ctx.body=`Producto con id ${productId} borrado con exito`
      } else {
        throw dbRes;
      }
    } else {
      ctx.response.estatus = 404;
      ctx.body = `Error. Producto con id ${productId} no encontrado`
      // res.send(`Error. Producto con id ${productId} no encontrado`);
    }
  } catch (error) {
    return next(error);
  }
};

export const updateProduct = async (ctx, next) => {
  try {
    const productId = ctx.params.id;
    const newProd = ctx.body;
    //   const dbRes = updateProdDB(productId,newProd)
    const dbRes = productosApi.reemplazar(productId, newProd);
    if (dbRes) {
      // res.send(`Producto con id ${productId} actualizado`);
      ctx.response.estatus = 200;
      ctx.body=`Producto con id ${productId} actualizado`
    } else {
      ctx.response.estatus = 400;
      throw dbRes;
    }
  } catch (error) {
    return next(error);
  }
};
