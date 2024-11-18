import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the UserForm component", () => {
  render(<App />);
  
  const userFormElement = screen.getByTestId("user-form");
  expect(userFormElement).toBeInTheDocument();
});