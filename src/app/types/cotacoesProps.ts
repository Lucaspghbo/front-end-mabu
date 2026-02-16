export interface CotacoesProps {
    id: string,
    nomeUsuario: string,
    emailUsuario: string,
    checkIn: string,
    checkOut: string,
    adultos: number,
    criancas: number,
    quantidadeDeQuartos: number,
    precoCafeDaManha: number,
    precoCafeEJantar: number,
    precoPensaoCompleta: number,
    usuarioId: string,
    suite?: string,
    cotacaoCriancasInfoIdade: string[],
    porcentagemDesconto: number,
    createdAt: string
}