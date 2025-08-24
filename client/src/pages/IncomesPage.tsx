import React, { useState } from 'react';
import type { Income } from '../types/Income';
import { IncomeList } from '../components/IncomeList';
import { IncomeForm } from '../components/IncomeForm';
import { Button, TextField, Dialog, useToast } from '../ui';
import { IncomeService } from '../services/IncomeService';

export const IncomesPage: React.FC = () => {
  const [editingIncome, setEditingIncome] = useState<Income | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [dateFilter, setDateFilter] = useState<{ start?: string; end?: string }>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState<Income | null>(null);
  const toast = useToast();

  const handleEdit = (income: Income) => {
    setEditingIncome(income);
    setShowForm(true);
  };

  const handleDeleteClick = (income: Income) => {
    setIncomeToDelete(income);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!incomeToDelete) return;

    try {
      await IncomeService.deleteIncome(incomeToDelete.income_id.toString());
      toast.success('Income deleted successfully');
      setDeleteConfirmOpen(false);
      setIncomeToDelete(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete income';
      toast.error(message);
    }
  };

  const handleSave = () => {
    setEditingIncome(undefined);
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingIncome(undefined);
    setShowForm(false);
  };

  const handleNewIncome = () => {
    setEditingIncome(undefined);
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Income Management</h1>
        <Button onClick={handleNewIncome} size="large">
          Add New Income
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TextField
            label="From Date"
            type="date"
            value={dateFilter.start || ''}
            onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value || undefined }))}
          />
          <TextField
            label="To Date"
            type="date"
            value={dateFilter.end || ''}
            onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value || undefined }))}
          />
        </div>

        <IncomeList
          startDate={dateFilter.start}
          endDate={dateFilter.end}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>

      <IncomeForm
        income={editingIncome}
        onSave={handleSave}
        onCancel={handleCancel}
        open={showForm}
      />

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirm Delete"
        footer={
          <>
            <Button onClick={() => setDeleteConfirmOpen(false)} className="border border-gray-300">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this income?</p>
        {incomeToDelete && (
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <p><strong>Amount:</strong> ${incomeToDelete.amount.toFixed(2)}</p>
            <p><strong>Source:</strong> {incomeToDelete.source}</p>
            <p><strong>Date:</strong> {new Date(incomeToDelete.date).toLocaleDateString()}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};