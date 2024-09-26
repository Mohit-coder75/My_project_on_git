import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts'
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
// import { createUser } from './controller/user.controller.js';
import userRoutes from './routes/user.routes.js';
import homeRoutes from './routes/home.routes.js'

const server = express();

// Get the current directory (__dirname equivalent for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
server.use(ejsLayouts);
//parse form data..........................
server.use(express.urlencoded({ extended: true }))

// Set the view engine to EJS
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(),
    'views'))
// Set the directory for views with an absolute path
server.set('views', path.join(__dirname, 'views'));

// Serve static files from the "Public" directory
server.use(express.static(path.join(__dirname, 'Public')));
server.use('/', userRoutes);
server.use('/',homeRoutes);


// Home route
server.get('/', (req, res) => {
    res.render('layout', {
        title: 'Home',
        body: '' // Dynamically include home.ejs
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
    connectDB();
});
