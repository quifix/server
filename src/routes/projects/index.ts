import { Router } from 'express';
import multer from 'multer';

import { ProjectController } from '../../controllers';
import {
  asyncHandler,
  idParamValidation,
  projectValidation
} from '../../middleware';

const upload = multer({ dest: 'src/upload/' });

export const router = Router();

/**
 * @desc      Create a project
 * @route     POST /api/projects
 * @access    Private
 */
router.post(
  '/',
  projectValidation,
  upload.array('images', 4),
  asyncHandler(ProjectController.projectCreate)
);

/**
 * @desc      Get all projects
 * @route     GET /api/projects
 * @access    Private
 */
router.get('/', asyncHandler(ProjectController.projectGetAll));

router.use(idParamValidation);

/**
 * @desc      Get a single project
 * @route     GET /api/projects/:id
 * @access    Private
 */
router.get('/:id', asyncHandler(ProjectController.projectGetById));

/**
 * @desc      Update a project owned by the viewer
 * @route     PUT /api/projects/:id
 * @access    Private
 */
router.put(
  '/:id',
  projectValidation,
  asyncHandler(ProjectController.projectEdit)
);

/**
 * @desc      Delete a project owned by the viewer
 * @route     DELETE /api/projects/:id
 * @access    Private
 */
router.delete('/:id', asyncHandler(ProjectController.projectDelete));
