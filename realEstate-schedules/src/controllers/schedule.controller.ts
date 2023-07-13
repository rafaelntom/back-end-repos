import { Request, Response } from "express";
import scheduleServices from "../services/schedule.services";

const create = async (req: Request, res: Response) => {
  const userId = Number(res.locals.decoded.sub);
  const realEstateId = req.body.realEstateId;
  const payload = req.body;

  const newSchedule = await scheduleServices.createSchedule(
    payload,
    userId,
    realEstateId
  );

  return res.status(201).json({ message: "Schedule created" });
};

const read = async (req: Request, res: Response) => {
  const realEstateId = Number(req.params.id);
  const foundSchedules = await scheduleServices.getAllRealEstateSchedules(realEstateId);

  return res.status(200).json(foundSchedules);
};

export default { create, read };
