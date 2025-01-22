export default (availabilityAccountId: string) => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  return `${month}-${year}-${availabilityAccountId}`;
};
