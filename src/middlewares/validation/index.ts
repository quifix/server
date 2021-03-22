import Joi, { ObjectSchema, StringSchema } from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import {
  BidArgs,
  ProjectArgs,
  RegisterArgs,
  UserUpdateArgs
} from '../../lib/types/express';

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

// Validation to update an existing user
export const userUpdateValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /**
     * @desc      Schema for the request body
     * @method    PUT
     */
    const updateSchema: ObjectSchema = Joi.object().keys({
      name: Joi.string().min(3).max(128).trim(),
      email: Joi.string().email().min(3).max(200).trim(),
      avatar: Joi.string().min(3).max(500).trim(),
      address: Joi.string().min(8).max(255).trim(),
      city: Joi.string().min(3).max(128).trim(),
      state: Joi.string().min(3).max(200).trim(),
      country: Joi.string().min(3).max(200).trim(),
      type: Joi.string().min(3).max(128).trim(),
      walletId: Joi.string().min(3).max(255).trim(),
      income: Joi.number()
    });

    const result: UserUpdateArgs = await updateSchema.validateAsync(req.body);

    if (result) {
      req.updateUserArgs = { ...result };

      if (req.updateUserArgs === req.body) {
        next();
      }
    }
  } catch (error) {
    if (error && error.isJoi) {
      res.status(422).json({ message: error.details[0].message });
    } else {
      res.status(500).json({ message: 'Unexpected error' });
    }
  }
};

// Validation for the request param id.
export const idParamValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /**
     * @desc      Schema for req.params.id
     */
    const idParamSchema: StringSchema = Joi.string().min(3).max(255).trim();

    const result: string = await idParamSchema.validateAsync(req.params.id);

    if (result) {
      if (result === req.params.id) {
        next();
      }
    }
  } catch (error) {
    if (error && error.isJoi) {
      res.status(422).json({ message: error.details[0].message });
    } else {
      res.status(500).json({ message: 'Unexpected error' });
    }
  }
};

// Validation to update an existing project
export const projectValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /**
     * @desc      Schema for the request body
     * @method    POST
     */
    const createSchema: ObjectSchema = Joi.object().keys({
      title: Joi.string().min(3).max(200).trim().required(),
      description: Joi.string().max(500).trim().required(),
      type: Joi.string().min(3).max(128).trim().required(),
      userId: Joi.string().min(3).max(200).trim().required(),
      address: Joi.string().min(8).max(255).trim().required(),
      country: Joi.string().min(3).max(200).trim().required(),
      state: Joi.string().min(3).max(200).trim().required(),
      city: Joi.string().min(3).max(128).trim().required()
    });

    /**
     * @desc      Schema for the request body
     * @method    PUT
     */
    const updateSchema: ObjectSchema = Joi.object().keys({
      title: Joi.string().min(3).max(200).trim(),
      description: Joi.string().max(500).trim(),
      type: Joi.string().min(3).max(128).trim(),
      isOpen: Joi.boolean(),
      userId: Joi.string().min(3).max(200).trim(),
      address: Joi.string().min(8).max(255).trim(),
      country: Joi.string().min(3).max(200).trim(),
      state: Joi.string().min(3).max(200).trim(),
      city: Joi.string().min(3).max(128).trim()
    });

    if (req.method === 'POST') {
      const result: ProjectArgs = await createSchema.validateAsync(req.body);
      if (result) {
        req.projectArgs = { ...result };

        if (req.body === req.projectArgs) {
          req.body.id = uuid();
          next();
        }
      }
    }

    if (req.method === 'PUT') {
      const result: ProjectArgs = await updateSchema.validateAsync(req.body);
      if (result) {
        req.projectArgs = { ...result };

        if (req.body === req.registerArgs) {
          next();
        }
      }
    }
  } catch (error) {
    if (error && error.isJoi) {
      res.status(422).json({ message: error.details[0].message });
    } else {
      res.status(500).json({ message: 'Unexpected Error' });
    }
  }
};

// Validation to create and update a bid
export const bidValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /**
     * @desc      Schema for the request body
     * @method    POST
     */
    const createSchema: ObjectSchema = Joi.object().keys({
      price: Joi.number().required(),
      userId: Joi.string().min(3).max(200).trim().required(),
      projectId: Joi.string().min(3).max(200).trim().required()
    });

    /**
     * @desc      Schema for request body
     * @method    PUT
     */
    const updateSchema: ObjectSchema = Joi.object().keys({
      price: Joi.number(),
      accepted: Joi.boolean(),
      userId: Joi.string().min(3).max(200).trim(),
      projectId: Joi.string().min(3).max(200).trim()
    });

    if (req.method === 'POST') {
      const result: BidArgs = await createSchema.validateAsync(req.body);

      if (result) {
        req.bidArgs = { ...result };

        if (req.bidArgs === req.body) {
          req.body.id = uuid();
          next();
        }
      }
    }

    if (req.method === 'PUT') {
      const result: BidArgs = await updateSchema.validateAsync(req.body);

      if (result) {
        req.bidArgs = { ...result };

        if (req.bidArgs === req.body) {
          next();
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Unexpected Error' });
  }
};
