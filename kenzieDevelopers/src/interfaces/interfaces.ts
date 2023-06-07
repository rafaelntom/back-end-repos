import { QueryResult } from "pg";

type TypesOS = "Windows" | "Linux" | "MacOS";

interface IDeveloper {
  id: number;
  email: string;
  name: string;
}

interface IDeveloperInfo {
  developerSince: Date;
  preferredOS: TypesOS;
}

interface IDevInfoResult extends IDeveloperInfo {
  id: number;
  developerId: number;
}

type CreateDeveloper = Omit<IDeveloper, "id">;
type UpdateDeveloper = Partial<IDeveloper>;
type DeveloperResult = QueryResult<IDeveloper>;

interface IProject {
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate?: Date;
  developerId?: number;
}

type UpdateProject = Partial<IProject>;

export {
  IDeveloper,
  TypesOS,
  DeveloperResult,
  CreateDeveloper,
  UpdateDeveloper,
  IDeveloperInfo,
  IDevInfoResult,
  IProject,
  UpdateProject,
};
