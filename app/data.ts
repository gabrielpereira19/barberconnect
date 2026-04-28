export type Agendamento = {
  id: number;
  barbearia: string;
  servico: string;
  data: string;
  hora: string;
  status: string;
};

export const agendamentos: Agendamento[] = [];