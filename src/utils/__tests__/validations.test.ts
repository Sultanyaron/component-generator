import {
  hasWhiteSpace,
  isUpperCaseLetter,
  hasSpecialCharacters,
} from "../validations";
describe("validations", () => {
  describe("hasWhiteSpace", () => {
    it("Should return true when whitespace exists", () => {
      const result = hasWhiteSpace("My Component");
      expect(result).toBe(true);
    });

    it("Should return false when whitespace exists", () => {
      const result = hasWhiteSpace("MyComponent");
      expect(result).toBe(false);
    });
  });

  describe("isUpperCaseLetter", () => {
    it("Should return true when is capital", () => {
      const result = isUpperCaseLetter("K");
      expect(result).toBe(true);
    });

    it("Should return false when is not capital", () => {
      const result = isUpperCaseLetter("k");
      expect(result).toBe(false);
    });
  });

  describe("hasSpecialCharacters", () => {
    it.each([
      { stringToTest: "a#", expectedResult: true },
      { stringToTest: "a@", expectedResult: true },
      { stringToTest: "a-", expectedResult: true },
      { stringToTest: "abc", expectedResult: false },
    ])(
      "Should return $expectedResult when '$stringToTest' is passed ",
      ({ stringToTest, expectedResult }) => {
        const result = hasSpecialCharacters(stringToTest);
        expect(result).toBe(expectedResult);
      }
    );
  });
});
