import type { Category } from '@/data/types';
import { soundSymbol } from '@/data/constants';
import random from 'random';

export const useProcessCategories = (raw: Category[]) => {
  const categories = raw?.map((category: any) => {

    category.children?.forEach((project: any) => {
  
      // Assign vertical position to each project
      project.position = random.int(0, 4) * 2;
  
      // Assign offset left to each sound dot
      project.sounds?.forEach((sound: any) => {
        sound.left = `${sound.num * soundSymbol.length * 10.2}px`;
  
        if (project.position > 4) {
          sound.top = `${17 + random.int(0, 4) * 17}px`;
        }
        else {
          sound.bottom = `${34 + random.int(0, 4) * 17}px`;
        }
      })
    })

    return category;
  })
  
  return categories;
}