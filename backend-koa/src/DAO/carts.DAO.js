import CustomError from '../Errors/CustomError.js';

class CartsDao {
  async create() {
    throw new CustomError(500, 'falta implementar create!');
  }
  async getById(id) {
    throw new CustomError(500, 'falta implementar getById!');
  }

  async deleteById(id) {
    throw new CustomError(500, 'falta implementar deleteById!');
  }

  async deleteAll() {
    throw new CustomError(500, 'falta implementar deleteAll!');
  }
}

export default CartsDao;
