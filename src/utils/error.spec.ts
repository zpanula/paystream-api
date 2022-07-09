import { describe, it, expect } from 'vitest';
import AppError from './error';

describe('class AppError', () => {
  it('should contain the provided status code, message, and stack trace', () => {
    const testStatusCode = 500;
    const testMessage = 'Internal Server Error';
    const testStackTrace = 'test';

    const testError = new AppError(testStatusCode, testMessage, testStackTrace);

    expect(testError.statusCode).toBe(testStatusCode);
    expect(testError.message).toBe(testMessage);
    expect(testError.stack).toBe(testStackTrace);
  });

  it('should generate a stack trace if no stack trace provided', () => {
    const testStatusCode = 500;
    const testMessage = 'Internal Server Error';

    const testError = new AppError(testStatusCode, testMessage);

    expect(testError.statusCode).toBe(testStatusCode);
    expect(testError.message).toBe(testMessage);
    expect(testError.stack).toContain(testMessage);
  });
});
