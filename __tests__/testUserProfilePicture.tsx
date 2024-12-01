import '@testing-library/jest-dom';
import { render, screen, fireEvent, within,} from "@testing-library/react";
import test,{ describe } from "node:test";
import Home  from "../app/user/page";
import '@testing-library/jest-dom';


describe("testing user pfp", () => {

    it('points', () => {
        render(<Home />);
        expect(screen.getByText("Points")).toBeInTheDocument();
    
      
      })

  

});

 