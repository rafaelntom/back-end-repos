import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

const verifyDateAndDay = (req: Request, res: Response, next: NextFunction) => {
  const scheduleHour = parseInt(req.body.hour.replace(":", ""));

  if (scheduleHour < 800 || scheduleHour > 1800) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM");
  }

  const scheduleDate = req.body.date;
  const [year, month, day] = scheduleDate.split("/");

  const date = new Date(year, parseInt(month) - 1, day);

  const dayOfTheWeek = date.getDay();

  if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
  return next();
};

export default verifyDateAndDay;
