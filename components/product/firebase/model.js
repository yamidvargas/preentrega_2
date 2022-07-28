import firebase from '../../../services/databases/firebase/firebase.js';

const db = firebase.firestore();

const model = db.collection('product');

export default model;