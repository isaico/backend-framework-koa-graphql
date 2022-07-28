import Koa from 'koa';
import 'dotenv/config'
import koaBody from 'koa-body';
import { productRouter,cartRouter } from './src/Routes/index.js'

const PORT = process.env.PORT || 8080
const app = new Koa()
app.use(koaBody())

app.use(productRouter.routes())

const server = app.listen(PORT, () => {
console.log(` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥`);
});

server.on('error', (err) => {
console.log(err);
});