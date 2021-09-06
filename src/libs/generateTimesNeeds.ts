import { addMinutes, format } from 'date-fns';
import AppError from '../errors/AppError';

const generateTimesNeeds = (time: Date, grids: number): string[] => {
  try {
    const timesGridsNeeds = [];
    let newTime = time;
    for (let index = 0; index < grids; index++) {
      if (format(time, 'yyyy-MM-dd') !== format(newTime, 'yyyy-MM-dd')) {
        throw new AppError(
          'Não há espaço suficiente na grade para este agendamento',
        );
      }
      const formatedTime = format(newTime, 'HH:mm');

      timesGridsNeeds.push(formatedTime);

      newTime = addMinutes(newTime, 30);
    }

    return timesGridsNeeds;
  } catch (error) {
    throw new AppError(error);
  }
};

export default generateTimesNeeds;
