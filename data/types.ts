export interface Category {
  id: Number
  symbol: String
  children: Project[]
}

export interface Project {
  id: any
  type: string
  intendedTemplate: String
  title: String
  duration: Number
  position: Number
  andamento: String
  downloads: String[]
  images: String[]
  links: String[]
}

export type PauseTypes = 'minima' | 'semiminima' | 'croma';