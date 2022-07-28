import express from 'express';
import productRouter from '../components/product/routes.js';
import shoppinCartRouter from '../components/shopping_cart/routes.js';
const router = express.Router();
router.use('/productos',productRouter);
router.use('/carrito',shoppinCartRouter);
export default router;