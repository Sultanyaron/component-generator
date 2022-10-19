export const hasWhiteSpace = (input: string) => {
  return /\s/g.test(input);
};

export const isUpperCaseLetter = (letter: string) => {
  return letter === letter.toUpperCase();
};
