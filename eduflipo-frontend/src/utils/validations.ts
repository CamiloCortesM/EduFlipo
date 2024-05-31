export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validateName = (name: string) => {
  const re = /^[a-zA-Z]+$/;
  return re.test(name);
};

export const validateMinLength = (
  text: string,
  minLength: number = 3
): boolean => {
  return text.length >= minLength;
};
