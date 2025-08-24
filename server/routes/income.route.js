import { Router } from 'express';
import { createIncome, getIncomes, getIncome, updateIncome, deleteIncome, getIncomeCategories, getIncomeCategoriesByUser,createIncomeCategory, updateIncomeCategory, deleteIncomeCategory } from '../controllers/income.controller.js';

const router = Router();

//INCOME CATEGORY
router.get('/categories', getIncomeCategories);
router.get('/custom-categories', getIncomeCategoriesByUser)
router.post('/custom-categories', createIncomeCategory);
router.put('/custom-categories/:id', updateIncomeCategory);
router.delete('/custom-categories/:id', deleteIncomeCategory);

//INCOME
router.get('/', getIncomes);
router.get('/:id', getIncome);
router.post('/', createIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);



export default router;