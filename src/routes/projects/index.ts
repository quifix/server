import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  idParamValidation,
  projectValidation,
  verifyOwnership
} from '../../middlewares';

export const router = express.Router();
const prisma: PrismaClient = new PrismaClient();

/**
 * @desc      Create a project
 * @route     POST /api/projects
 * @access    Private
 */
router.post(
  '/',
  projectValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.viewer) {
        const project = await prisma.projects.create({ data: req.body });
        if (project) {
          res.status(200).json(project);
        }
      }
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while creating the project. Please try again later!"
      });
    }
  }
);

/**
 * @desc      Get all projects
 * @route     GET /api/projects
 * @access    Private
 */
router.get(
  '/',
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const projects = await prisma.projects.findMany();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while retrieving the projects. Please try again later"
      });
    }
  }
);

/**
 * @desc      Get a single project
 * @route     GET /api/projects/:id
 * @access    Private
 */
router.get(
  '/:id',
  idParamValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const project = await prisma.projects.findUnique({ where: { id } });

      if (!project) {
        res.status(404).json({ message: 'Project not found.' });
      }

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while looking for the project. Please try again later!"
      });
    }
  }
);

/**
 * @desc      Update a project owned by the viewer
 * @route     PUT /api/projects/:id
 * @access    Private
 */
router.put('/:id', idParamValidation, async (req: Request, res: Response) => {
  try {
    if (req.viewer) {
      const id = req.params.id;
      const project = await prisma.projects.findUnique({ where: { id } });

      if (!project) {
        res.status(404).json({ message: 'Project not found.' });
      } else {
        if ((await verifyOwnership(project, req.viewer)) === true) {
          const result = await prisma.projects.update({
            where: { id },
            data: { ...req.body }
          });

          if (result) {
            res.status(201).json(result);
          }
        } else {
          res
            .status(403)
            .json({ message: 'Access denied! You do not own this project.' });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message:
        "We've encounted an error while updating your project. Please try again later!"
    });
  }
});

/**
 * @desc      Delete a project owned by the viewer
 * @route     DELETE /api/projects/:id
 * @access    Private
 */
router.delete(
  '/:id',
  idParamValidation,
  async (req: Request, res: Response) => {
    try {
      if (req.viewer) {
        const id = req.params.id;
        const project = await prisma.projects.findUnique({ where: { id } });

        if (!project) {
          res.status(404).json({ message: 'Project not found.' });
        } else {
          if ((await verifyOwnership(project, req.viewer)) === true) {
            await prisma.projects.delete({ where: { id: project.id } });

            res.status(204).end();
          } else {
            res
              .status(403)
              .json({ message: 'Access denied! You do not own this project.' });
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while deleting your project. Please try again later!"
      });
    }
  }
);