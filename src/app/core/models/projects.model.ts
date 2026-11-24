export interface IProjects {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveURL: string;
  GitHubURL: string;
}

export interface IProjectsAPI {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveURL: string;
  GitHubURL: string;
}
