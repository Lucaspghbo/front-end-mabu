"use client";
import { CotacoesProps } from "@/types/cotacoesProps";
import Image from "next/image";

export function CotacaoPDF({
  cotacaoSelected
}: {
  cotacaoSelected: CotacoesProps | null;
}) {
  return (
    <div className="flex flex-col" id="cotacao-pdf">
      <main className="w-[794px] h-[1123px] mx-auto p-4 px-8 pl-10">
        {/* Cabeçalho */}
        <header className="relative flex justify-center items-center">
          <Image
            src="/images/mabu/pdf-cotacao/logo.png"
            alt="Logo Mabu"
            width={792}
            height={64}
            className="w-[792px] h-[64px] object-contain"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Image
                key={index}
                src="/images/mabu/pdf-cotacao/star.png"
                alt="Logo Mabu"
                width={35}
                height={31}
                className="w-[35px] h-[31px] object-contain"
              />
            ))}
          </div>
        </header>
        {/* Informações do hotel */}
        <div className="w-full flex flex-col mx-auto mt-4">
          <div className="w-full flex items-start justify-between">
            <div>
              <h2 className="font-bold text-sm">
                COTAÇÃO MABU THERMAS GRAND RESORT
              </h2>
              <span className="font-bold text-sm">
                Nome: {cotacaoSelected?.nomeUsuario}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                Data {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="mt-8">
            <Image
              src="/images/mabu/pdf-cotacao/imagem.png"
              alt="Imagem do Hotel"
              width={794}
              height={300}
            />
          </div>
        </div>
        <div className="w-full flex flex-col mx-auto mt-10">
          <table className="border border-blue-200/40 border-collapse text-xs">
            <thead className="bg-blue-200/40 border-t-2 border-[#0D5074] h-10">
              <tr className="border border-[#1F6890]">
                <th className="border border-[#1F6890] p-2">SUÍTE</th>
                <th className="border border-[#1F6890] p-2">INCLUSO</th>
                <th className="border border-[#1F6890] p-2">ESTACIONAMENTO</th>
                <th className="border border-[#1F6890] p-2">QTD DE HOSPEDES</th>
                <th className="border border-[#1F6890] p-2">HOTEL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center h-10 border border-[#1F6890]">
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected?.suite || "1"}
                </td>
                <td className="border border-[#1F6890] p-2">
                  Desconto 30% á Vista
                </td>
                <td className="border border-[#1F6890] p-2">
                  Incluso sem tarifas
                </td>
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected?.adultos} Adultos{" "}
                  {cotacaoSelected?.criancas &&
                    `+ ${cotacaoSelected?.criancas} Crianças`}
                </td>
                <td className="border border-[#1F6890] p-2">Mabu - Thermas</td>
              </tr>
            </tbody>
          </table>
          {/* Tabela */}
          <table className="w-full border border-blue-200/40 border-collapse mt-8 text-xs">
            <thead className="bg-blue-200/40 border-t-2 border-[#0D5074] h-10">
              <tr className="border border-[#1F6890] text-center">
                <th className="border border-[#1F6890] p-2">Pensão</th>
                <th className="border border-[#1F6890] p-2">
                  Valor parcelado no <br /> Cartão em 12x
                </th>
                <th className="border border-[#1F6890] p-2">
                  Valor á Vista <br /> {cotacaoSelected?.porcentagemDesconto}% OFF
                </th>
                <th className="border border-[#1F6890] p-2">
                  Incluso no pacote
                </th>
                <th className="border border-[#1F6890] p-2">
                  Incluso no pacote
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-[11px] h-10 border border-[#1F6890]">
                <td className="border border-[#1F6890] p-2">Café da Manhã</td>
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected?.precoCafeDaManha.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </td>
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected &&
                    (cotacaoSelected?.precoCafeDaManha * (1 - cotacaoSelected.porcentagemDesconto / 100)).toLocaleString(
                      "pt-BR",
                      { style: "currency", currency: "BRL", maximumFractionDigits: 2 }
                    )}
                </td>
                <td className="border border-[#1F6890] p-2">Café da manhã</td>
                <td className="border border-[#1F6890] p-2">
                  Não cobramos taxa
                </td>
              </tr>
              <tr className="text-center text-[11px] h-10 border border-[#1F6890]">
                <td className="border border-[#1F6890] p-2">Café e Jantar</td>
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected?.precoCafeEJantar.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </td>
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected &&
                    (cotacaoSelected?.precoCafeEJantar * (1 - cotacaoSelected.porcentagemDesconto / 100)).toLocaleString(
                      "pt-BR",
                      { style: "currency", currency: "BRL", maximumFractionDigits: 2 }
                    )}
                </td>
                <td className="border border-[#1F6890] p-2">
                  Café da manhã e jantar
                </td>
                <td className="border border-[#1F6890] p-2">
                  Não cobramos taxa
                </td>
              </tr>
              <tr className="text-center text-[11px] h-10 border border-[#1F6890]">
                <td className="border border-[#1F6890] p-2">Pensão Completa</td>
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected?.precoPensaoCompleta.toLocaleString(
                    "pt-BR",
                    { style: "currency", currency: "BRL" }
                  )}
                </td>
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected &&
                    (cotacaoSelected?.precoPensaoCompleta * (1 - cotacaoSelected.porcentagemDesconto / 100)).toLocaleString(
                      "pt-BR",
                      { style: "currency", currency: "BRL", maximumFractionDigits: 2 }
                    )}
                </td>
                <td className="border border-[#1F6890] p-2">
                  Café da manhã, Almoço, Jantar
                </td>
                <td className="border border-[#1F6890] p-2">
                  Não cobramos taxa
                </td>
              </tr>
            </tbody>
            <thead className="bg-blue-200/40 border-t-2 h-10">
              <tr className="border border-[#1F6890]">
                <th className="border border-[#1F6890] p-2">Check-in</th>
                <th className="border border-[#1F6890] p-2">Check-out</th>
                <th className="border border-[#1F6890] p-2">Horário Entrada</th>
                <th className="border border-[#1F6890] p-2">Horário Saída</th>
                <th className="border border-[#1F6890] p-2"> </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-[11px] h-10 border border-[#1F6890]">
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected?.checkIn?.slice(0, 10)}
                </td>
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected?.checkOut?.slice(0, 10)}
                </td>
                <td className="border border-[#1F6890] p-2">15:00</td>
                <td className="border border-[#1F6890] p-2">12:00</td>
                <td className="border border-[#1F6890] p-2"></td>
              </tr>
            </tbody>
            <thead className="bg-blue-200/40 border-t-2 h-10">
              <tr className="border border-[#1F6890]">
                <th className="border border-[#1F6890] p-2">
                  Acesso Blue Park
                </th>
                <th className="border border-[#1F6890] p-2">Horário Entrada</th>
                <th className="border border-[#1F6890] p-2">Horário Saída</th>
                <th className="border border-[#1F6890] p-2">Valor Adulto</th>
                <th className="border border-[#1F6890] p-2">Valor Criança</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-[11px] h-10 border border-[#1F6890]">
                <td className="border border-[#1F6890] p-2">Incluso</td>
                <td className="border border-[#1F6890] p-2">08:00</td>
                <td className="border border-[#1F6890] p-2">19:00</td>
                <td className="border border-[#1F6890] p-2">Incluso</td>
                <td className="border border-[#1F6890] p-2">Incluso</td>
              </tr>
            </tbody>
            <thead className="bg-blue-200/40 border-t-2 h-10">
              <tr className="border border-[#1F6890]">
                <th className="border border-[#1F6890] p-2">
                  Formas De Pagamento
                </th>
                <th className="border border-[#1F6890] p-2">Parcelado</th>
                <th className="border border-[#1F6890] p-2">Á Vista</th>
                <th className="border border-[#1F6890] p-2"></th>
                <th className="border border-[#1F6890] p-2">Taxas</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-[11px] h-10 border border-[#1F6890]">
                <td className="border border-[#1F6890] p-2">
                  Cartão Crédito <br /> Pix, Transferência
                </td>
                <td className="border border-[#1F6890] p-2">
                  Cartão de Crédito <br /> em até 12x C/juros
                </td>
                <td className="border border-[#1F6890] p-2">Via Pix com 10%</td>
                <td className="border border-[#1F6890] p-2"></td>
                <td className="border border-[#1F6890] p-2">
                  Sem taxas inclusas
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <div className="w-[794px] flex flex-col items-center pl-10">
        <div className="w-full">
          <div className="flex flex-col gap-3 items-center">
            <h2 className="w-full text-center font-bold">Termos de reserva</h2>
            <section className="mt-4 font-bold flex flex-col gap-3">
              <p>
                Reserva Flexível (Podendo ser alterada para outras datas
                disponíveis no calendário).
              </p>
              <p>
                Em caso de cancelamentos, solicitamos que realize um pedido com
                até 2 dias de antecedência.{" "}
              </p>
              <p>
                Não cobramos taxas pelo cancelamento e o valor pode ser
                estornado em um período de até 24h para a conta de origem na
                qual foi realizado o pagamento.
              </p>
              <p>Métodos de pagamento via: CARTÃO DE CRÉDITO, BOLETO OU PIX.</p>
              <p>
                Será necessário a apresentação de um documento com foto do
                responsável pela reserva.
              </p>
            </section>
          </div>
          <div className="flex flex-col gap-4 mt-4 px-8">
            <Image
              src="/images/mabu/pdf-cotacao/coluna-image-1.png"
              width={650}
              height={350}
              alt="Imagem Mabu"
              className="w-[650px] h-[280px] object-fill rounded-xs"
            />
            <div className="flex gap-4 max-w-[650px]">
              <Image
                src="/images/mabu/pdf-cotacao/Imagem5.png"
                width={319}
                height={350}
                alt="Imagem Mabu"
                className="w-[319px] h-[280px] object-fill rounded-xs"
              />
              <Image
                src="/images/mabu/pdf-cotacao/Imagem6.png"
                width={315}
                height={350}
                alt="Imagem Mabu"
                className="w-[315px] h-[280px] object-fill rounded-xs"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[794px] flex flex-col items-center justify-around">
        <div className="w-[80%] flex flex-col items-center ">
          <h2 className="font-bold mb-5 mt-6">Mabu Thermas Grand Resort</h2>
          <p className="font-bold">
            Eleito um dos 25 melhores resorts do Brasil e da América do Sul pelo
            Trip Advisor, o Mabu Thermas Grand Resort está localizado sobre a
            maior fonte de águas termais do planeta, o Aquífero Guarani. As
            águas se renovam a cada 4 horas e afloram nas piscinas e praia do
            complexo, com aproximadamente 36° C, a mesma temperatura do corpo
            humano. O resort em Foz do Iguaçu-PR está localizado a 12 km das
            Cataratas do Iguaçu, uma das Sete Novas Maravilhas Naturais do
            Mundo, e do Aeroporto Internacional de Foz do Iguaçu.
          </p>
          <p className="font-bold mt-4">
            O Mabu Thermas oferece cortesia de hospedagem para duas crianças de
            até 12 anos, no mesmo apartamento dos pais. O estacionamento também
            não é cobrado. O Mabu Thermas é o primeiro resort do Brasil a
            conquistar certificação em sustentabilidade, conforme a norma NBR
            15401 da Associação Brasileira de Normas Técnicas (ABNT). São 192
            mil m² de área total, sendo 27 mil m² de área construída, com
            piscinas e praia de águas termais, SPA, alta gastronomia, amplo
            espaço para eventos e um complexo de lazer incrível, ideal para quem
            busca conforto, lazer e muita diversão em família. Você é nosso
            convidado especial para viver experiências memoráveis.
          </p>
          <p className="font-bold mt-4">
            O Mabu Thermas é o destino perfeito para quem procura lazer,
            bem-estar, entretenimento, acomodações amplas e confortáveis,
            variedade gastronômica e ainda, proximidade com os principais
            atrativos turísticos da cidade.
          </p>
          <p className="font-bold mt-4">
            Cinco restaurantes e bares, praia e piscinas termais, quadras
            esportivas, sala de jogos, SPA, tirolesa, Wake board, lago para
            pesca esportiva e muitos outros espaços para uma estada incrível. O
            resort está localizado em uma das
          </p>
          <p className="font-bold mt-4">
            principais vias turísticas de Foz do Iguaçu e possui águas termais
            que mantém seu complexo de piscinas e praia com temperaturas
            constantes acima de 30ºgraus para aproveitar em qualquer época do
            ano. Além de toda do Brasil.
          </p>
        </div>
      </div>
      <div className="w-[794px] flex flex-col mt-6">
        <div className="flex flex-col gap-6 mb-6">
          <Image
            src="/images/mabu/pdf-cotacao/mabu-bussines.png"
            width={1463}
            height={327}
            alt="Imagem Mabu"
            className="w-full object-fill"
          />
          <Image
            src="/images/mabu/pdf-cotacao/reveilon-mabu.png"
            width={1463}
            height={327}
            alt="Imagem Mabu"
            className="w-full object-fill"
          />
          <Image
            src="/images/mabu/pdf-cotacao/natal-mabu.png"
            width={1463}
            height={327}
            alt="Imagem Mabu"
            className="w-full object-fill"
          />
        </div>
      </div>
    </div>
  );
}
