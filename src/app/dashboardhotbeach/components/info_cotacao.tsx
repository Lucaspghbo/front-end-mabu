"use client";

import { CotacaoProps, ReservasProps } from "@/types/reservasProps";

export const InfoCotacao = ({
  cotacao,
  reserva,
  handleSeeCotacao
}: {
  cotacao: CotacaoProps | null;
  reserva?: ReservasProps | null;
  handleSeeCotacao: () => void;
}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-2 bg-black/50 z-[9999]">
      <div className="w-full max-w-3xl max-sm:max-h-[90vh] bg-white p-6 rounded-lg shadow-xl space-y-6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Detalhes da Cotação
        </h2>

        {/* Informações do Usuário e Cotação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-gray-600 font-medium">
                Nome do Usuário:
              </span>
              <p className="text-lg font-semibold text-gray-900">
                {cotacao?.nomeUsuario || "Não disponível"}
              </p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Email:</span>
              <p className="text-lg font-semibold text-gray-900">
                {cotacao?.emailUsuario || "Não disponível"}
              </p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">
                Data de Criação:
              </span>
              <p className="text-lg font-semibold text-gray-900">
                {cotacao?.createdAt || "Não disponível"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-gray-600 font-medium">Check-in:</span>
              <p className="text-lg font-semibold text-gray-900">
                {cotacao?.checkIn || "Não disponível"}
              </p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Check-out:</span>
              <p className="text-lg font-semibold text-gray-900">
                {cotacao?.checkOut || "Não disponível"}
              </p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">
                Quantidade de Quartos:
              </span>
              <p className="text-lg font-semibold text-gray-900">
                {cotacao?.quantidadeDeQuartos || "Não disponível"}
              </p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Suíte:</span>
              <p className="text-lg font-semibold text-gray-900">
                {cotacao?.suite || "Não especificado"}
              </p>
            </div>
          </div>
        </div>

        {/* Informações de Preços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-gray-600 font-medium">
                Preço Café da Manhã:
              </span>
              <p className="text-lg font-semibold text-gray-900">
                R$ {cotacao?.precoCafeDaManha || "Não disponível"}
              </p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">
                Preço Café e Jantar:
              </span>
              <p className="text-lg font-semibold text-gray-900">
                R$ {cotacao?.precoCafeEJantar || "Não disponível"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-gray-600 font-medium">
                Preço Pensão Completa:
              </span>
              <p className="text-lg font-semibold text-gray-900">
                R$ {cotacao?.precoPensaoCompleta || "Não disponível"}
              </p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Adultos:</span>
              <p className="text-lg font-semibold text-gray-900">
                {cotacao?.adultos || "Não disponível"}
              </p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Crianças:</span>
              <p className="text-lg font-semibold text-gray-900">
                {cotacao?.criancas || "Não disponível"}
              </p>
            </div>
          </div>
        </div>

        {reserva?.checkoutUrl && (
          <div className="space-y-2">
            <span className="text-gray-600 font-medium">URL de Checkout:</span>
            <p className="text-lg font-semibold">
              <a
                href={reserva.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {reserva.checkoutUrl}
              </a>
            </p>
          </div>
        )}

        {/* Botão de Fechar */}
        <div className="flex justify-center">
          <button
            onClick={handleSeeCotacao}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
