const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
export const formatINR = (amount) => inr.format(amount);
export const plural = (n, one, many) => (n === 1 ? one : many);
