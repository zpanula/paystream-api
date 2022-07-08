import { Request, Response, NextFunction } from 'express';
import { it, describe, expect, beforeEach, vi } from 'vitest';
import Joi from 'joi';
import validateBody from './validation';
import AppError from '../utils/error';

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
const nextFunction: Partial<NextFunction> = vi.fn();

const testSchema = Joi.object({
  number: Joi.number(),
});

describe('validation middleware', () => {
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockImplementation(() => mockResponse),
      send: vi.fn(),
    };
  });

  it('should return successfully if request body is valid', () => {
    const testInput = { number: 1 };
    mockRequest.body = testInput;

    validateBody(testSchema)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith();
  });

  it('should return an AppError if request body is invalid', () => {
    const testInput = { test: 'invalid' };
    const testStatusCode = 400;
    const testErrorMessage = '"test" is not allowed';

    mockRequest.body = testInput;

    validateBody(testSchema)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(testStatusCode, testErrorMessage)
    );
  });
});
