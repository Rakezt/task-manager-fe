export const setToken = (t: string) => {
  if (typeof window !== 'undefined') localStorage.setItem('token', t);
};
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};
export const removeToken = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
};
