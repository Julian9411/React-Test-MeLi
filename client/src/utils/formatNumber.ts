export const formatNumbers = (e: number) => {
  return "$ " + new Intl.NumberFormat('es').format(e);
};
