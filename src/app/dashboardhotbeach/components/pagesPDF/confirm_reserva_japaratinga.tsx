/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Page,
  View,
  Document,
  Text,
  Image,
  StyleSheet
} from "@react-pdf/renderer";
import { ReservasProps } from "@/types/reservasProps";
import { rooms } from "@/constants/rooms";

// ──────────── Imagens ────────────
const IMAGES = {
  header: "https://res.cloudinary.com/dumcjx5d8/image/upload/C%C3%B3pia_De_C%C3%B3pia_De_01245E_-_1_1_qarflf.png",
  resort: "https://res.cloudinary.com/dumcjx5d8/image/upload/img39_gdyyyr.jpg",
  map: "https://res.cloudinary.com/dumcjx5d8/image/upload/img42_f1w63o.jpg",
  smart: "https://res.cloudinary.com/dumcjx5d8/image/upload/suite_foto_1_o41idp.jpg",
  standard: "https://res.cloudinary.com/dumcjx5d8/image/upload/suite_foto_1_o41idp.jpg",
  gardenSuite: "https://res.cloudinary.com/dumcjx5d8/image/upload/suite_foto_1_o41idp.jpg",
  gardenExclusive: "https://res.cloudinary.com/dumcjx5d8/image/upload/suite_foto_1_o41idp.jpg",
  star: "/images/japaratinga/pdf-cotacao/star.png",
} as const;

// ──────────── Cores ────────────
const C = {
  white: "#ffffff",
  dark: "#0f172a",
  gray: "#64748b",
  grayDark: "#334155",
  border: "#e2e8f0",
  lightBg: "#f0f9ff",
  accent: "#1F6890",
  starColor: "#fbb400",
  red: "#ef4444"
};

// ──────────── Estilos ────────────
const s = StyleSheet.create({
  page: { backgroundColor: C.white, padding: 0 },

  /* HEADER - Página 1 */
  headerImg: { width: "100%", objectFit: "cover", maxHeight: 180 },
  logoRow: { paddingHorizontal: 28, paddingTop: 12 },
  starsRow: { flexDirection: "row", marginTop: 10, gap: 6, alignItems: "center" },
  starImg: { width: 24, height: 24, objectFit: "contain" },
  resortName: { fontFamily: "Helvetica-Bold", fontSize: 24, color: C.dark, marginTop: 8 },
  resortAddr: { fontSize: 14, color: C.gray, marginTop: 4 },

  /* CHECK-IN / CHECK-OUT */
  checkinRow: {
    flexDirection: "row",
    marginHorizontal: 28,
    marginTop: 16,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    overflow: "hidden"
  },
  checkinLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 14
  },
  checkinBlock: { alignItems: "flex-start" },
  checkinLabel: { fontSize: 12, color: C.gray },
  checkinDate: { fontFamily: "Helvetica-Bold", fontSize: 20, color: C.dark, marginTop: 4 },
  checkinArrowBox: {
    width: 28,
    height: 3,
    backgroundColor: C.red,
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 1
  },
  checkinDivider: { width: 1, backgroundColor: C.border },
  checkinRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    padding: 14,
    backgroundColor: C.lightBg
  },
  checkinStat: { alignItems: "center" },
  checkinStatLabel: { fontSize: 12, color: C.gray },
  checkinStatValue: { fontFamily: "Helvetica-Bold", fontSize: 20, color: C.accent, marginTop: 4 },

  /* IMAGENS resort + mapa */
  imagesRow: {
    flexDirection: "row",
    marginHorizontal: 28,
    marginTop: 16,
    gap: 12
  },
  imageHalf: { width: "48%", borderRadius: 12, objectFit: "cover", height: 160 },

  /* SEÇÃO DADOS */
  sectionTitleText: { fontFamily: "Helvetica-Bold", fontSize: 16, color: C.dark, textTransform: "uppercase" },
  sectionTitlePrefix: { fontFamily: "Helvetica-Bold", fontSize: 16, color: C.accent, marginRight: 6 },

  dadosColumns: {
    flexDirection: "row",
    marginHorizontal: 28,
    marginTop: 12
  },
  dadosColLeft: { width: "46%", paddingRight: 16 },
  dadosColRight: { width: "54%", alignItems: "stretch" },

  dataLabel: { fontSize: 13, color: C.gray, marginTop: 8 },
  dataValue: { fontSize: 14, color: C.dark, marginTop: 2 },
  dataValueBold: { fontFamily: "Helvetica-Bold", fontSize: 14, color: C.dark, marginTop: 2 },
  dataValueAccent: { fontFamily: "Helvetica-Bold", fontSize: 14, color: C.accent, marginTop: 2 },

  /* Suite */
  suiteColRight: {
    width: "54%",
    paddingLeft: 16
  },
  suiteTitle: { fontFamily: "Helvetica-Bold", fontSize: 16, color: C.dark, marginTop: 6, marginBottom: 6 },
  suiteContentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2
  },
  suiteImg: { width: 100, height: 75, borderRadius: 8, objectFit: "cover", marginRight: 12 },
  suiteAmenitiesCol: { flex: 1 },
  amenityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.lightBg,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 5
  },
  amenityDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.accent, marginRight: 6 },
  amenityText: { fontSize: 11, color: C.dark },

  suiteAmenitiesBlock: { flexDirection: "row", alignItems: "center", marginTop: 2 },

  /* POLÍTICAS */
  policyPage: { backgroundColor: C.white, padding: 24 },
  policyTitle: { fontFamily: "Helvetica-Bold", fontSize: 18.5, color: C.dark, marginBottom: 6 },
  policyText: { fontSize: 14.5, color: C.grayDark, lineHeight: 1.5, textAlign: "justify", marginBottom: 14 }
});

// ──────────── Helpers ────────────
const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function parseDate(v: string | undefined): Date | null {
  if (!v) return null;
  const t = v.trim().slice(0, 10);
  if (t.includes("/")) {
    const [d, m, y] = t.split("/").map(Number);
    if (!y || !m || !d || m < 1 || m > 12) return null;
    const dt = new Date(y, m - 1, d);
    return isNaN(dt.getTime()) ? null : dt;
  }
  const dt = new Date(t);
  return isNaN(dt.getTime()) ? null : dt;
}

function formatDateShort(v: string | undefined): string {
  const d = parseDate(v);
  if (!d) return "-";
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]}`;
}

function getNoites(a: string | undefined, b: string | undefined): number {
  const da = parseDate(a);
  const db = parseDate(b);
  if (!da || !db) return 0;
  const n = Math.round((db.getTime() - da.getTime()) / 86400000);
  return n > 0 ? n : 0;
}

function getSuiteDisplayName(suite: string | undefined | null): string {
  if (!suite) return "-";
  const key = suite.toUpperCase().trim();
  const room = rooms.get(suite) || rooms.get(key);
  if (room) return room.name;
  const map: Record<string, string> = { SMART: "Smart", STANDARD: "Standard", "GARDEN SUITE": "Garden Suite", "GARDEN EXCLUSIVE": "Garden Exclusive" };
  return map[key] ?? suite;
}

function getSuiteImage(suite: string | undefined | null): string {
  const key = (suite ?? "").toUpperCase().trim();
  switch (key) {
    case "STANDARD": return IMAGES.standard;
    case "GARDEN SUITE": return IMAGES.gardenSuite;
    case "GARDEN EXCLUSIVE": return IMAGES.gardenExclusive;
    default: return IMAGES.smart;
  }
}

interface SuiteInfo {
  maxPessoas: number;
  cama: string;
}

function getSuiteInfo(suite: string | undefined | null): SuiteInfo {
  const key = (suite ?? "").toUpperCase().trim();
  switch (key) {
    case "STANDARD":
      return { maxPessoas: 3, cama: "1 King + 1 Solteiro" };
    case "GARDEN SUITE":
      return { maxPessoas: 4, cama: "1 King + 2 Sofa-cama" };
    case "GARDEN EXCLUSIVE":
      return { maxPessoas: 2, cama: "1 King Size" };
    default: // SMART
      return { maxPessoas: 2, cama: "1 King" };
  }
}

function formatValor(preco: string | undefined): string {
  if (!preco) return "R$ 0,00";
  const n = Number(preco);
  if (Number.isNaN(n)) return preco;
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ──────────── Componente ────────────
export function ConfirmReservaPDFJaparatinga({ reserva }: { reserva: ReservasProps | null }) {
  const checkInRaw = reserva?.cotacao?.checkIn;
  const checkOutRaw = reserva?.cotacao?.checkOut;
  const checkInShort = formatDateShort(checkInRaw);
  const checkOutShort = formatDateShort(checkOutRaw);
  const noites = getNoites(checkInRaw, checkOutRaw);
  const quartos = reserva?.cotacao?.quantidadeDeQuartos ?? 0;
  const adultos = reserva?.cotacao?.adultos ?? 0;
  const criancas = reserva?.cotacao?.criancas ?? 0;
  const hospedes = adultos + criancas;
  const nome = reserva?.cotacao?.nomeUsuario ?? "-";
  const email = reserva?.cotacao?.emailUsuario ?? "-";
  const telefone = reserva?.telefone ?? "-";
  const documento = reserva?.rgCPF ?? "-";
  const suite = getSuiteDisplayName(reserva?.cotacao?.suite);
  const suiteImg = getSuiteImage(reserva?.cotacao?.suite);
  const suiteInfo = getSuiteInfo(reserva?.cotacao?.suite);
  const valor = formatValor(reserva?.cotacao?.precoPensaoCompleta ?? reserva?.cotacao?.precoCafeDaManha);

  return (
    <Document>
      {/* ════════ PAGINA 1 ════════ */}
      <Page size="A4" style={s.page}>
        {/* Header image */}
        <Image src={IMAGES.header} style={s.headerImg} />

        {/* Estrelas + Nome */}
        <View style={s.logoRow}>
          <View style={s.starsRow}>
            <Image src={IMAGES.star} style={s.starImg} />
            <Image src={IMAGES.star} style={s.starImg} />
            <Image src={IMAGES.star} style={s.starImg} />
            <Image src={IMAGES.star} style={s.starImg} />
            <Image src={IMAGES.star} style={s.starImg} />
          </View>
          <Text style={s.resortName}>JAPARATINGA LOUNGE RESORT</Text>
          <Text style={s.resortAddr}>Rodovia AL-101 Norte, km 120,300</Text>
        </View>

        {/* Check-in / Check-out */}
        <View style={s.checkinRow}>
          <View style={s.checkinLeft}>
            <View style={s.checkinBlock}>
              <Text style={s.checkinLabel}>Check-in</Text>
              <Text style={s.checkinDate}>{checkInShort}</Text>
            </View>
            {/* Seta vermelha (barra horizontal) */}
            <View style={s.checkinArrowBox} />
            <View style={s.checkinBlock}>
              <Text style={s.checkinLabel}>Check-out</Text>
              <Text style={s.checkinDate}>{checkOutShort}</Text>
            </View>
          </View>
          <View style={s.checkinDivider} />
          <View style={s.checkinRight}>
            <View style={s.checkinStat}>
              <Text style={s.checkinStatLabel}>Noites</Text>
              <Text style={s.checkinStatValue}>{noites}</Text>
            </View>
            <View style={s.checkinStat}>
              <Text style={s.checkinStatLabel}>Quartos</Text>
              <Text style={s.checkinStatValue}>{quartos}</Text>
            </View>
            <View style={s.checkinStat}>
              <Text style={s.checkinStatLabel}>Hospedes</Text>
              <Text style={s.checkinStatValue}>{hospedes}</Text>
            </View>
          </View>
        </View>

        {/* Imagens resort + mapa */}
        <View style={s.imagesRow}>
          <Image src={IMAGES.resort} style={s.imageHalf} />
          <Image src={IMAGES.map} style={s.imageHalf} />
        </View>

        {/* ── DADOS RESERVA | JAPARATINGA RESORT ── */}
        <View style={{ flexDirection: "row", marginTop: 18, marginHorizontal: 28 }}>
          <View style={{ width: "46%", flexDirection: "row", alignItems: "center", paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: C.border }}>
            <Text style={s.sectionTitlePrefix}>||</Text>
            <Text style={s.sectionTitleText}>DADOS RESERVA</Text>
          </View>
          <View style={{ width: "54%", flexDirection: "row", alignItems: "center", paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: C.border, paddingLeft: 16 }}>
            <Text style={s.sectionTitlePrefix}>||</Text>
            <Text style={s.sectionTitleText}>JAPARATINGA RESORT</Text>
          </View>
        </View>

        <View style={s.dadosColumns}>
          {/* Coluna esquerda: dados do hospede */}
          <View style={s.dadosColLeft}>
            <Text style={s.dataLabel}>Nome</Text>
            <Text style={s.dataValueBold}>{nome}</Text>
            <Text style={[s.dataValue, { color: C.accent }]}>{email}</Text>
            <Text style={s.dataValue}>{telefone}</Text>
            <Text style={s.dataValue}>Brasil</Text>
            <Text style={s.dataValue}>{documento}</Text>
            <Text style={[s.dataLabel, { marginTop: 10 }]}>Valor</Text>
            <Text style={s.dataValueAccent}>{valor} (sem taxa)</Text>
            <Text style={s.dataLabel}>Pensao</Text>
            <Text style={s.dataValueBold}>ALL INCLUSIVE</Text>
          </View>

          {/* Coluna direita: Suite */}
          <View style={s.suiteColRight}>
            <Text style={s.suiteTitle}>Suite {suite}</Text>
            <View style={s.suiteContentRow}>
              <Image src={suiteImg} style={s.suiteImg} />
              <View style={s.suiteAmenitiesCol}>
                <View style={s.amenityBox}>
                  <View style={s.amenityDot} />
                  <Text style={[s.amenityText, { flexShrink: 0 }]}>Max.: {suiteInfo.maxPessoas} Pessoas</Text>
                </View>
                <View style={s.amenityBox}>
                  <View style={s.amenityDot} />
                  <Text style={[s.amenityText, { flexShrink: 0 }]}>{suiteInfo.cama}</Text>
                </View>
                <View style={s.amenityBox}>
                  <View style={s.amenityDot} />
                  <Text style={[s.amenityText, { flexShrink: 0 }]}>Wi-fi</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* ════════ PAGINA 2 - POLITICAS ════════ */}
      <Page size="A4" style={s.policyPage}>
        <Text style={s.policyTitle}>Politicas de Cancelamento</Text>
        <Text style={s.policyText}>
          Verificar tarifa aplicada no momento da compra, pois trabalhamos tambem com tarifas nao reembolsaveis. - Para tarifas reembolsaveis: Passivel de reembolso, desde que o pedido de cancelamento seja efetuado com antecedencia igual ou superior a 2 dias da data do check-in. Apos esse prazo, a reserva torna-se nao reembolsavel. Contatos: e-mail setordereserva@japaratingaresort.com ou (17) 99707-1296. Reservas remarcadas ou pagas com carta de credito nao sao reembolsaveis. Em caso de cancelamento dos servicos em razao da pandemia ou enquanto o Resort ou Parque estiverem fechados, serao aplicadas as bases da Lei n. 14.046/2020, com as alteracoes da MP 1101/2022, sendo ofertado apenas a remarcacao das reservas ou disponibilizacao de carta de credito para utilizacao em data futura, considerando o valor pago.
        </Text>

        <Text style={s.policyTitle}>Alteracao de Data e No Show</Text>
        <Text style={s.policyText}>
          Nossas tarifas sao flutuantes, desta forma, em casos de solicitacao de alteracao que resulte em reserva de maior valor, a alteracao somente sera efetivada mediante o pagamento da diferenca tarifaria. - Em caso de alteracao de data solicitada com 7 dias ou menos da data do check-in, somente podera ser realizada mediante apresentacao de atestado medico valido. - Caso ocorra o no show (nao comparecimento) a cobranca e de 100% do valor da reserva
        </Text>

        <Text style={s.policyTitle}>Saida Antecipada</Text>
        <Text style={s.policyText}>
          a) A desistencia da estada apos realizar o check-in, assim como a saida antecipada, principalmente por motivo de mudanca de tempo (chuva), nao dara direito a qualquer tipo de restituicao, reembolso em dinheiro ou credito em novas diarias, acarretando a perda total da quantia paga pelo pacote da hospedagem ou diaria nao utilizada. b) O reembolso sera concedido somente por motivo de obito na familia (parentesco ate 3 grau).
        </Text>

        <Text style={s.policyTitle}>Documento necessarios para hospedagem</Text>
        <Text style={s.policyText}>
          E obrigatoria, a apresentacao de documento original pessoal de todos os hospedes no ato do check-in, no hotel. - Menores (de 0 a 17 anos) quando desacompanhadas dos pais ou responsaveis legal: e obrigatoria apresentacao de documento original + Autorizacao do Juizado da Infancia e Adolescencia para hospedagem, do local de residencia dos pais ou responsaveis pela(s) crianca(s) com reconhecimento de firma.
        </Text>
      </Page>

      {/* ════════ PAGINA 3 - MAIS POLITICAS ════════ */}
      <Page size="A4" style={s.policyPage}>
        <Text style={s.policyTitle}>Pagamento das Despesas de Hospedagem e de Extras</Text>
        <Text style={s.policyText}>
          Para Hospedagens com pagamento feito atraves de cartao de credito, sera obrigatorio a apresentacao do cartao de credito original juntamente com os documentos pessoais no checkin, caso nao apresente sera necessario realizar novo pagamento, sendo o primeiro pagamento posteriormente estornado. - Nao aceitamos cartoes de terceiros. - Consumos extras: Em respeito ao artigo 6, III e IV do Codigo de Defesa do Consumidor, bem como demais comunicacoes legais, NAO sera aceito pagamento por meio de CHEQUE para quitacao de DESPESAS EXTRAS no Hotel, essas deverao ser pagas via cartao de debito ou credito (a vista) Visa ou Mastercard.
        </Text>

        <Text style={s.policyTitle}>Politica: Apartamento PET</Text>
        <Text style={s.policyText}>
          O Resort possui categoria de apartamento especifica para este fim, podendo ser acomodados ate 02 pets de ate 20kgs cada. Acesse este link para conferir as politicas.
        </Text>

        <Text style={s.policyTitle}>Manutencao do Preco</Text>
        <Text style={s.policyText}>
          a) Apenas apos o pagamento da reserva os valores negociados nao sofrerao quaisquer alteracoes para mais ou para menos em decorrencia de variacao na tabela de precos, promocoes ou qualquer outro fator que acarrete diminuicao ou aumento da tarifa dos produtos negociados. b) Orcamentos e tarifas estao sujeitos a alteracoes de valores e condicoes sem aviso previo, salvo as reservas confirmadas e pagas. Apenas apos o pagamento da reserva os valores negociados nao sofrerao quaisquer alteracoes para mais.
        </Text>

        <Text style={s.policyTitle}>Acesso ao Parque</Text>
        <Text style={s.policyText}>
          O acesso diario e ilimitado ao parque esta incluso para todos os hospedes da reserva, respeitando seus horarios e dias de funcionamento. O parque se mantem fechado as segundas-feiras, consultar calendario no nosso site. - Horario de funcionamento do parque: das 09:00h as 19:00h.
        </Text>
      </Page>
    </Document>
  );
}
