import express from "express";
import routes from './routes/index.js';
import { routeNotFound } from './middleware/index.js';
import firebase from './services/databases/firebase/firebase.js';
import mongo from './services/databases/mongodb/mongodb.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use(routeNotFound);
app.listen('3000', () => {
    console.log('Escuchando');
})