import { Images } from '@prisma/client';

import { prisma } from '../db';

const addImage = async (data: Images): Promise<Images> => {
  try {
    const image: Images = await prisma.images.create({ data });
    return image;
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const findProjectImages = async (projectId: string): Promise<Images[]> => {
  try {
    const images: Images[] = await prisma.images.findMany({
      where: { projectId }
    });
    return images;
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

export default { addImage, findProjectImages };
