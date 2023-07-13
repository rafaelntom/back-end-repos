import { AppDataSource } from "../data-source";
import { Schedule } from "../entities";
import realEstateRepository from "../repositories/realEstate.repository";

const createSchedule = async (payload: any, userId: number, realEstateId: number) => {
  const scheduleBody = {
    user: userId,
    realEstate: realEstateId,
    ...payload,
  };

  const scheduleRepo = AppDataSource.getRepository(Schedule);
  const createSchedule = scheduleRepo.create(scheduleBody);

  await scheduleRepo.save(createSchedule);

  return createSchedule;
};

const getAllRealEstateSchedules = async (realEstateId: any) => {
  const allRealEstatesSchedules = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  return allRealEstatesSchedules;
};

export default { createSchedule, getAllRealEstateSchedules };
