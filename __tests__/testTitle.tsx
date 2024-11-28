import '@testing-library/jest-dom';
import { render, screen, fireEvent, within,} from "@testing-library/react";
import test,{ describe } from "node:test";
import Home  from "../app/page";
import '@testing-library/jest-dom';


describe("testing title", () => {

    it('TritonMates', () => {
        render(<Home />);
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    
      
      })

  

});

 