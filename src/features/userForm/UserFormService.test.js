import {
  isUnderage,
  isValidEmail,
  isValidName,
  isValidZipcode,
} from "./UserFormService";

describe("UserFormService", () => {
  describe("isUnderage", () => {
    it("should return true for a date of birth resulting in an age under 18", () => {
      const today = new Date();
      const underageBirthDate = new Date(
        today.getFullYear() - 17,
        today.getMonth(),
        today.getDate() + 1
      )
        .toISOString()
        .split("T")[0];
      expect(isUnderage(underageBirthDate)).toBe(true);
    });

    it("should return false for a date of birth resulting in an age 18 or over", () => {
      const today = new Date();
      const adultBirthDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      )
        .toISOString()
        .split("T")[0];
      expect(isUnderage(adultBirthDate)).toBe(false);
    });
  });

  it("should return true for a person who will turn 18 in this year", () => {
    const today = new Date();
    const future18thBirthday = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ).toISOString().split("T")[0];
  
    expect(isUnderage(future18thBirthday)).toBe(true);
  });

  describe("isValidEmail", () => {
    it("should return true for valid email formats", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name+tag+sorting@example.com")).toBe(true);
    });

    it("should return false for invalid email formats", () => {
      expect(isValidEmail("plainaddress")).toBe(false);
      expect(isValidEmail("@missingusername.com")).toBe(false);
      expect(isValidEmail("test@.com")).toBe(false);
      // expect(isValidEmail("test@domain..com")).toBe(false);
    });
  });

  describe("isValidName", () => {
    it("should return true for valid names", () => {
      expect(isValidName("Cyril")).toBe(true);
      expect(isValidName("Loïse")).toBe(true);
      expect(isValidName("Cyril-Nguyen")).toBe(true);
      expect(isValidName("O'Nguyen")).toBe(true);
    });

    it("should return false for invalid names", () => {
      expect(isValidName("Cyril123")).toBe(false);
      expect(isValidName("")).toBe(false);
    });
  });

  describe("isValidZipcode", () => {
    it("should return true for valid French zip codes", () => {
      expect(isValidZipcode("75001")).toBe(true);
    });

    it("should return false for invalid zip codes", () => {
      expect(isValidZipcode("1234")).toBe(false);
      expect(isValidZipcode("123456")).toBe(false);
      expect(isValidZipcode("abcde")).toBe(false);
      expect(isValidZipcode("")).toBe(false);
    });
  });
});
