import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";

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
