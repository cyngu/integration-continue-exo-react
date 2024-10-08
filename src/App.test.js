import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import {
  isUnderage,
  isValidEmail,
  isValidName,
  isValidZipcode,
} from "./features/UserFormService";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("check counter on click me button", () => {
  render(<App />);
  const button = screen.getAllByRole("button")[0];
  const counter = screen.getByTestId("count");
  expect(button).toBeInTheDocument();
  expect(counter).toBeInTheDocument();
  expect(counter).toHaveTextContent("0");
  fireEvent.click(button);
  expect(counter).toHaveTextContent("1");
});

describe("UserFormService", () => {
  describe("isUnderage", () => {
    it("should return true for a date of birth resulting in an age under 18", () => {
      const birthDate = "2007-10-08"; // Exemple : 17 ans
      expect(isUnderage(birthDate)).toBe(true);
    });

    it("should return false for a date of birth resulting in an age 18 or over", () => {
      const birthDate = "2005-10-08"; // Exemple : 18 ans
      expect(isUnderage(birthDate)).toBe(false);
    });
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
