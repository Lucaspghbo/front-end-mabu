"use client";
import { CotacoesProps } from "@/types/cotacoesProps";
import Image from "next/image";

// Conteúdo e imagem por tipo de suíte Japaratinga
const SUITE_CONTENT: Record<
  string,
  {
    name: string;
    description: string;
    image: string;
    amenities: string[];
    bathroom: string[];
  }
> = {
  STANDARD: {
    name: "Suíte Standard",
    description:
      "Perfeito pra acomodar até 3 pessoas. Sua configuração é de 1 cama King e 1 de solteiro. A vista da varanda pode ser frente-mar ou piscina, a depender da disponibilidade. Sem contar com a cafeteira Nespresso esperando por você!",
    image: "/images/japaratinga/pdf-cotacao/standard.png",
    amenities: [
      "Ar-Condicionado",
      "Telefone",
      "Cofre",
      "Terraço",
      "Apartamento para não Fumantes",
      "Frente mar ou Piscina"
    ],
    bathroom: [
      "Kit de Amenities",
      "Chuveiro",
      "Serviço de limpeza diário",
      "Banheiro privado"
    ]
  },
  SMART: {
    name: "Suíte Smart",
    description:
      "O apartamento perfeito pra acomodar até 2 pessoas. Ele oferece o melhor custo-benefício pra quem quer viajar em dupla. Sua configuração é de 1 cama de king e a varanda tem vista pro mangue!",
    image: "/images/japaratinga/pdf-cotacao/smart.png",
    amenities: [
      "Ar-Condicionado",
      "Telefone",
      "Cofre",
      "Terraço",
      "Apartamento para não Fumantes",
      "Piscina Interior"
    ],
    bathroom: [
      "Kit de Amenities",
      "Chuveiro",
      "Serviço de limpeza diário",
      "Banheiro privado"
    ]
  },
  "GARDEN SUITE": {
    name: "Suíte Garden Suite",
    description:
      "É o apartamento ideal para quem quer viver uma experiência diferenciada, com muito conforto e contato com a natureza. É Dog Friendly* e sua configuração é de 1 cama King e 2 sofás-cama. Assim, é perfeito para acomodar até 4 ocupantes, podendo ser 2 adultos e 2 crianças** (até 12 anos) ou 3 adultos e 1 criança (até 12 anos). Ah, e ainda possui chopeira elétrica, Nespresso, Alexa, iluminação inteligente e 2 ambientes. Demais, não é? Tudo pra deixar suas férias ainda melhores!",
    image: "/images/japaratinga/pdf-cotacao/garden_suite.png", 
    amenities: [
      "Ar-Condicionado",
      "Telefone",
      "Cofre",
      "Terraço",
      "Apartamento para não Fumantes",
      "Chopeira"
    ],
    bathroom: [
      "Kit de Amenities",
      "Chuveiro",
      "Serviço de limpeza diário",
      "Banheiro privado"
    ]
  },
  "GARDEN EXCLUSIVE": {
    name: "Suíte Garden Exclusive",
    description:
      "Perfeita pra casais, é ideal para quem quer viver uma experiência exclusiva e intimista. Acomoda até 2 pessoas com uma configuração fixa de 1 cama King Size em um ambiente integrado, com banheira, chopeira, iluminação inteligente, Alexa, Nespresso e ainda é Dog Friendly*. Tem como não ser feliz aqui?",
    image: "/images/japaratinga/pdf-cotacao/garden_exclusive.png", 
    amenities: [
      "Ar-Condicionado",
      "Telefone",
      "Cofre",
      "Terraço",
      "Apartamento para não Fumantes",
      "Chopeira"
    ],
    bathroom: [
      "Kit de Amenities",
      "Banheira",
      "Serviço de limpeza diário",
      "Banheiro privado"
    ]
  }
};

function getSuiteContent(suite: string | undefined) {
  if (!suite) return SUITE_CONTENT.STANDARD;
  const key = suite.toUpperCase();
  if (key in SUITE_CONTENT) return SUITE_CONTENT[key as keyof typeof SUITE_CONTENT];
  if (key.includes("GARDEN EXCLUSIVE")) return SUITE_CONTENT["GARDEN EXCLUSIVE"];
  if (key.includes("GARDEN")) return SUITE_CONTENT["GARDEN SUITE"];
  if (key.includes("SMART")) return SUITE_CONTENT.SMART;
  return SUITE_CONTENT.STANDARD;
}

export function CotacaoPDFJaparatinga({
  cotacaoSelected,
  hotel
}: {
  cotacaoSelected: CotacoesProps | null;
  hotel: "HOT_BEACH_RESORT" | "HOT_BEACH_SUITE" | "JAPARATINGA";
}) {
  const suiteContent = getSuiteContent(cotacaoSelected?.suite);

  const thBase =
    "border border-[#1F6890] px-2 py-2 text-center align-middle";
  const tdBase =
    "border border-[#1F6890] px-2 py-2 text-center align-middle";
  const rowHeaderMain = "bg-[#0D5074] text-white font-bold uppercase";
  const rowHeaderSection = "bg-white text-[#0D5074] font-bold uppercase";
  const rowData = "bg-[#CFEAF7] text-black";

  // Função para converter data BR (DD/MM/YYYY) para formato legível
  const formatDateBR = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    // Se já está no formato DD/MM/YYYY, retorna direto
    if (dateStr.includes("/")) {
      return dateStr.split(" ")[0]; // Remove a parte do horário se existir
    }
    // Se está em outro formato, tenta converter
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };

  const checkInBR = formatDateBR(cotacaoSelected?.checkIn);
  const checkOutBR = formatDateBR(cotacaoSelected?.checkOut);

  return (
    <div className="flex flex-col pt-6" id="cotacao-pdf">
      <main className="w-[794px] h-[1123px] mx-auto p-4 px-8 pl-10">
        <header className="flex justify-center items-center">
          <Image
            src="/images/japaratinga/pdf-cotacao/header.png"
            alt="Logo Japaratinga"
            width={792}
            height={64}
            className="w-[792px] h-[86px] object-contain"
          />
        </header>
        <div className="w-full flex flex-col mx-auto mt-4">
          <div className="w-full flex items-start justify-between">
            <div>
              <h2 className="font-bold text-xl">
                COTAÇÃO{" "}
                {hotel === "HOT_BEACH_RESORT"
                  ? "HOT BEACH RESORT"
                  : hotel === "HOT_BEACH_SUITE"
                  ? "HOT BEACH SUITE"
                  : "JAPARATINGA"}
              </h2>
              <span className="font-bold text-lg">
                Nome: {cotacaoSelected?.nomeUsuario}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">
                Data {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="mt-8">
            <Image
              src="/images/japaratinga/pdf-cotacao/imagem_cotacao_japaratinga.png"
              alt="Imagem do Hotel"
              width={794}
              height={300}
            />
          </div>
        </div>
        <div className="w-full flex flex-col mx-auto">
          <table className="w-full border-collapse table-fixed text-[13px]">
            <tbody>
              {/* HEADER PRINCIPAL */}
              <tr className={rowHeaderMain}>
                <th className={thBase}>SUÍTE</th>
                <th className={thBase}>PROMOÇÃO</th>
                <th className={thBase}>ESTACIONAMENTO</th>
                <th className={thBase}>QTD DE HOSPEDES</th>
                <th className={thBase}>HOTEL</th>
              </tr>

              {/* DADOS PRINCIPAIS */}
              <tr className={rowData}>
                <td className={`${tdBase} font-bold`}>{cotacaoSelected?.suite ?? "Standard"}</td>
                <td className={tdBase}>
                  {cotacaoSelected?.porcentagemDesconto ?? 0}% DESCONTO
                </td>
                <td className={tdBase}>INCLUSO</td>
                <td className={tdBase}>
                  <div className="leading-4">
                    <div>{cotacaoSelected?.adultos ?? 0} ADULTOS</div>
                    <div>{cotacaoSelected?.criancas ?? 0} CRIANÇA</div>
                  </div>
                </td>
                <td className={tdBase}>
                  <div className="leading-4 uppercase">
                    JAPARATINGA <br />
                    LOUNGE RESORT
                  </div>
                </td>
              </tr>

              {/* SEÇÃO: PACOTE */}
              <tr className={rowHeaderSection}>
                <th className={thBase}>PACOTE</th>
                <th className={thBase}>CARTÃO EM 12X</th>
                <th className={thBase}>VALOR A VISTA</th>
                <th className={thBase}>INCLUSO</th>
                <th className={thBase}>TAXAS</th>
              </tr>

              <tr className={rowData}>
                <td className={`${tdBase} uppercase`}>ALL INCLUSIVE</td>
                <td className={tdBase}>
                  {(cotacaoSelected?.precoPensaoCompleta ?? 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className={tdBase}>
                  {(
                    (cotacaoSelected?.precoPensaoCompleta ?? 0) *
                    (1 - (cotacaoSelected?.porcentagemDesconto ?? 0) / 100)
                  ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className={tdBase}>
                  <div className="leading-4">
                    Café da manhã, <br />
                    Almoço, Jantar, <br />
                    Bebidas
                  </div>
                </td>
                <td className={`${tdBase} uppercase`}>NÃO</td>
              </tr>

              {/* SEÇÃO: ADICIONAL */}
              <tr className={rowHeaderSection}>
                <th className={thBase}>ADICIONAL</th>
                <th className={thBase}>CHECK-IN</th>
                <th className={thBase}>CHECK-OUT</th>
                <th className={thBase}>HORÁRIO ENTRADA</th>
                <th className={thBase}>HORÁRIO SAIDA</th>
              </tr>

              <tr className={rowData}>
                <td className={tdBase}>
                  <div className="leading-4 uppercase">
                    CAFÉ DA MANHÃ <br />
                    NA SUÍTE
                  </div>
                </td>
                <td className={tdBase}>{checkInBR}</td>
                <td className={tdBase}>{checkOutBR}</td>
                <td className={tdBase}>15:00</td>
                <td className={tdBase}>12:00</td>
              </tr>

              {/* SEÇÃO: LOUNGE RESORT */}
              <tr className={rowHeaderSection}>
                <th className={thBase}>LOUNGE RESORT</th>
                <th className={thBase}>HORÁRIO ENTRADA</th>
                <th className={thBase}>HORÁRIO SAIDA</th>
                <th className={thBase}>INGRESSO ADULTO</th>
                <th className={thBase}>INGRESSO CRIANÇA</th>
              </tr>

              <tr className={rowData}>
                <td className={`${tdBase} uppercase`}>INCLUSO</td>
                <td className={tdBase}>08:00</td>
                <td className={tdBase}>19:00</td>
                <td className={`${tdBase} uppercase`}>INCLUSO</td>
                <td className={`${tdBase} uppercase`}>INCLUSO</td>
              </tr>

              {/* SEÇÃO: FORMA PAGAMENTO */}
              <tr className={rowHeaderSection}>
                <th className={thBase}>FORMA PAGAMENTO</th>
                <th className={thBase}>PARCELAMENTO</th>
                <th className={thBase}>Á VISTA</th>
                <th className={thBase}>REEMBOLSO</th>
                <th className={thBase}>TAXAS</th>
              </tr>

              <tr className={rowData}>
                <td className={tdBase}>
                  <div className="leading-4 uppercase">
                    CARTÃO, PIX, <br />
                    BOLETO, TED
                  </div>
                </td>
                <td className={tdBase}>
                  <div className="leading-4 uppercase">
                    EM ATÉ 12X <br />
                    CARTÃO
                  </div>
                </td>
                <td className={tdBase}>
                  {(cotacaoSelected?.porcentagemDesconto ?? 0)}% OFF
                </td>
                <td className={tdBase}>
                  <div className="leading-4 uppercase">
                    48 HORAS ANTES <br />
                    DO CHECK-IN
                  </div>
                </td>
                <td className={`${tdBase} uppercase`}>NÃO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <div className="w-[794px] flex flex-col items-center justify-around px-8 pl-10">
        <div className="w-full mx-auto flex flex-col items-center">
          <h1 className="w-full text-center font-bold mt-10 text-2xl">
          Tudo Sobre o Resort
          </h1>
          <section className="mt-6 mb-6 flex flex-col gap-3 text-justify text-xl">
            <h3 className="font-bold">
            Aqui no Japaratinga Lounge Resort, um autêntico resort de praia, você vai encontrar uma estrutura completa de frente pro mar. Com uma área top de mais de 87.000 m², é o resort perfeito pra você viver dias maravilhosos e com uma experiência All Inclusive Premium inédita. Localizado em um dos destinos paradisíacos mais bonitos e quase inexplorados de Alagoas: Japaratinga. Vem sentir essa energia!
            </h3>
          </section>
          <Image
            src="/images/japaratinga/pdf-cotacao/second_image.png"
            alt="Imagem do Hotel"
            width={700}
            height={300}
          />
          <h1 className="mt-4 w-full text-center font-bold text-xl">
          Quer saber como é o Japaratinga Lounge Resort?
          </h1>
          <h3 className="mt-6 font-bold text-justify text-xl">
          O resort conta com uma estrutura de lazer completa pra você aproveitar cada momento. Relaxe nas nossas duas quadras poliesportivas, divirta-se no salão de jogos, mantenha a forma na academia ou desfrute de um momento de paz na sauna. E pra refrescar, nada melhor do que um mergulho em nossas piscinas, incluindo uma piscina aquecida.
          </h3>
          <h3 className="mt-6 font-bold text-justify text-xl">
          Quer conhecer mais do que você pode aproveitar no Japaratinga Lounge Resort?
          </h3>
        </div>
      </div>
      <div className="page-break w-[794px] flex flex-col items-center justify-around px-8 pl-10">
        <div className="w-full mx-auto flex flex-col items-center">
          <h2 className="font-bold mb-3 mt-6 text-2xl">{suiteContent.name}</h2>
          <section className="mt-4 font-bold flex flex-col gap-3">
            <h3 className="text-justify text-xl">
              {suiteContent.description}
            </h3>
            <h3 className="text-center text-xl ">
              *As categorias Smart não são Dog Friendly*
            </h3>
            <Image
              src={suiteContent.image}
              alt={suiteContent.name}
              width={700}
              height={300}
            />
            <h1 className="w-full text-center font-bold mt-6 text-xl">Serviços Gerais</h1>
            <ul className="mt-6 grid grid-cols-4 gap-y-8 gap-x-10 font-bold text-[18px]">
              {suiteContent.amenities.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-3 ${i >= 4 ? "col-span-2" : ""}`}
                >
                  <span className="text-[22px] leading-none">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <h1 className="w-full text-center font-bold mt-12 text-xl">Produtos de Banheiro</h1>
            <ul className="mt-6 grid grid-cols-4 gap-y-8 gap-x-10 font-bold text-[18px]">
              {suiteContent.bathroom.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-3 ${i >= 2 ? "col-span-2" : "col-span-1"}`}
                >
                  <span className="text-[22px] leading-none">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
