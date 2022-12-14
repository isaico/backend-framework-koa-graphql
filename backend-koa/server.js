import Koa from 'koa';
import 'dotenv/config'
import koaBody from 'koa-body';
import { productRouter,cartRouter } from './src/Routes/index.js'

const PORT = process.env.PORT || 8080
const app = new Koa()
app.use(koaBody())

app.use(productRouter.routes())

const server = app.listen(PORT, () => {
console.log(` ๐๐ฅserver is runing at http://localhost:${PORT} ๐๐ฅ`);
});

server.on('error', (err) => {
console.log(err);
});