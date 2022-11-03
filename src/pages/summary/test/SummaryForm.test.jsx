import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("Checkbox enable and disable button", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const purchaseButton = screen.getByRole("button", {
      name: "Confirm order",
    });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(purchaseButton).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears on mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    await user.unhover(termsAndConditions);
    await waitForElementToBeRemoved(popover);
    expect(popover).not.toBeInTheDocument();
  });
});
