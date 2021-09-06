export const enum_status_loadind_module = {
  SCHEDULED: {
    id: 0,
    type: 'scheduled',
    initials: 'AG',
    description: 'Agendado',
  },
  TRUCK_ARRIVED: {
    id: 1,
    type: 'truck_arrived',
    initials: 'CC',
    description: 'Caminhão Chegou',
  },
  TRUCK_ENTERED: {
    id: 2,
    type: 'truck_entered',
    initials: 'CE',
    description: 'Caminhão Entrou',
  },
  LOADING_STARTED: {
    id: 3,
    type: 'loading_started',
    initials: 'CI',
    description: 'Iniciado',
  },
  FINISHED_LOADING: {
    id: 4,
    type: 'finished_loading',
    initials: 'CF',
    description: 'Finalizado',
  },
  TRUCK_DISPATCHED: {
    id: 5,
    type: 'truck_dispatched',
    initials: 'EX',
    description: 'Expedido',
  },
  CANCELED: {
    id: 6,
    type: 'canceled',
    initials: 'CA',
    description: 'Cancelado',
  },
};

export const enum_status_spawn_module = {
  SCHEDULED: {
    id: 0,
    type: 'scheduled',
    initials: 'AG',
    description: 'Agendado',
  },
  SPAWN_STARTED: {
    id: 3,
    type: 'spawn_starded',
    initials: 'DI',
    description: 'Iniciado',
  },
  FINISHED_SPAWN: {
    id: 4,
    type: 'finished_loading',
    initials: 'DF',
    description: 'Finalizado',
  },
  CANCELED: {
    id: 6,
    type: 'canceled',
    initials: 'CA',
    description: 'Cancelado',
  },
};
