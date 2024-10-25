const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static('public'));

// Configuramos el motor de vistas (EJS o Pug, o usar HTML simple con sendFile)
app.set('view engine', 'ejs'); // Si usas EJS

// Ruta del menú principal
app.get('/', (req, res) => {
    res.render('menu');  // Vista para el menú
});

// Ruta para la pestaña "About Me"
app.get('/about', (req, res) => {
    res.render('about'); // Vista para About Me
});

// Ruta para la pestaña "Instrucciones"
app.get('/instructions', (req, res) => {
    res.render('instructions'); // Vista para instrucciones
});
// Ruta para la pestaña "Instrucciones"
app.get('/game', (req, res) => {
    res.render('game'); // Vista para instrucciones
});
//Cambia '10.49.x.x' por la IP que deseas utilizar
const IP = '10.49.x.x'; 
const PORT = 3000;

app.listen(PORT, IP, () => {
    console.log(`Server running at http://${IP}:${PORT}`);
});
