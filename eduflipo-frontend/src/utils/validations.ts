export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// Regular expression for email format
  return re.test(String(email).toLowerCase());
};

export const validateName = (name: string) => {
  const re = /^[a-zA-Z]+$/;// Regular expression for alphabetic characters only
  return re.test(name);
};

export const validateMinLength = (
  text: string,
  minLength: number = 3
): boolean => {
  return text.length >= minLength;
};
