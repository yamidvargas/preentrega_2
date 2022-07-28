import admin from 'firebase-admin';

import serviceAccount from './data/nodefb-e7736-firebase-adminsdk-81g9e-b0e78a5e63.js';

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount.firebase),
    databaseURL:"https://nodefb-e7736.firebaseio.com"
});

console.log('Base Firebase Conectada');
export default admin;