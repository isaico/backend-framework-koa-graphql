## hola ramiro aca te dejo los comandos para el graphiQL asi es mas facil solo copias y pegas
## tene en cuenta a la hora de iniciar el server con el comando "npm run dev" para observar al server basado en graphQL
```
 query{
   getProducts{
     nombre,
     precio,
     _id
   }
 }
 query{
 	getProductById(productId:"62c72a833fe2668778501d26"){
     nombre,
     precio
   }
 }
 mutation{
   addProduct(data:{
     nombre:"mesa",
     descripcion:"alguna desc",
     precio:1000.10,
     foto:"www.someurl.com",
     stock:12
   }){
     nombre
     precio
   }
 }
 mutation{
   deleteProduct(productId:)
 }
 mutation{
   updateProduct(productId:"62d82fadd9c4e92fc8699056",data:{
     nombre:"sillon",
     descripcion:"alguna desc",
     precio:2000.10,
     foto:"www.someurl.com",
     stock:50
   }){
     nombre,
     _id
   }
 }
 ```
 eso es para los productos, es lo mismo para el tema del cart etc...pero bueno creo con esto es suficiente creo yo, cualquier cosa me escribis saludos!