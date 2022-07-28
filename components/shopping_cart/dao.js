import dotenv from "dotenv";
import ShoppingFirebaseDao from "./firebase/dao.js";
import ShoppingMongoDao from "./mongodb/dao.js";
dotenv.config();

let dao;

switch (process.env.DB_TYPE) {
    case "firebase":
        dao = new ShoppingFirebaseDao();
    break;
    case "mongodb":
        dao = new ShoppingMongoDao();
    break;
    default:
        dao = new ShoppingMongoDao();
    break;
}

export default dao;