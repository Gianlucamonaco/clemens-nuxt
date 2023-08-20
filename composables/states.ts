export const useGallery = () => useState<any>('gallery', () => []);

export const useGalleryIndex = () => useState<number>('index', () => 0);

export const setGalleryIndex = (index: number) => {
  useGalleryIndex().value = index;
}

export const useImageThumb = () => useState<any>('image', () => '');

export const setImageThumb = (image: any) => {
  useImageThumb().value = image;
}

export const useContent = () => useState<any>('content', () => 'a')

export const setContent = (text: string) => {
  useContent().value = text;
}