interface Grafico {
    cotacoes: string,
    data: string
    reservas: number
}
interface TotaisGrafico {
    totalCotacoes: number
    totalReservas:number
}

export interface UserDashboardProps {
    qtdCotacoes: number,
    qtdReservas: number,
    reservasPendentes: number,
    reservasConfirmadas: number,
    reservasCanceladas: number,
    dadosGrafico: Grafico[],
    totaisGrafico: TotaisGrafico[],
}