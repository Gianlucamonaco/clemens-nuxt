import { HEIGHT_ROW, HEIGHT_UNIT } from "../data/constants";
import type { ProjectContent } from "../data/types";

export const useDescription = () => useState<any>('description', () => []);

export const useDescriptionIndex = () => useState<number>('descriptionIndex', () => 0);

export const setDescriptionIndex = (index: number) => {
  useDescriptionIndex().value = index;
}

export const useImageThumb = () => useState<any>('image', () => '');

export const setImageThumb = (image: any) => {
  useImageThumb().value = image;
}

export const useContent = () => useState<any>('content', () => '')

export const setContent = (content: ProjectContent) => {
  const imgHeight = content.images?.length ? HEIGHT_ROW + HEIGHT_UNIT * 3 : 0;
  const txtHeight = content?.description ? Math.ceil(content.description?.length / 50) * HEIGHT_UNIT : HEIGHT_UNIT * 3;
  content.height = imgHeight + txtHeight;

  useContent().value = content;
}

export const useMousePos = () => useState<any>('mousePos', () => { return { x: null, y: null }})

export const setMousePos = (e: MouseEvent) => {
  useMousePos().value.x = e.clientX;
  useMousePos().value.y = e.clientY;
}

