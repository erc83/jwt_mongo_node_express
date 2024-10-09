# JWT Authentication and Recipe API

Este proyecto es una API RESTFULL construida con **Node.js**, **Express**, y **MongoDB** que proporciona autenticación JWT (JSON Web Token) para el registro de Usuarios con Roles tanto de Administrador como de moderador, tambien posee un crud de recetas en donde la lectura de recetas es para todo público y la creación, Actualización y eliminación para los Usuarios con Roles de Administrador y Moderador.
Adicionalmente el password de los usuario queda encryptado con bcryptjs

## Estructura del Proyecto
```sh
├── controllers
│     └── auth.Controller.js
│     └── recipes.controller.js
├── database
│     └── connectionMongoDb.js          
├── libs
│     └── initialSetup.js         
├── middleware
│     └── authJwt.js        
│     └── index.js        
├── routes
│     └── auth.routes.js         
│     └── recipes.routes.js         
├── schema
│     └── recipes.schema.js         
├── .env.example
├── .gitignore
├── JenkinsFile
├── package.json        
├── req.http           
├── README.md          
└── server.js          
```


## Tecnologías usadas
> [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
> [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
> [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
> [![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
> [![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

## Requisitos Previos

- **Node.js** (v18 o superior)
- **MongoDB** (instancia local o remota)

## Instalación

1. Clona el repositorio:
   git clone https://github.com/erc83/jwt_mongo_node_express
   cd jwt_mongo_node_express
   
2. Instala las dependencias:
   npm install
   Configura las variables de entorno:

3. configura las siguientes variables de entorno:

.env
SECRET_KEY=your_secret_key
MONGODB_URI=mongodb://localhost:27017

4. Inicia el servidor:
   npm start
   El servidor estará disponible en http://localhost:5000.

## Endpoints de la API Examples
### GET recipes  [/recipes](http://localhost:5000/recipes)

```json
reponse:
{
    "_id": "6689c8fe397846b10f688fcf",
    "name": "BIG MIAU",
    "ingredientes": [
      "La clásica hamburguesa Big Miau, ahora con salsa especial para gatos exigentes. ¡Te hará ronronear de placer!"
    ]
  },
  {
    "_id": "67061821db5a374214ea512e",
    "name": "DOBLR PURRING",
    "ingredientes": [
      "Una explosión de sabor con doble queso derretido y carne jugosa. ¡Un festín digno de un gato gourmet!"
    ]
}
```




### POST register User   [auth/register](http://localhost:5000/auth/register)
Registra a un nuevo usuario.

- **Request Body**:
```json
  {
    "username": "nombre_de_usuario",
    "email": "correo@example.com",
    "password": "contraseña_segura"
  }
Response:
{
  "token": "jwt_token"
}
```

### POST login User  [auth/login](http://localhost:5000/auth/login)

```json
  {
    "email": "correo@example.com",
    "password": "contraseña_segura"
  }
Response:
{
  "token": "jwt_token"
}
```



