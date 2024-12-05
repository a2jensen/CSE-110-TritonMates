import '@testing-library/jest-dom';
import { render, screen, fireEvent, within, } from "@testing-library/react";
import test, { describe } from "node:test";
import Home from "../app/user/page";
import '@testing-library/jest-dom';


describe("testing user pfp page", () => {

  it('points exists sanity check', () => {
    render(<Home />);
    expect(screen.getByText("Points")).toBeInTheDocument();
  })


  it('points exists sanity check', () => {
    render(<Home />);
    expect(screen.getByText("Points")).toBeInTheDocument();
  })


  describe('UserPage Component', () => {
    it('increments points to 50 when "Earn Points" button is clicked', async () => {
      render(<Home />);

      const pointsDisplay = screen.getByText(/Points: 0/);
      expect(pointsDisplay).toBeInTheDocument();

      const earnPointsButton = screen.getByText('Earn Points');
      fireEvent.click(earnPointsButton);

      const updatedPointsDisplay = screen.getByText(/Points: 50/);
      expect(updatedPointsDisplay).toBeInTheDocument();
    });
  });
});
