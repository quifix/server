import express from 'express';

import { ProjectController } from '../../controllers';
import { idParamValidation, projectValidation } from '../../middleware';

export const router = express.Router();

/**
 * @desc      Create a project
 * @route     POST /api/projects
 * @access    Private
 */
router.post('/', projectValidation, ProjectController.createProject);

/**
 * @desc      Get all projects
 * @route     GET /api/projects
 * @access    Private
 */
router.get('/', ProjectController.getAllProjects);

/**
 * @desc      Get a single project
 * @route     GET /api/projects/:id
 * @access    Private
 */
router.get('/:id', idParamValidation, ProjectController.getProject);

/**
 * @desc      Update a project owned by the viewer
 * @route     PUT /api/projects/:id
 * @access    Private
 */
router.put(
  '/:id',
  idParamValidation,
  projectValidation,
  ProjectController.updateProject
);

/**
 * @desc      Delete a project owned by the viewer
 * @route     DELETE /api/projects/:id
 * @access    Private
 */
router.delete('/:id', idParamValidation, ProjectController.deleteProject);
