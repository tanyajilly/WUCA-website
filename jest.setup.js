// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// import 'whatwg-fetch'
// import { server } from '@/mocks/server'

// // Establish API mocking before all tests.
// beforeAll(() => server.listen())

// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
// afterEach(() => server.resetHandlers())

// // Clean up after the tests are finished.
// afterAll(() => server.close())

import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();