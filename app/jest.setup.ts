import '@testing-library/jest-dom';
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/",
    query: {},
  })),
}));
