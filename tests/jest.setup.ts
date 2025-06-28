import "@testing-library/jest-dom";

process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000/api";
process.env.API_URL = "http://localhost:3000/api";

afterEach(() => {
  jest.clearAllMocks();
});
