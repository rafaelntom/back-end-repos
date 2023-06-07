import format from "pg-format";
import { client } from "../database";
import { IProject, UpdateProject } from "../interfaces/interfaces";
import { QueryResult } from "pg";
import { AppError } from "../error";

const createNewProject = async (payload: IProject) => {
  const queryStringFormat: string = format(
    `
        INSERT INTO
            projects (%I)
        VALUES (%L) 
        RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResullt: QueryResult = await client.query(queryStringFormat);

  return queryResullt.rows[0];
};

const getProjectById = async (projectId: string) => {
  const queryResult: QueryResult = await client.query(
    `
    SELECT 
        p.id "projectId",
        p."name" "projectName",
        p.description  "projectDescription",
        p.repository "projectRepository",
        p."startDate" "projectStartDate",
        p."endDate" "projectEndDate",
        d."name" "projectDeveloperName"
    FROM 
        projects p
    LEFT JOIN
        developers d ON p."developerId" = d.id
    WHERE 
        p.id = $1;
    `,
    [projectId]
  );

  return queryResult.rows[0];
};

const updateProject = async (payload: UpdateProject, projectId: string) => {
  if (payload.developerId) {
    delete payload.developerId;
  }

  const queryString: string = format(
    `
    UPDATE projects SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult = await client.query(queryString, [projectId]);

  return queryResult.rows[0];
};

export default { createNewProject, getProjectById, updateProject };
