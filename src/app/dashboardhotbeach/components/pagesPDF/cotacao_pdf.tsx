"use client";
import { rooms } from "@/constants/rooms";
import { CotacoesProps } from "@/types/cotacoesProps";
import Image from "next/image";
import { useMemo } from "react";

const JAPARATINGA_IMAGES = {
  header: "/images/japaratinga/pdf-cotacao/header.png",
  resort: "/images/japaratinga/pdf-cotacao/resort.png",
  suite: "/images/japaratinga/pdf-cotacao/suite-standard.png"
} as const;

// Conteúdo dos modelos HTML por tipo de suíte
const SUITE_CONTENT: Record<
  string,
  {
    name: string;
    description: string;
    amenities: string[];
    bathroom: string;
  }
> = {
  standard: {
    name: "Suíte Standard",
    description:
      "Perfeito pra acomodar até 3 pessoas. Sua configuração é de 1 cama King e 1 de solteiro. A vista da varanda pode ser frente-mar ou piscina, a depender da disponibilidade. Sem contar com a cafeteira Nespresso esperando por você!",
    amenities: [
      "✅ Ar-Condicionado       ✅ Telefone       ✅ Cofre       ✅ Terraço",
      "✅ Apartamento para não Fumantes         ✅ Frente mar  ou  Piscina"
    ],
    bathroom: "✅ Kit de Amenities       ✅ Chuveiro         ✅ Serviço de limpeza diário"
  },
  smart: {
    name: "Suíte Smart",
    description:
      "O apartamento perfeito pra acomodar até 2 pessoas. Ele oferece o melhor custo-benefício pra quem quer viajar em dupla. Sua configuração é de 1 cama de king e a varanda tem vista pro mangue!",
    amenities: [
      "✅ Ar-Condicionado       ✅ Telefone       ✅ Cofre       ✅ Terraço",
      "✅ Apartamento para não Fumantes         ✅ Piscina Interior"
    ],
    bathroom: "✅ Kit de Amenities       ✅ Chuveiro          ✅ Serviço de limpeza diário"
  },
  garden: {
    name: "Garden Suíte",
    description:
      "É o apartamento ideal para quem quer viver uma experiência diferenciada, com muito conforto e contato com a natureza. É Dog Friendly* e sua configuração é de 1 cama King e 2 sofás-cama. Assim, é perfeito para acomodar até 4 ocupantes, podendo ser 2 adultos e 2 crianças** (até 12 anos) ou 3 adultos e 1 criança (até 12 anos). Ah, e ainda possui chopeira elétrica, Nespresso, Alexa, iluminação inteligente e 2 ambientes. Demais, não é? Tudo pra deixar suas férias ainda melhores!",
    amenities: [
      "✅ Ar-Condicionado       ✅ Telefone       ✅ Cofre       ✅ Terraço",
      "✅ Apartamento para não Fumantes         ✅ Chopeira"
    ],
    bathroom: "✅ Kit de Amenities       ✅ Chuveiro         ✅ Serviço de limpeza diário"
  },
  "garden exclusive": {
    name: "Garden Exclusive",
    description:
      "Perfeita pra casais, é ideal para quem quer viver uma experiência exclusiva e intimista. Acomoda até 2 pessoas com uma configuração fixa de 1 cama King Size em um ambiente integrado, com banheira, chopeira, iluminação inteligente, Alexa, Nespresso e ainda é Dog Friendly*. Tem como não ser feliz aqui?",
    amenities: [
      "✅ Ar-Condicionado       ✅ Telefone       ✅ Cofre       ✅ Terraço",
      "✅ Apartamento para não Fumantes         ✅ Chopeira"
    ],
    bathroom: "✅ Kit de Amenities       ✅ Banheira         ✅ Serviço de limpeza diário"
  }
};

function getSuiteContent(suite: string) {
  const s = suite.toLowerCase();
  if (s.includes("garden exclusive")) return SUITE_CONTENT["garden exclusive"];
  if (s.includes("garden")) return SUITE_CONTENT.garden;
  if (s.includes("smart")) return SUITE_CONTENT.smart;
  return SUITE_CONTENT.standard;
}

export function CotacaoPDF({
  cotacaoSelected,
  hotel
}: {
  cotacaoSelected: CotacoesProps | null;
  hotel: "HOT_BEACH_RESORT" | "HOT_BEACH_SUITE" | "JAPARATINGA";
}) {
  const room = cotacaoSelected?.suite ? rooms.get(cotacaoSelected.suite) : null;

  const japaratingaLayout = useMemo(() => {
    if (hotel !== "JAPARATINGA" || !cotacaoSelected) return null;
    const c = cotacaoSelected;
    const dataCotacao = new Date().toLocaleDateString("pt-BR");
    const suiteContent = c.suite ? getSuiteContent(c.suite) : SUITE_CONTENT.standard;

    // Dados dinâmicos das tabelas
    const desconto = c.porcentagemDesconto ?? 0;
    const valor12x = c.precoPensaoCompleta ?? c.precoCafeEJantar ?? 0;
    const valorAVista = valor12x * (1 - desconto / 100);
    const qtdHospedes =
      `${c.adultos ?? 0} ADULTOS` +
      (c.criancas ? ` ${c.criancas} CRIANÇA${c.criancas > 1 ? "S" : ""}` : "");
    const fmtDate = (s: string | undefined) => {
      if (!s) return "--/--/----";
      const [y, m, d] = s.slice(0, 10).split("-");
      return d && m && y ? `${d}/${m}/${y}` : s;
    };
    const fmtCurrency = (value: number) =>
      value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
      });

    const tableClass = "w-full border border-[#1F6890] border-collapse text-xs mt-2";
    const thClass = "border border-[#1F6890] bg-blue-200/40 p-2 text-left font-bold";
    const tdClass = "border border-[#1F6890] p-2";

    return (
      <div className="flex flex-col bg-white" id="cotacao-pdf">
        <main className="w-[794px] min-h-[1123px] mx-auto px-6 py-4 text-black">
          {/* Header: imagem banner */}
          <Image
            src="https://res.cloudinary.com/dumcjx5d8/image/upload/C%C3%B3pia_De_C%C3%B3pia_De_01245E_-_1_1_qarflf.png"
            alt="Japaratinga Lounge Resort"
            width={794}
            height={100}
            className="w-full h-auto object-contain"
            unoptimized
          />

          {/* Título e data (modelo HTML linha 4-7) */}
          <div className="flex flex-row justify-between items-center mt-2">
            <h1 className="text-lg font-bold">Cotação: Japaratinga Lounge Resort</h1>
            <h1 className="text-lg font-bold">{dataCotacao}</h1>
          </div>

          {/* Hospede (modelo HTML linha 8) */}
          <h1 className="text-base font-bold mt-2">Hospede: {c.nomeUsuario || "(nome do Hospede)"}</h1>

          {/* Imagem resort 1 (modelo HTML linha 10) */}
          <div className="mt-4 overflow-hidden rounded-lg">
            <Image
              src={JAPARATINGA_IMAGES.resort}
              alt="Resort"
              width={794}
              height={400}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>

          {/* ===== TABELAS DINÂMICAS (do template) ===== */}

          {/* Tabela 1: Acomodação */}
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>SUÍTE</th>
                <th className={thClass}>PROMOÇÃO</th>
                <th className={thClass}>ESTACIONAMENTO</th>
                <th className={thClass}>QTD DE HOSPEDES</th>
                <th className={thClass}>HOTEL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClass}>{c.suite ?? "Standard"}</td>
                <td className={tdClass}>{desconto}% DESCONTO</td>
                <td className={tdClass}>INCLUSO</td>
                <td className={tdClass}>{qtdHospedes}</td>
                <td className={tdClass}>JAPARATINGA LOUNGE RESORT</td>
              </tr>
            </tbody>
          </table>

          {/* Tabela 2: Pacote e preços */}
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>PACOTE</th>
                <th className={thClass}>CARTÃO EM 12X</th>
                <th className={thClass}>VALOR A VISTA</th>
                <th className={thClass}>INCLUSO</th>
                <th className={thClass}>TAXAS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClass}>ALL INCLUSIVE</td>
                <td className={tdClass}>{fmtCurrency(valor12x)}</td>
                <td className={tdClass}>{fmtCurrency(valorAVista)}</td>
                <td className={tdClass}>Café da manhã, Almoço, Jantar, Bebidas</td>
                <td className={tdClass}>NÃO</td>
              </tr>
            </tbody>
          </table>

          {/* Tabela 3: Check-in / Check-out */}
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>ADICIONAL</th>
                <th className={thClass}>CHECK-IN</th>
                <th className={thClass}>CHECK-OUT</th>
                <th className={thClass}>HORÁRIO ENTRADA</th>
                <th className={thClass}>HORÁRIO SAÍDA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClass}>CAFÉ DA MANHÃ NA SUÍTE</td>
                <td className={tdClass}>{fmtDate(c.checkIn)}</td>
                <td className={tdClass}>{fmtDate(c.checkOut)}</td>
                <td className={tdClass}>15:00</td>
                <td className={tdClass}>12:00</td>
              </tr>
            </tbody>
          </table>

          {/* Tabela 4: Lounge Resort */}
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>LOUNGE RESORT</th>
                <th className={thClass}>HORÁRIO ENTRADA</th>
                <th className={thClass}>HORÁRIO SAÍDA</th>
                <th className={thClass}>INGRESSO ADULTO</th>
                <th className={thClass}>INGRESSO CRIANÇA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClass}>INCLUSO</td>
                <td className={tdClass}>08:00</td>
                <td className={tdClass}>19:00</td>
                <td className={tdClass}>INCLUSO</td>
                <td className={tdClass}>INCLUSO</td>
              </tr>
            </tbody>
          </table>

          {/* Tabela 5: Pagamento e reembolso */}
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>FORMA PAGAMENTO</th>
                <th className={thClass}>PARCELAMENTO</th>
                <th className={thClass}>Á VISTA</th>
                <th className={thClass}>REEMBOLSO</th>
                <th className={thClass}>TAXAS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClass}>CARTÃO, PIX, BOLETO, TED</td>
                <td className={tdClass}>EM ATÉ 12X CARTÃO</td>
                <td className={tdClass}>{desconto}% OFF</td>
                <td className={tdClass}>48 HORAS ANTES DO CHECK-IN</td>
                <td className={tdClass}>NÃO</td>
              </tr>
            </tbody>
          </table>

          {/* Tudo Sobre o Resort (modelo HTML linha 12-15) */}
          <h1 className="text-lg font-bold mt-6">Tudo Sobre o Resort</h1>
          <h1 className="text-base mt-2">
            Aqui no Japaratinga Lounge Resort, um autêntico resort de praia, você vai encontrar uma
            estrutura completa de frente pro mar. Com uma área top de mais de 87.000 m², é o resort
            perfeito pra você viver dias maravilhosos e com uma experiência All Inclusive Premium
            inédita. Localizado em um dos destinos paradisíacos mais bonitos e quase inexplorados de
            Alagoas: Japaratinga. Vem sentir essa energia!
          </h1>

          {/* Imagem estrutura/mapa (modelo HTML linha 18) - usando resort.png novamente */}
          <div className="mt-6">
            <Image
              src={JAPARATINGA_IMAGES.resort}
              alt="Estrutura"
              width={794}
              height={400}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>

          {/* Quer saber como é... (modelo HTML linha 19-28) */}
          <h1 className="text-center text-lg font-bold mt-4">
            Quer saber como é o Japaratinga Lounge Resort?
          </h1>
          <h2 className="text-base mt-2">
            O resort conta com uma estrutura de lazer completa pra você aproveitar cada momento.
            Relaxe nas nossas duas quadras poliesportivas, divirta-se no salão de jogos, mantenha a
            forma na academia ou desfrute de um momento de paz na sauna. E pra refrescar, nada melhor
            do que um mergulho em nossas piscinas, incluindo uma piscina aquecida.
          </h2>
          <h2 className="text-base mt-2">
            Quer conhecer mais do que você pode aproveitar no Japaratinga Lounge Resort? Passe o
            mouse sobre os números no mapa abaixo pra explorar cada espaço.
          </h2>

          {/* Nome e descrição da suíte (modelo HTML linha 29-35) */}
          <h1 className="text-center text-lg font-bold mt-6">{suiteContent.name}</h1>
          <h2 className="text-base mt-2">{suiteContent.description}</h2>
          <h2 className="text-center text-base mt-2">*As categorias Smart não são Dog Friendly*</h2>

          {/* Imagem da suíte (modelo HTML linha 39) - usando suite-standard.png para todas */}
          <div className="mt-4">
            <Image
              src={JAPARATINGA_IMAGES.suite}
              alt={suiteContent.name}
              width={794}
              height={400}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>

          {/* Serviços Gerais (modelo HTML linha 41-43) */}
          <h1 className="text-center text-lg font-bold mt-6">Serviços Gerais</h1>
          {suiteContent.amenities.map((line, i) => (
            <h2 key={i} className="text-base">
              {line}
            </h2>
          ))}

          {/* Produtos de Banheiro (modelo HTML linha 44-46) */}
          <h1 className="text-center text-lg font-bold mt-4">Produtos de Banheiro</h1>
          <h2 className="text-base">{suiteContent.bathroom}</h2>
          <h2 className="text-base">✅ Banheiro privado</h2>
        </main>
      </div>
    );
  }, [hotel, cotacaoSelected]);

  if (hotel === "JAPARATINGA") {
    return japaratingaLayout ?? <div id="cotacao-pdf" className="w-[794px] min-h-[1123px] bg-white" />;
  }

  return (
    <div className="flex flex-col" id="cotacao-pdf">
      <main className="w-[794px] h-[1123px] mx-auto p-4 px-8 pl-10">
        <header className="relative flex justify-center items-center">
          <Image
            src="/images/hot-beach/pdf-cotacao/header.png"
            alt="Logo Hot Beach"
            width={792}
            height={64}
            className="w-[792px] h-[64px] object-contain"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Image
                key={index}
                src="/images/hot-beach/pdf-cotacao/star.png"
                alt="Star"
                width={35}
                height={31}
                className="w-[35px] h-[31px] object-contain"
              />
            ))}
          </div>
        </header>
        <div className="w-full flex flex-col mx-auto mt-4">
          <div className="w-full flex items-start justify-between">
            <div>
              <h2 className="font-bold text-sm">
                COTAÇÃO{" "}
                {hotel === "HOT_BEACH_RESORT"
                  ? "HOT BEACH RESORT"
                  : hotel === "HOT_BEACH_SUITE"
                  ? "HOT BEACH SUITE"
                  : "JAPARATINGA"}
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
              src="/images/hot-beach/pdf-cotacao/img-resort.jpg"
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
                  Desconto {cotacaoSelected?.porcentagemDesconto}% á Vista
                </td>
                <td className="border border-[#1F6890] p-2">
                  Incluso sem tarifas
                </td>
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected?.adultos} Adultos{" "}
                  {cotacaoSelected?.criancas &&
                    `+ ${cotacaoSelected?.criancas} Crianças`}
                </td>
                <td className="border border-[#1F6890] p-2">
                  {hotel === "HOT_BEACH_RESORT"
                    ? "Hot Beach Resort"
                    : hotel === "HOT_BEACH_SUITE"
                    ? "Hot Beach Suíte"
                    : "Japaratinga"}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border border-blue-200/40 border-collapse mt-8 text-xs">
            <thead className="bg-blue-200/40 border-t-2 border-[#0D5074] h-10">
              <tr className="border border-[#1F6890] text-center">
                <th className="border border-[#1F6890] p-2">Pensão</th>
                <th className="border border-[#1F6890] p-2">
                  Valor parcelado no <br /> Cartão em 12x
                </th>
                <th className="border border-[#1F6890] p-2">
                  Valor á Vista <br /> {cotacaoSelected?.porcentagemDesconto}%
                  OFF
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
                    (
                      cotacaoSelected?.precoCafeDaManha *
                      (1 - cotacaoSelected?.porcentagemDesconto / 100)
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 2
                    })}
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
                    (
                      cotacaoSelected?.precoCafeEJantar *
                      (1 - cotacaoSelected?.porcentagemDesconto / 100)
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 2
                    })}
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
                    (
                      cotacaoSelected?.precoPensaoCompleta *
                      (1 - cotacaoSelected?.porcentagemDesconto / 100)
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 2
                    })}
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
                  Acesso Beach Park
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
                <td className="border border-[#1F6890] p-2">
                  {cotacaoSelected?.porcentagemDesconto}% OFF
                </td>
                <td className="border border-[#1F6890] p-2"></td>
                <td className="border border-[#1F6890] p-2">
                  Sem taxas inclusas
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <div className="w-[794px] flex flex-col items-center justify-around px-8 pl-10">
        <div className="w-full mx-auto flex flex-col items-center">
          <h2 className="w-full text-center font-bold">
            HOTEL & RESORT HOT BEACH
          </h2>
          <Image
            src="/images/hot-beach/pdf-cotacao/bp.png"
            alt="Imagem do Hotel"
            width={700}
            height={300}
          />
          <section className="mt-4 font-bold flex flex-col gap-3">
            <p>
              Antes de tudo, sabia que que no interior de São Paulo também tem
              dias de sol com ondas e pé na areia?
            </p>
            <p>
              O Hot Beach Park Olímpia, parque aquático localizado no noroeste
              do estado, proporciona tudo isso, em um ambiente seguro.
            </p>
            <p>
              Reservado e relaxante para a família, com praia artificial, rio
              lento, toboáguas, bangalôs e brinquedos para as crianças. Se você
              está pensando aonde ir em suas próximas férias ou dias de folga,
              confira a seguir por que Olímpia merece ser seu próximo destino.
            </p>
            <p>
              Como garantir uma experiência incrível nas piscinas de água quente
              natural do Hot Beach Park. Uma excelente alternativa ou
              complemento ao famoso Thermas dos Laranjais. Seja como for você
              vai se surpreender.
            </p>
            <p>
              Inaugurado em 2017 na Estância Turística de Olímpia (SP). O Hot
              Beach Park é um parque aquático de água quente com diversas
              atrações, como praia artificial, piscina de ondas, rio lento
              (correnteza) e brinquedos, especialmente para famílias.
            </p>
            <p>
              Ele faz parte do complexo turístico Hot Beach, que reúne diversas
              instalações pela cidade.
            </p>
          </section>
        </div>
      </div>
      <div className="w-[794px] flex flex-col items-center justify-around px-8 pl-10">
        <div className="w-full mx-auto flex flex-col items-center">
          <h2 className="font-bold mb-5 mt-6">TERMOS DE RESERVA</h2>
          <section className="mt-4 font-bold flex flex-col gap-3">
            <p>
              Reserva Flexível (Podendo ser alterada para outras datas
              disponíveis no calendário).
            </p>
            <p>
              Em caso de cancelamentos, solicitamos que realize um pedido com
              até 2 dias de antecedência.
            </p>
            <p>
              Não cobramos taxas pelo cancelamento e o valor pode ser estornado
              em um período de até 24h para a conta de origem na qual foi
              realizado o pagamento.
            </p>
            <p>Métodos de pagamento via: CARTÃO DE CRÉDITO, BOLETO OU PIX.</p>
            <p>
              Será necessário a apresentação de um documento com foto do
              responsável pela reserva.
            </p>
          </section>
        </div>
      </div>
      {room && (
        <div className="w-[794px] flex flex-col items-center justify-around mt-10 px-8 pl-10">
          <div className="w-full mx-auto flex flex-col items-center">
            <h2 className="font-bold mb-5 mt-24">{room.name.toUpperCase()}</h2>
            <section className="mt-4 font-bold flex flex-col gap-3">
              {room.descriptions.map((r, key) => (
                <p key={key}>{r}</p>
              ))}
            </section>
            {room.image && (
              <Image
                src={room.image}
                alt="Imagem do Hotel"
                className="object-contain"
                width={794}
                height={300}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
