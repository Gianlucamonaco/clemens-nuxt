export interface Category {
  id: Number
  symbol: String
  children: Project[]
}

export interface Project {
  id: any
  type: string
  duration: Number
  position: Number
  title: String
  intendedTemplate: String
}