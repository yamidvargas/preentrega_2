import dotenv from "dotenv";
import ProductFirebaseDao from "./firebase/dao.js";
import ProductMongoDao from "./mongodb/dao.js";
dotenv.config();

let dao;

switch (process.env.DB_TYPE) {
    case "firebase":
        dao = new ProductFirebaseDao();
    break;
    case "mongodb":
        dao = new ProductMongoDao();
    break;
    default:
        dao = new ProductMongoDao();
    break;
}

export default dao;