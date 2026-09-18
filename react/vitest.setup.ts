// vitest.setup.ts
import '@testing-library/jest-dom/vitest';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
globalThis.Response = Response;
globalThis.Request = Request;
