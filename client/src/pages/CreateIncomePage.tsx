import React from "react";
import { useNavigate } from "react-router-dom";
import { IncomeForm } from "../components/IncomeForm";
import { Button } from "../ui";

export const CreateIncomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/incomes");
  };

  const handleCancel = () => {
    navigate("/incomes");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light p-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass-morphism rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={handleCancel}
              size="small"
              className="bg-light/20 text-light hover:bg-light/30 border border-light/30"
            >
              ← Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-light">
                Create New Income
              </h1>
              <p className="text-light/80">
                Add a new income source to your tracker
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <IncomeForm onSave={handleSave} onCancel={handleCancel} open={true} />
        </div>
      </div>
    </div>
  );
};
