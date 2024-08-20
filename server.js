const express = require("express");
const path = require("path");
const app = express();

// Servir los archivos estáticos de la carpeta build de React
app.use(express.static(path.join(__dirname, "build")));

// Manejar cualquier ruta con el archivo index.html de React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configurar el puerto para la aplicación
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
