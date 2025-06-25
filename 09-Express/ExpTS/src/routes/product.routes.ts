import express from 'express';
import {
  listProducts,
  showCreateForm,
  createProduct,
  showEditForm,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = express.Router();

router.get('/products', listProducts);
router.get('/products/create', showCreateForm);
router.post('/products/create', createProduct);
router.get('/products/edit/:id', showEditForm);
router.post('/products/edit/:id', updateProduct);
router.post('/products/delete/:id', deleteProduct);

export default router;

