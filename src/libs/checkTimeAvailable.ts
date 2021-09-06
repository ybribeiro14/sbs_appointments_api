import BusyTimesRepository from 'repositories/BusyTimesRepository';
import { ObjectID } from 'typeorm';
import AppError from '../errors/AppError';

interface IParamsCheckTimeAvailable {
  contract_id: number;
  parsedDate: Date;
  module: string;
  team_id: number;
  timesGridsNeeds: string[];
}

interface IReturnData {
  busyTimes: string[];
  idBusyTimes?: ObjectID;
}

const checkTimeAvailable = async ({
  contract_id,
  parsedDate,
  module,
  team_id,
  timesGridsNeeds,
}: IParamsCheckTimeAvailable): Promise<IReturnData> => {
  try {
    const busyTimesRepository = new BusyTimesRepository();

    const busyTimesByDate = await busyTimesRepository.findByDateTeam(
      contract_id,
      parsedDate,
      module,
      team_id,
    );
    let busyTimes: string[] = [];
    if (busyTimesByDate) {
      busyTimes = JSON.parse(busyTimesByDate?.busy_times);
      timesGridsNeeds.forEach((hourTime: string) => {
        const findTimeBusy = busyTimes.find(
          (item: string) => item === hourTime,
        );
        if (findTimeBusy) {
          throw new AppError(
            'Não existe espaço na grade para este agendamento',
          );
        }
      });
    } else {
      // o registro do dia não existe no Mongo
      const createBusyTimes = await busyTimesRepository.create({
        busy_times: JSON.stringify([]),
        module,
        contract_id,
        date: parsedDate,
        team_id,
      });

      return {
        busyTimes: timesGridsNeeds,
        idBusyTimes: createBusyTimes.id,
      };
    }

    // Possui horário então retorna o novo array para ser atualizado
    return {
      busyTimes: [...busyTimes, ...timesGridsNeeds],
      idBusyTimes: busyTimesByDate.id,
    };
  } catch (error) {
    throw new AppError(error);
  }
};

export default checkTimeAvailable;
