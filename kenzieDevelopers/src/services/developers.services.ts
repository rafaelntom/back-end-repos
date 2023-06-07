import format from "pg-format";
import {
  CreateDeveloper,
  DeveloperResult,
  IDevInfoResult,
  IDeveloper,
  IDeveloperInfo,
} from "../interfaces/interfaces";
import { client } from "../database";
import { UpdateDeveloper } from "../interfaces/interfaces";
import { QueryResult } from "pg";
import { AppError } from "../error";

const createNewDeveloper = async (payload: CreateDeveloper): Promise<IDeveloper> => {
  const queryString: string = format(
    "INSERT INTO developers (%I) VALUES (%L) RETURNING *;",
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DeveloperResult = await client.query(queryString);

  return queryResult.rows[0];
};

const getDevelopers = async (id: string): Promise<IDeveloper> => {
  const queryResult: DeveloperResult = await client.query(
    `SELECT 
      d.id "developerId",
      d."name" "developerName",
      d.email "developerEmail",
      d2."developerSince" "developerInfoDeveloperSince",
      d2."preferredOS" "developerInfoPreferredOS"
    FROM
      developers d 
    LEFT JOIN
    "developerInfos" d2 ON d2."developerId" = d.id
    WHERE 
      d.id = $1;
    `,
    [id]
  );

  return queryResult.rows[0];
};

const patchDeveloper = async (
  payload: UpdateDeveloper,
  devId: string
): Promise<IDeveloper> => {
  const queryString: string = format(
    "UPDATE developers SET (%I) = ROW (%L) WHERE id = $1 RETURNING *;",
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResullt: DeveloperResult = await client.query(queryString, [devId]);
  return queryResullt.rows[0];
};

const deleteDeveloper = async (devId: string): Promise<void> => {
  await client.query("DELETE FROM developers WHERE ID = $1", [devId]);
};

const createDeveloperInfo = async (
  payload: IDeveloperInfo,
  devId: string
): Promise<IDevInfoResult> => {
  const checkDevInfoExists: QueryResult = await client.query(
    ` 
    SELECT 
      *
    FROM
      "developerInfos"
    WHERE 
      id = $1;`,
    [devId]
  );

  if (checkDevInfoExists.rowCount > 0) {
    const message = "Developer infos already exists";
    throw new AppError(message, 409);
  }

  const devInfo = {
    ...payload,
    developerId: devId,
  };

  const queryString: string = format(
    `INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(devInfo),
    Object.values(devInfo)
  );

  const queryResullt: QueryResult = await client.query(queryString);

  return queryResullt.rows[0];
};

export default {
  createNewDeveloper,
  getDevelopers,
  patchDeveloper,
  deleteDeveloper,
  createDeveloperInfo,
};
