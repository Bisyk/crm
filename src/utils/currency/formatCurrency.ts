export const formatCurrency = (value: number | string) => {
  if (value === null || value === undefined || value === "") {
    return "0.00";
  }

  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) {
    return "0.00";
  }

  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
