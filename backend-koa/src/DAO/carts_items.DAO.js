import CustomError from '../Errors/CustomError.js';

class Carts_itemsDao{
    async addToCart(cartId, productId, qty){
        throw new CustomError(500, 'falta implementar add!')
    }
    async removeFromCart(cartId,productId){
        throw new CustomError(500, 'falta implementar remove!')
    }
}
export default Carts_itemsDao