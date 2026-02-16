export interface CotacaoProps {
  id: string;
  nomeUsuario: string;
  emailUsuario: string;
  checkIn: string;
  checkOut: string;
  adultos: number;
  criancas: number;
  suite?: string;
  quantidadeDeQuartos: number;
  precoCafeDaManha: string;
  precoCafeEJantar: string;
  precoPensaoCompleta: string;
  createdAt: string;
}

export interface ReservasProps {
    id: string,
    rgCPF: number,
    telefone: number,
    quantidadeDeAcompanhantes: number,
    adicional: string,
    valorAdicional: number,
    numeroReserva: number,
    cotacaoId: string,
    status: string,
    opcao: string,
    checkoutUrl?: string | null,
    createdAt: string,
    updatedAt: string,
    reservaAcompanhante: string[],
    cotacao: CotacaoProps
}