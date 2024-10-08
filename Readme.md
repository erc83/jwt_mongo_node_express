# JWT Authentication and Recipe API

Este proyecto es una API RESTful construida con **Node.js**, **Express**, y **MongoDB** que proporciona autenticación JWT (JSON Web Token) y permite la creación, lectura, actualización y eliminación de recetas. Los usuarios deben registrarse e iniciar sesión para acceder a las rutas protegidas.

## Estructura del Proyecto

├── config
│   └── db.js          
├── controllers
│   └── authController.js
├── models
│   └── User.js         
├── routes
│   └── auth.js         
├── middleware
│   └── auth.js        
├── .env.example        
├── server.js           
├── package.json        
└── README.md           

## Tecnologías usadas
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

## Requisitos Previos

- **Node.js** (v12 o superior)
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
   El servidor estará disponible en http://localhost:3000.

## Endpoints de la API
### POST /api/register
Registra a un nuevo usuario.

- **Request Body**:
  ```json
  {
    "username": "nombre_de_usuario",
    "email": "correo@example.com",
    "password": "contraseña_segura",
    "roles": ["user"]
  }
Response:
 ```json
{
  "token": "jwt_token"
}
