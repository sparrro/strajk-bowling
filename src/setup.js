import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    cleanup();
    sessionStorage.clear();
});

afterAll(() => {
    server.close();
});