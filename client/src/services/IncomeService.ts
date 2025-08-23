import { DefaultService } from "../api/services/DefaultService";
import type {
  Income,
  IncomeCategory,
  CreateIncomeRequest,
  UpdateIncomeRequest,
} from "../types/Income";

export class IncomeService {
  //GET all incomes with optional filtering
  static async getIncomes(start?: string, end?: string): Promise<Income[]> {
    try {
      const response = await DefaultService.getIncomes(start, end);
      return response as Income[];
    } catch (error) {
      console.error("Error fetching incomes:", error);
      throw new Error("Failed to fetch incomes");
    }
  }

  //GET income by id
  static async getIncomeById(id: string): Promise<Income> {
    try {
      const response = await DefaultService.getIncomes1(id);
      return response as Income;
    } catch (error) {
      console.error(`Error fetching income ${id}:`, error);
      throw new Error("Failed to fetch income");
    }
  }

  //POST income
  static async createIncome(incomeData: CreateIncomeRequest): Promise<Income> {
    try {
      const requestData = {
        ...incomeData,
        amount: Number(incomeData.amount),
      };

      if (incomeData.date) {
        requestData.date = incomeData.date;
      }
      const response = await DefaultService.postIncomes(requestData);
      return response as Income;
    } catch (error) {
      console.error("Error creating income:", error);
      throw new Error("Failed to create income");
    }
  }

  //UPDATE income
  static async updateIncome(
    id: string,
    incomeData: UpdateIncomeRequest
  ): Promise<Income> {
    try {
      const requestData = { ...incomeData };
      if (incomeData.amount !== undefined) {
        requestData.amount = Number(incomeData.amount);
      }

      const response = await DefaultService.putIncomes(id, requestData);
      return response as Income;
    } catch (error) {
      console.error(`Error updating income ${id}:`, error);
      throw new Error("Failed to update income");
    }
  }

  //DELETE income
  static async deleteIncome(id: string): Promise<void> {
    try {
      await DefaultService.deleteIncomes(id);
    } catch (error) {
      console.error(`Error deleting income ${id}:`, error);
      throw new Error("Failed to delete income");
    }
  }

  //GET ALL income categories (custom and system)
  static async getIncomeCategories(): Promise<IncomeCategory[]> {
    try {
      const response = await DefaultService.getCategories();

      return response as IncomeCategory[];
    } catch (error) {
      console.error("Error fetching income categories:", error);
      throw new Error("Failed to fetch income categories");
    }
  }

  //GET custom categories
  static async getCustomIncomeCategories(): Promise<IncomeCategory[]> {
    try {
      const allCategories = await this.getIncomeCategories();
      return allCategories.filter((category) => category.is_custom);
    } catch (error) {
      console.error("Error fetching custom income categories:", error);
      throw new Error("Failed to fetch custom income categories");
    }
  }

  //POST new category
  static async createIncomeCategory(name: string): Promise<IncomeCategory> {
    try {
      const response = await DefaultService.postCategories({ name });
      return response as IncomeCategory;
    } catch (error) {
      console.error("Error creating income category:", error);
      throw new Error("Failed to create income category");
    }
  }

  //UPDATE a category
  static async updateIncomeCategory(
    id: string,
    name: string
  ): Promise<IncomeCategory> {
    try {
      const response = await DefaultService.putCategories(id, { name });
      return response as IncomeCategory;
    } catch (error) {
      console.error(`Error updating income category ${id}:`, error);
      throw new Error("Failed to update income category");
    }
  }

  //DELETE category
  static async deleteIncomeCategory(id: string): Promise<void> {
    try {
      await DefaultService.deleteCategories(id);
    } catch (error) {
      console.error(`Error deleting income category ${id}:`, error);
      throw new Error("Failed to delete income category");
    }
  }
}
