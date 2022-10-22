export const hasWhiteSpace = (input: string) => /\s/g.test(input);

export const isUpperCaseLetter = (letter: string) => letter === letter.toUpperCase();

const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const hasSpecialCharacters = (input: string) => specialCharactersRegex.test(input);
