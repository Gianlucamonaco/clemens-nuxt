export interface Category {
  id: number
  num: number
  symbol: string
  children: Project[]
}

export interface Project {
  id: any
  num: number
  type: string
  intendedTemplate: string
  title: string
  duration: number
  position: number
  andamento: string
  downloads: string[]
  images: string[]
  links: string[]
}

export type PauseTypes = 'minima' | 'semiminima' | 'croma';