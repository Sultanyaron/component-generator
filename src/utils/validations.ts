export const hasWhiteSpace = (input: string) => {
  return /\s/g.test(input);
};

export const isUpperCaseLetter = (letter: string) => {
  return letter === letter.toUpperCase();
};

const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const hasSpecialCharacters = (input: string) => {
  return specialCharactersRegex.test(input);
};
