export interface Income {
  income_id: number;
  amount: number;
  date: string;
  source: string;
  description?: string;
  creation_date: string;
  user_id: number;
  category_id: number;
  category?: IncomeCategory;
}

export interface IncomeCategory {
  category_id: number;
  category_name: string;
  icon_url?: string;
  is_custom: boolean;
  user_id?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateIncomeRequest {
  amount: number;
  date: string;
  source: string;
  description?: string;
  category_id: number;
}

export interface UpdateIncomeRequest {
  amount?: number;
  date?: string;
  source?: string;
  description?: string;
  category_id?: number;
}