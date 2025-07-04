require('dotenv').config();
require("express-async-error")

const AppError = require("./utils/AppError");
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

// Importando as rotas
app.use(routes);

const PORT = process.env.PORT || 3000;

// Tratativa de Erros
app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            type: "Error",
            message: error.message
        });
    }

    // Internal Server Error
    console.error(error);

    return response.status(500).json({
        type: "Error",
        message: "Internal Server Error"
    });
});

app.listen(PORT, () => {
  console.log(`INFO: Server está rodando em http://localhost:${PORT}`);
});
