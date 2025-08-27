//------------INCOME VALIDATORS----------------//

//When a user is providing an income, amount should be greater than 1
//the source character should not exceed 100 chara due to db restrictions, and same with description but with 500 chara

export const validateIncomeData = (data) => {
  const errors = [];

  if (data.amount !== undefined) {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      errors.push("Amount must be greater than 0");
    }
  }

  // if (data.date) {
  //   const parsedDate = new Date(data.date);
  //   if (isNaN(parsedDate.getTime())) {
  //     errors.push("Invalid date format");
  //   } else if (parsedDate > new Date()) {
  //     errors.push("Date cannot be in the future");
  //   }
  // }

  if (data.source && data.source.length > 100) {
    errors.push("Source cannot exceed 100 characters");
  }

  if (data.description && data.description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  return errors;
};

//A simple validation to make the date filter coherent

export const validateDateRange = (start, end) => {
  const errors = [];

  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    if (startDate > endDate) {
      errors.push("Start date cannot be after end date");
    }
  }

  return errors;
};
