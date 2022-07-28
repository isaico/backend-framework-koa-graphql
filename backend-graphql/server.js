import Koa from 'koa';
import 'dotenv/config';
import koaBody from 'koa-body';
import { graphqlHTTP } from 'koa-graphql';
import { SchemaProducts } from './src/Module/schemaProducts.graphQL.js';
import {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
} from './src/Controller/rootResolver.js';
import mount from 'koa-mount';

const PORT = process.env.PORT || 8080;
const app = new Koa();

app.use(koaBody());
app.use(
  mount(
    '/productos',
    graphqlHTTP({
      schema: SchemaProducts,
      rootValue: {
        getProducts,
        getProductById,
        addProduct,
        deleteProduct,
        updateProduct,
      },
      graphiql: true,
    })
  )
);

const server = app.listen(PORT, () => {
  console.log(` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥`);
});

server.on('error', (err) => {
  console.log(err);
});
