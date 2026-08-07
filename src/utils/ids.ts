export const generateSecureOrderId = () => {
  const uuid = crypto.randomUUID();
  return `BM-${uuid.slice(0, 8).toUpperCase()}`;
};
