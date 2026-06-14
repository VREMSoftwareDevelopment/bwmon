// vitest.setup.js
import '@testing-library/jest-dom';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
globalThis.Response = Response;
globalThis.Request = Request;
