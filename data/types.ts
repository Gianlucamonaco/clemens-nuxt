export interface Category {
  id: number
  num: number
  symbol: string
  children: Project[]
}

export interface Project {
  id: number
  num: number
  type: string
  intendedTemplate: string
  text: string
  title: string
  duration: number
  position?: number
  sounds?: File[]
  downloads?: string[]
  images?: File[]
  links?: string[]
}

export interface ProjectContent {
  title?: string,
  description?: string,
  links?: { text: string, url: string }[],
  downloads?: { text: string, id: number, file: File }[],
  images?: File[],
  videos?: { text: string, src: string },
}

export interface File {
  id: any,
  indexOf: number,
  uuid: string,
  url: string,
  alt?: string,
  title?: string,
  left?: number,
  top?: number,
  bottom?: number,
}

export type PauseTypes = 'minima' | 'semiminima' | 'croma';