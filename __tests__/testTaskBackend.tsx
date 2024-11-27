import '@testing-library/jest-dom';
import { render, screen, fireEvent, within, } from "@testing-library/react";
import test, { describe } from "node:test";
import Home from "../app/dashboard/page";
import '@testing-library/jest-dom';

// Dummy test 4 now

describe("testing task functions", () => {

  it('sanity check for page', () => {
    render(<Home />);
    const remaining = screen.getByText("Upcoming Events");
    expect(remaining).toBeInTheDocument();
  })
});

