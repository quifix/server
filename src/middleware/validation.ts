import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';

import { BidArgs, ProjectArgs, UserUpdateArgs } from '../@types/express';
import { ApiError } from '../controllers';

// Validation to update an existing user
export const userUpdateValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /**
     * @desc      Schema for the request body
     * @method    PUT
     */
    const updateSchema = yup.object().shape({
      name: yup.string().min(3).max(128).trim(),
      email: yup.string().email().min(3).max(200).trim(),
      avatar: yup.string().min(3).max(500).trim(),
      address: yup.string().min(8).max(255).trim(),
      city: yup.string().min(3).max(128).trim(),
      state: yup.string().min(3).max(200).trim(),
      country: yup.string().min(3).max(200).trim(),
      type: yup.string().min(3).max(128).trim(),
      walletId: yup.string().min(3).max(255).trim(),
      income: yup.number().integer()
    });

    const result: UserUpdateArgs = await updateSchema.validate(req.body);

    if (result) {
      req.body = result;
      next();
    }
  } catch ({ errors }) {
    return next(ApiError.validationError(errors[0]));
  }
};

// Validation for the request param id.
export const idParamValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /**
     * @desc      Schema for req.params.id
     */
    const idParamSchema = yup.string().min(3).max(255).trim();

    const result: string | undefined = await idParamSchema.validate(
      req.params.id
    );

    if (result) {
      req.params.id = result;
      next();
    }
  } catch ({ errors }) {
    return next(ApiError.validationError(errors[0]));
  }
};

// Validation to update an existing project
export const projectValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /**
     * @desc      Schema for the request body
     * @method    POST
     */
    const createSchema = yup.object().shape({
      title: yup.string().min(3).max(200).trim().required(),
      description: yup.string().max(500).trim().required(),
      type: yup.string().min(3).max(128).trim().required(),
      userId: yup.string().min(3).max(200).trim().required(),
      address: yup.string().min(8).max(255).trim().required(),
      country: yup.string().min(3).max(200).trim().required(),
      state: yup.string().min(3).max(200).trim().required(),
      city: yup.string().min(3).max(128).trim().required()
    });

    /**
     * @desc      Schema for the request body
     * @method    PUT
     */
    const updateSchema = yup.object().shape({
      title: yup.string().min(3).max(200).trim(),
      description: yup.string().max(500).trim(),
      type: yup.string().min(3).max(128).trim(),
      isOpen: yup.boolean(),
      userId: yup.string().min(3).max(200).trim(),
      address: yup.string().min(8).max(255).trim(),
      country: yup.string().min(3).max(200).trim(),
      state: yup.string().min(3).max(200).trim(),
      city: yup.string().min(3).max(128).trim()
    });

    if (req.method === 'POST') {
      const result: ProjectArgs = await createSchema.validate(req.body);
      if (result) {
        req.body = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result: ProjectArgs = await updateSchema.validate(req.body);
      if (result) {
        req.body = result;
        next();
      }
    }
  } catch ({ errors }) {
    return next(ApiError.validationError(errors[0]));
  }
};

// Validation to create and update a bid
export const bidValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /**
     * @desc      Schema for the request body
     * @method    POST
     */
    const createSchema = yup.object().shape({
      price: yup.number().required(),
      userId: yup.string().min(3).max(200).trim().required(),
      projectId: yup.string().min(3).max(200).trim().required()
    });

    /**
     * @desc      Schema for request body
     * @method    PUT
     */
    const updateSchema = yup.object().shape({
      price: yup.number(),
      accepted: yup.boolean(),
      userId: yup.string().min(3).max(200).trim(),
      projectId: yup.string().min(3).max(200).trim()
    });

    if (req.method === 'POST') {
      const result: BidArgs = await createSchema.validate(req.body);

      if (result) {
        req.body = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result: BidArgs = await updateSchema.validate(req.body);

      if (result) {
        req.body = result;
        next();
      }
    }
  } catch ({ errors }) {
    return next(ApiError.validationError(errors[0]));
  }
};
