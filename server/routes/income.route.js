import { Router } from 'express';
import { createIncome, getIncomes, getIncome, updateIncome, deleteIncome, getIncomeCategories, getIncomeCategoriesByUser,createIncomeCategory, updateIncomeCategory, deleteIncomeCategory } from '../controllers/incomeController';

const router = Router();

//INCOME
router.get('/', getIncomes);
router.get('/:id', getIncome);
router.post('/', createIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

//INCOME CATEGORY
router.get('/income-categories', getIncomeCategories);
router.get('/custom-income-categories', getIncomeCategoriesByUser)
router.post('/income-categories', createIncomeCategory);
router.put('/income-categories/:id', updateIncomeCategory);
router.delete('/income-categories/:id', deleteIncomeCategory);

export default router;