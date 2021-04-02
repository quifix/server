import { NextFunction, Request, Response } from 'express';
import { Images, Projects } from '@prisma/client';
import { UploadApiResponse } from 'cloudinary';
import { v4 as uuid } from 'uuid';

import { imageService, projectService, userService } from '../service';
import ApiError from './error';
import { cloudinary } from '../utils';

interface ResponseProject extends Projects {
  images?: Images[];
}

class ProjectController {
  /**
   * @desc      Create a project
   * @route     POST /api/projects
   * @access    Private
   */
  async projectCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const project: Projects = await projectService.createProject(req.body);

      if (req.files) {
        for await (const file of Object.assign(req.files)) {
          const {
            url,
            public_id
          }: UploadApiResponse = await cloudinary.uploader.upload(file.path, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
          });

          const newImage: Images = {
            id: uuid(),
            url,
            public_id,
            projectId: project.id
          };

          await imageService.addImage(newImage);
        }

        res.status(200).json(project);
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
   * @desc      Get all projects
   * @route     GET /api/projects
   * @access    Private
   */

  async projectGetAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projects: Projects[] = await projectService.findProjects();

      for await (const project of projects) {
        const foundProject: ResponseProject = project;

        const images: Images[] = await imageService.findProjectImages(
          foundProject.id
        );

        foundProject.images = images;
      }

      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc      Get a single project
   * @route     GET /api/projects/:id
   * @access    Private
   */
  async projectGetById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;

      const project: ResponseProject | null = await projectService.findProjectByID(
        id
      );

      if (!project) {
        return next(ApiError.notFound('Project not found.'));
      } else {
        const images: Images[] = await imageService.findProjectImages(
          project.id
        );

        if (images) {
          project.images = images;
          res.status(200).json(project);
        } else {
          res.status(200).json(project);
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
   * @desc      Update a project owned by the viewer
   * @route     PUT /api/projects/:id
   * @access    Private
   */
  async projectEdit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const project: Projects | null = await projectService.findProjectByID(id);

      if (!project) {
        return next(ApiError.notFound('Project not found.'));
      } else {
        if (
          (await userService.verifyOwnership(project, req.auth0User.sub)) ===
          true
        ) {
          const updatedProject: Projects = await projectService.editProject(
            id,
            req.body
          );

          res.status(200).json(updatedProject);
        } else {
          return next(
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
  async projectDelete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const project: Projects | null = await projectService.findProjectByID(id);

      if (!project) {
        next(ApiError.notFound('Project not found.'));
      } else {
        if (
          (await userService.verifyOwnership(project, req.auth0User.sub)) ===
          true
        ) {
          await projectService.deleteProject(id);
          res.status(204).end();
        } else {
          return next(
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
