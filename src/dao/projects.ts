import { Projects } from '@prisma/client';

import { prisma } from '../db';

class ProjectDAO {
  // Create Project
  async create(data: Projects): Promise<Projects> {
    try {
      const project: Projects = await prisma.projects.create({ data });

      return project;
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Find All Projects
  async findAll(): Promise<Projects[]> {
    try {
      const projects: Projects[] = await prisma.projects.findMany();

      return projects;
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Find Project By ID
  async findByID(id: string): Promise<Projects | null> {
    try {
      const project: Projects | null = await prisma.projects.findUnique({
        where: { id }
      });

      return project;
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Edit Project
  async edit(id: string, data: Projects): Promise<Projects> {
    try {
      const project: Projects = await prisma.projects.update({
        where: { id },
        data
      });

      return project;
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Delete Project
  async destroy(id: string): Promise<boolean> {
    try {
      const project: Projects | null = await this.findByID(id);

      if (project) {
        await prisma.projects.delete({ where: { id: project.id } });

        return true;
      } else {
        return false;
      }
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }
}

export default new ProjectDAO();
