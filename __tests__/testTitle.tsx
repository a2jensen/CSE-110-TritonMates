import '@testing-library/jest-dom';
import { render, screen, fireEvent, within,} from "@testing-library/react";
import test,{ describe } from "node:test";
import Home  from "../app/page";
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  })),
}));
beforeAll(() => {
  window.alert = jest.fn();
});


describe("testing title", () => {

    it('TritonMates', () => {
        render(<Home />);
    
      
      })

  

});

 