declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    API_URL: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
