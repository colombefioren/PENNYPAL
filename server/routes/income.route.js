import { Router } from 'express';
import { createIncome, getIncomes, getIncome, updateIncome, deleteIncome, getIncomeCategories, getIncomeCategoriesByUser,createIncomeCategory, updateIncomeCategory, deleteIncomeCategory } from '../controllers/income.controller.js';

const router = Router();

//INCOME
router.get('/', getIncomes);
router.get('/:id', getIncome);
router.post('/', createIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

//INCOME CATEGORY
router.get('/categories', getIncomeCategories);
router.get('/custom-categories', getIncomeCategoriesByUser)
router.post('/categories', createIncomeCategory);
router.put('/categories/:id', updateIncomeCategory);
router.delete('/categories/:id', deleteIncomeCategory);

export default router;