import Joi, { ObjectSchema } from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';
import { RegisterArgs } from '../../lib/types/express';

// Validation to register a new user
export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /**
     * @desc    Schema for the request body
     * @method  POST
     */
    const registerSchema: ObjectSchema = Joi.object().keys({
      name: Joi.string().min(3).max(128).trim().required(),
      email: Joi.string().email().min(3).max(200).trim().required()
    });

    const result: RegisterArgs = await registerSchema.validateAsync(req.body);

    if (result) {
      req.registerArgs = { ...result };

      if (req.registerArgs === req.body) {
        next();
      }
    }
  } catch (error) {
    if (error && error.isJoi) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({ message: 'Unexpected error.' });
    }
  }
};
