import '@testing-library/jest-dom';
import { render, screen, fireEvent, within,} from "@testing-library/react";
import test,{ describe } from "node:test";
import Home  from "../app/dashboard/page";
import UserPage from '@/app/user/page';
import '@testing-library/jest-dom';

// Dummy test for now

describe("testing user profile", () => {

    it('Select Avatar text exists in page', () => {
        render(<UserPage />);
        expect(screen.getByText("Select Avatar")).toBeInTheDocument();
      })

  

});

 