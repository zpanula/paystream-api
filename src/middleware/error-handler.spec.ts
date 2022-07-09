import { Request, Response, NextFunction } from 'express';
import { it, describe, expect, beforeEach, vi } from 'vitest';
import errorHandler from './error-handler';
import AppError from '../utils/error';
import logger from '../utils/logger';

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
const nextFunction: Partial<NextFunction> = vi.fn();

describe('Error handler middleware', () => {
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockImplementation(() => mockResponse),
      send: vi.fn(),
    };
  });

  it('should log the error', () => {
    const loggerSpy = vi.spyOn(logger, 'error').mockImplementation(() => null);

    const mockError = new Error();

    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(loggerSpy).toHaveBeenCalledWith(mockError);
  });

  it('should handle AppError', () => {
    const testStatusCode = 418;
    const testErrorMessage = "I'm a teapot.";
    const mockError = new AppError(testStatusCode, testErrorMessage);

    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(testStatusCode);
    expect(mockResponse.send).toHaveBeenCalledWith(testErrorMessage);
  });

  it('should handle syntax errors', () => {
    const testStatusCode = 400;
    const testErrorMessage = 'Unexpected token , in JSON at position 53';
    const mockError = new SyntaxError(testErrorMessage);

    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(testStatusCode);
    expect(mockResponse.send).toHaveBeenCalledWith(testErrorMessage);
  });

  it('should handle unexpected server errors', () => {
    const testStatusCode = 500;
    const testErrorMessage = 'Test';
    const mockError = new Error(testErrorMessage);

    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(testStatusCode);
    expect(mockResponse.send).toHaveBeenCalledWith(testErrorMessage);
  });
});
