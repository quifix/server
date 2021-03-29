import { NextFunction, Request, Response } from 'express';
import { Projects } from '@prisma/client';

import prisma from '../../data';
import { verifyOwnership } from '../../lib';
import ApiError from '../error';

class ProjectController {
  /**
   * @desc      Create a project
   * @route     POST /api/projects
   * @access    Private
   */
  async createProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const project: Projects = await prisma.projects.create({
        data: req.body
      });

      res.status(200).json(project);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc      Get all projects
   * @route     GET /api/projects
   * @access    Private
   */
  async getAllProjects(req: Request, res: Response): Promise<void> {
    const projects: Projects[] = await prisma.projects.findMany();
    res.status(200).json(projects);
  }

  /**
   * @desc      Get a single project
   * @route     GET /api/projects/:id
   * @access    Private
   */
  async getProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const project: Projects | null = await prisma.projects.findUnique({
        where: { id }
      });

      if (!project) {
        next(ApiError.notFound('Project not found.'));
        return;
      } else {
        res.status(200).json(project);
      }
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc      Update a project owned by the viewer
   * @route     PUT /api/projects/:id
   * @access    Private
   */
  async updateProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const project: Projects | null = await prisma.projects.findUnique({
        where: { id }
      });

      if (!project) {
        next(ApiError.notFound('Project not found.'));
        return;
      } else {
        if ((await verifyOwnership(project, req.auth0User.sub)) === true) {
          const updatedProject: Projects = await prisma.projects.update({
            where: { id: project.id },
            data: { ...req.body }
          });

          res.status(200).json(updatedProject);
        } else {
          next(
            ApiError.invalidCredentials(
              'Access denied! You do not own this project.'
            )
          );
        }
      }
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc      Delete a project owned by the viewer
   * @route     DELETE /api/projects/:id
   * @access    Private
   */
  async deleteProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const project: Projects | null = await prisma.projects.findUnique({
        where: { id }
      });

      if (!project) {
        next(ApiError.notFound('Project not found.'));
      } else {
        if ((await verifyOwnership(project, req.auth0User.sub)) === true) {
          await prisma.projects.delete({ where: { id: project.id } });
          res.status(204).end();
        } else {
          next(
            ApiError.invalidCredentials(
              'Access denied! You do not own this project.'
            )
          );
        }
      }
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }
}

export default new ProjectController();
