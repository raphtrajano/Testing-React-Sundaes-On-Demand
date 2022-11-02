import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("Checkbox tests", () => {
  test("Checkbox is unchecked by default and button is disabled", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const purchaseButton = screen.getByRole("button", {
      name: "Confirm order",
    });
    expect(checkbox).not.toBeChecked();
    expect(purchaseButton).toBeDisabled();
  });

  test("Checkbox enable and disable button", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const purchaseButton = screen.getByRole("button", {
      name: "Confirm order",
    });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(purchaseButton).toBeDisabled();
  });
});
