import { buildSchema } from 'graphql';

export const SchemaProducts = buildSchema(`
    type Producto {
        _id: ID!
        nombre: String
        descripcion: String
        precio: Float
        foto: String
        stock: Int
    }
    input ProductosInput {
        nombre: String!
        descripcion: String!
        precio: Float!
        foto: String!
        stock: Int!
    }
    input ProductosEditInput {
        nombre: String
        descripcion: String
        precio: Float
        foto: String
        stock: Int
    }
    type Query {
        getProducts:[Producto]
        getProductById(productId:ID!):Producto
    }
    type Mutation {
        addProduct(data: ProductosInput):Producto
        deleteProduct(productId:ID!):Producto
        updateProduct(productId:ID!,data:ProductosEditInput!):Producto
    }
`);
