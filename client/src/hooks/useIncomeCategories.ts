import type { IncomeCategory } from "../types/Income";
import { IncomeService } from "../services/IncomeService";
import { useState, useEffect } from "react";

export const useIncomeCategories = () => {
  const [categories, setCategories] = useState<IncomeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await IncomeService.getIncomeCategories();
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await IncomeService.getIncomeCategories();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch };
};
