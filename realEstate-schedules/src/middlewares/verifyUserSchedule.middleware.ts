import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { AppDataSource } from "../data-source";
import { Schedule } from "../entities";

const verifyUserSchedule = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const scheduleRepo = AppDataSource.getRepository(Schedule);

  const realStateSchedule = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.realEstateId = :id", { id: request.body.realEstateId })
    .andWhere("schedule.hour = :hour", { hour: request.body.hour })
    .andWhere("schedule.date = :date", { date: request.body.date })
    .getMany();

  if (realStateSchedule.length) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const checkUserSchedule = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.userId = :id", { id: 1 })
    .andWhere("schedule.hour = :hour", { hour: request.body.hour })
    .andWhere("schedule.date = :date", { date: request.body.date })
    .getMany();

  if (checkUserSchedule.length) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};

export default verifyUserSchedule;
