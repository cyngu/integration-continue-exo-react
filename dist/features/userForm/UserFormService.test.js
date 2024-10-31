"use strict";

var _UserFormService = require("./UserFormService");
describe("UserFormService", () => {
  describe("isUnderage", () => {
    it("should return true for a date of birth resulting in an age under 18", () => {
      const today = new Date();
      const underageBirthDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate() + 1).toISOString().split("T")[0];
      expect((0, _UserFormService.isUnderage)(underageBirthDate)).toBe(true);
    });
    it("should return false for a date of birth resulting in an age 18 or over", () => {
      const today = new Date();
      const adultBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split("T")[0];
      expect((0, _UserFormService.isUnderage)(adultBirthDate)).toBe(false);
    });
  });
  describe("isValidEmail", () => {
    it("should return true for valid email formats", () => {
      expect((0, _UserFormService.isValidEmail)("test@example.com")).toBe(true);
      expect((0, _UserFormService.isValidEmail)("user.name+tag+sorting@example.com")).toBe(true);
    });
    it("should return false for invalid email formats", () => {
      expect((0, _UserFormService.isValidEmail)("plainaddress")).toBe(false);
      expect((0, _UserFormService.isValidEmail)("@missingusername.com")).toBe(false);
      expect((0, _UserFormService.isValidEmail)("test@.com")).toBe(false);
      // expect(isValidEmail("test@domain..com")).toBe(false);
    });
  });
  describe("isValidName", () => {
    it("should return true for valid names", () => {
      expect((0, _UserFormService.isValidName)("Cyril")).toBe(true);
      expect((0, _UserFormService.isValidName)("Loïse")).toBe(true);
      expect((0, _UserFormService.isValidName)("Cyril-Nguyen")).toBe(true);
      expect((0, _UserFormService.isValidName)("O'Nguyen")).toBe(true);
    });
    it("should return false for invalid names", () => {
      expect((0, _UserFormService.isValidName)("Cyril123")).toBe(false);
      expect((0, _UserFormService.isValidName)("")).toBe(false);
    });
  });
  describe("isValidZipcode", () => {
    it("should return true for valid French zip codes", () => {
      expect((0, _UserFormService.isValidZipcode)("75001")).toBe(true);
    });
    it("should return false for invalid zip codes", () => {
      expect((0, _UserFormService.isValidZipcode)("1234")).toBe(false);
      expect((0, _UserFormService.isValidZipcode)("123456")).toBe(false);
      expect((0, _UserFormService.isValidZipcode)("abcde")).toBe(false);
      expect((0, _UserFormService.isValidZipcode)("")).toBe(false);
    });
  });
});