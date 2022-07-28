import ProductosApi from '../Api/productos.api.js';
const productosApi = new ProductosApi();

export const getProducts = async () => {
  try {
    const resp = await productosApi.buscar();
    console.log(resp);
    return resp;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async ({productId}) => {
  try {
    if (productId && productId !== undefined) {
      const resp = await productosApi.buscar(productId);   
      return resp[0];
    } else {
      const error = new Error(`producto con id ${productId} no encontrado`);
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

export const addProduct = async ({ data }) => {
  try {
    const resp = await productosApi.agregar(data);
    if (resp) return { ...data, _id: resp };
    else throw new Error('no se pudo agregar el producto');
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async ({productId}) => {
  try {
    if (productId && productId !== undefined) {
      const resp = await productosApi.borrar(productId);
      if (resp.deletedCount===1) return productId
      else throw new Error('no se pudo eliminar el producto');
    } else {
      throw new Error(`Error. Producto con id ${productId} no encontrado`);
    }
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async ({productId,data})=>{
    try {
        const resp = await productosApi.reemplazar(productId,data)
        console.log(resp)
        if (resp) return  { ...data, _id: productId };
        else throw new Error("no se pudo reemplazar el producto")
    } catch (error) {
        throw error
    }
}
