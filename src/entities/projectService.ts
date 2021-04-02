import { Projects } from '@prisma/client';

import { ProjectDao } from '../daos';

const createProject = async (data: Projects): Promise<Projects> => {
  try {
    const project: Projects = await ProjectDao.create(data);
    return project;
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const findProjects = async (): Promise<Projects[]> => {
  try {
    const projects: Projects[] = await ProjectDao.findAll();
    return projects;
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const findProjectByID = async (id: string): Promise<Projects> => {
  try {
    const project: Projects | null = await ProjectDao.findByID(id);

    return project ? project : Promise.reject('Project not found.');
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const editProject = async (id: string, update: Projects): Promise<Projects> => {
  try {
    const project: Projects = await ProjectDao.edit(id, update);

    return project;
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const deleteProject = async (id: string): Promise<string> => {
  try {
    const done: boolean = await ProjectDao.destroy(id);

    return done ? 'Success!' : Promise.reject('Project not found.');
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

export default {
  createProject,
  deleteProject,
  editProject,
  findProjectByID,
  findProjects
};
