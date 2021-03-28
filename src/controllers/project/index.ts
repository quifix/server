import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Projects } from '@prisma/client';

import { verifyOwnership } from '../../middleware';
import ApiError from '../error';

const prisma: PrismaClient = new PrismaClient();

class ProjectController {
  /**
   * @desc      Create a project
   * @route     POST /api/projects
   * @access    Private
   */
  async createProject(req: Request, res: Response): Promise<void> {
    const project: Projects = await prisma.projects.create({ data: req.body });

    res.status(200).json(project);
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
    const id: string = req.params.id;
    const project: Projects | null = await prisma.projects.findUnique({
      where: { id }
    });

    if (!project) {
      next(ApiError.notFound('Project not found.'));
    } else {
      if ((await verifyOwnership(project, req.auth0User.sub)) === true) {
        await prisma.projects.delete({ where: { id: project.id } });
      } else {
        next(
          ApiError.invalidCredentials(
            'Access denied! You do not own this project.'
          )
        );
      }
    }
  }
}

export default new ProjectController();
