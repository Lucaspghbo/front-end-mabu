import React from 'react';
import { Page, View, Document, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { ReservasProps } from '@/types/reservasProps';
import { rooms } from '@/constants/rooms';

// Define your styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20, // Adjust padding as needed for 210mm width
  },
  header: {
    marginBottom: 20,
    alignItems: 'center', // Center the image if needed
  },
  headerImage: {
    // width: 1280, // Scale down for PDF, adjust as necessary
    // height: 86 / 2, // Maintain aspect ratio
    objectFit: 'contain',
  },
  section: {
    marginBottom: 10,
  },
  h2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    border: '1px solid #000',
    fontSize: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    backgroundColor: '#195c79',
    color: 'white',
    padding: 5,
    textAlign: 'center',
    flex: 1, // Distribute columns evenly
  },
  tableCol: {
    padding: 5,
    textAlign: 'center',
    flex: 1,
  },
  tableRowOdd: {
    backgroundColor: '#f3f3f3',
  },
  imageSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  hotelImage: {
    width: 240, // Scale down
    // height: 192 / 2, // Scale down
    objectFit: 'contain',
  },
  mapImage: {
    width: 240, // Scale down
    // height: 192 / 2, // Scale down
    objectFit: 'contain',
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 10,
  },
  detailsColumn: {
    width: '48%', // Adjust width as needed
  },
  boldText: {
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 8,
    color: '#333',
    marginBottom: 5,
  },
  policyHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  policyText: {
    fontSize: 8,
    textAlign: 'justify',
    color: '#555',
    marginBottom: 5,
  },
});

export function ConfirmReservaPDF({ reserva }: { reserva: ReservasProps | null }) {
  const room = reserva?.cotacao?.suite ? rooms.get(reserva.cotacao.suite) : null;
  const info = getInfo(reserva);

  function getInfo(reserva: ReservasProps | null): { preco: string | null; text: string } | null {
    if (!reserva || !reserva.cotacao) return null;
    switch (reserva.opcao) {
      case 'precoCafeDaManha':
        return { preco: reserva.cotacao.precoCafeDaManha, text: 'Café da Manhã no restaurante do hotel' };
      case 'precoCafeEJantar':
        return { preco: reserva.cotacao.precoCafeEJantar, text: 'Café da Manhã e Jantar no restaurante do hotel' };
      default:
        return { preco: reserva.cotacao.precoPensaoCompleta, text: 'Café da Manhã, Almoço e Jantar no restaurante do hotel' };
    }
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src="/images/hot-beach/pdf-confirm/header.png" style={styles.headerImage} />
        </View>

        {/* Confirmação de Reserva */}
        <View style={styles.section}>
          <Text style={styles.h2}>Confirmação de Reserva</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Reserva</Text>
              <Text style={styles.tableColHeader}>Produto</Text>
            </View>
            <View style={[styles.tableRow, styles.tableRowOdd]}>
              <Text style={styles.tableCol}>Nº RE500{reserva?.numeroReserva}</Text>
              <Text style={styles.tableCol}>Hotel & Resort</Text>
            </View>
          </View>
        </View>

        {/* Main Content (Images and Details) */}
        <View style={styles.section}>
          <View style={styles.imageSection}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src="/images/hot-beach/pdf-confirm/hotel.jpg" style={styles.hotelImage} />
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src="/images/hot-beach/pdf-confirm/map.png" style={styles.mapImage} />
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.detailsColumn}>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Reserva confirmada: Nº RE500{reserva?.numeroReserva}</Text>
                {/* {reserva?.cotacao?.suite
                  ? `${reserva.cotacao.suite} ${reserva.cotacao.quantidadeDeQuartos}`
                  : reserva?.cotacao?.quantidadeDeQuartos} */}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Nome: </Text>
                Prezado(a) {reserva?.cotacao?.nomeUsuario}
              </Text>
              <Text style={styles.infoText}>
                É com prazer que confirmamos sua reserva no Hot Beach Resort para o período de {reserva?.cotacao?.checkIn?.slice(0, 10)} a {reserva?.cotacao?.checkOut?.slice(0, 10)}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Adicional: </Text>
                {reserva?.adicional}
              </Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.infoText}>Av. Gov. Adhemar Pereira de Barros, nº 1700 Olímpia - SP</Text>
            </View>
          </View>
        </View>

        {/* Main Content (Images and Details) */}
        <View style={styles.section}>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Detalhes da Reserva:</Text>
          </Text>
          <Text style={styles.infoText}>
            Número de quartos: {reserva?.cotacao.quantidadeDeQuartos}
          </Text>
          <Text style={styles.infoText}>
            Número de adultos: {reserva?.cotacao.adultos}
          </Text>
          <Text style={styles.infoText}>
            Número de criancas: {reserva?.cotacao.criancas}
          </Text>
          <Text style={styles.infoText}>
            Pensão inclusa: {reserva?.opcao === 'precoPensaoCompleta' ? 'Sim' : 'Não'}
          </Text>
          <Text style={styles.infoText}>
            Pacote: {reserva?.cotacao.suite}
          </Text>
          <Text style={styles.infoText}>
            Preco: R$ {info?.preco}
          </Text>
        </View>

        {/* Main Content (Images and Details) */}
        <View style={styles.section}>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Informacoes Importantes:</Text>
          </Text>
          <Text style={styles.infoText}>
            Check-in: {reserva?.cotacao?.checkIn?.slice(0, 10)}
          </Text>
          <Text style={styles.infoText}>
            Check-out: {reserva?.cotacao?.checkOut?.slice(0, 10)}
          </Text>
          <Text style={styles.infoText}>
            Politica de cancelamento: [Reembolso em menos de 24h]
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Servicos Inclusos:</Text>
          </Text>
          <Text style={styles.infoText}>
            1. {info?.text}
          </Text>
          <Text style={styles.infoText}>
            2. Accesso ilimitado ao Park
          </Text>
          <Text style={styles.infoText}>
            3. Piscina e área de lazer
          </Text>
          <Text style={styles.infoText}>
            4. Wi-Fi gratuito
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Dados da reserva</Text>
          </Text>
          <Text style={styles.infoText}>
            Nome: {reserva?.cotacao.nomeUsuario}
          </Text>
          <Text style={styles.infoText}>
            CPF: {reserva?.rgCPF}
          </Text>
          <Text style={styles.infoText}>
            Check-in: {reserva?.cotacao.checkIn}
          </Text>
          <Text style={styles.infoText}>
            Check-out: {reserva?.cotacao.checkOut}
          </Text>
        </View>

        {/* Acompanhantes */}
        {/* <View style={styles.section}>
          <Text style={styles.h2}>Acompanhantes</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Nome Completo</Text>
            </View>
            {reserva?.reservaAcompanhante?.map((acompanhante, index) => (
              <View key={index} style={[styles.tableRow, styles.tableRowOdd]}>
                <Text style={styles.tableCol}>{acompanhante}</Text>
              </View>
            ))}
          </View>
        </View> */}

        {/* Policies and Information */}
        <View style={styles.section}>
          <Text style={styles.policyHeading}>Informações do Quarto</Text>
          <Text style={styles.policyText}>
            {room?.descriptions.join(' ').trim()}
          </Text>

          <Text style={styles.policyHeading}>Políticas de Cancelamento</Text>
          <Text style={styles.policyText}>
            Verificar tarifa aplicada no momento da compra, pois trabalhamos também com tarifas não reembolsáveis. - Para tarifas reembolsáveis: Passível de reembolso, desde que o pedido de cancelamento seja efetuado com antecedência igual ou superior a 8 dias da data do check-in. Após esse prazo, a reserva torna-se não reembolsável. - Para solicitar o reembolso (nos casos aplicáveis), favor contatar seu agente de viagens. O prazo de reembolso são 20 dias úteis após o recebimento do formulário devidamente preenchido. Ou caso prefira, enviaremos uma carta de crédito no valor pago para ser abatido em um novo orçamento. Contatos: e-mail vendas@hotbeach.com ou (17) 3279-1003. - Reservas remarcadas ou pagas com carta de crédito não são reembolsáveis. - Em caso de cancelamento dos serviços em razão da pandemia ou enquanto o Resort ou Parque estiverem fechados, serão aplicadas as bases da Lei n.º 14.046/2020, com as alterações da MP 1101/2022, sendo ofertado apenas a remarcação das reservas ou disponibilização de carta de crédito para utilização em data futura, considerando o valor pago.
          </Text>

          <Text style={styles.policyHeading}>Alteração de Data e No Show</Text>
          <Text style={styles.policyText}>
            Nossas tarifas são flutuantes, desta forma, em casos de solicitação de alteração que resulte em reserva de maior valor, a alteração somente será efetivada mediante o pagamento da diferença tarifária. - Em caso de alteração de data solicitada com 7 dias ou menos da data do check-in, somente poderá ser realizada mediante apresentação de atestado médico válido. - Caso ocorra o no show (não comparecimento) a cobrança é de 100% do valor da reserva
          </Text>

          <Text style={styles.policyHeading}>Saída Antecipada</Text>
          <Text style={styles.policyText}>
            a) A desistência da estada após realizar o check-in, assim como a saída antecipada, principalmente por motivo de mudança de tempo (chuva), não dará direito a qualquer tipo de restituição, reembolso em dinheiro ou crédito em novas diárias, acarretando a perda total da quantia paga pelo pacote da hospedagem ou diária não utilizada. b) O reembolso será concedido somente por motivo de óbito na família (parentesco até 3 grau) ou doença do próprio hóspede devendo ser apresentado os documentos comprobatórios. Este reembolso será feito através de carta de crédito, de acordo com os critérios da hospedagem adquirida.
          </Text>

          <Text style={styles.policyHeading}>Documento necessários para hospedagem</Text>
          <Text style={styles.policyText}>
            É obrigatória, a apresentação de documento original pessoal de todos os hospedes no ato do check-in, no hotel. - Menores (de 0 a 17 anos) quando desacompanhadas dos pais ou responsáveis legal: é obrigatória apresentação de documento original + Autorização do Juizado da Infância e Adolescência para hospedagem, do local de residência dos pais ou responsáveis pela(s) criança(s) com reconhecimento de firma.
          </Text>

          <Text style={styles.policyHeading}>Pagamento das Despesas de Hospedagem e de Extras</Text>
          <Text style={styles.policyText}>
            Para Hospedagens com pagamento feito através de cartão de crédito, será obrigatório a apresentação do cartão de crédito original juntamente com os documentos pessoais no checkin, caso não apresente será necessário realizar novo pagamento, sendo o primeiro pagamento posteriormente estornado. - Não aceitamos cartões de terceiros. - Consumos extras: Em respeito ao artigo 6º, III e IV do Código de Defesa do Consumidor, bem como demais comunicações legais, NÃO será aceito pagamento por meio de CHEQUE para quitação de DESPESAS EXTRAS no Hotel, essas deverão ser pagas via cartão de débito ou crédito (a vista) Visa ou Mastercard.
          </Text>

          <Text style={styles.policyHeading}>Política: Apartamento PET</Text>
          <Text style={styles.policyText}>
            Apenas o Celebration Resort Olímpia possui categoria de apartamento específica para este fim, podendo ser acomodados até 02 pets de até 20kgs cada. Acesse este link para conferir as políticas.
          </Text>

          <Text style={styles.policyHeading}>Manutenção do Preço</Text>
          <Text style={styles.policyText}>
            a) Apenas após o pagamento da reserva os valores negociados não sofrerão quaisquer alterações para mais ou para menos em decorrência de variação na tabela de preços, promoções ou qualquer outro fator que acarrete diminuição ou aumento da tarifa dos produtos negociados. b) Orçamentos e tarifas estão sujeitos a alterações de valores e condições sem aviso prévio, salvo as reservas confirmadas e pagas. Apenas após o pagamento da reserva os valores negociados não sofrerão quaisquer alterações para mais. c) Em casos de solicitação de alteração que resulte em reserva de maior valor, caberá ao hóspede pagar a diferença tarifária para realizar a alteração solicitada.
          </Text>

          <Text style={styles.policyHeading}>Política de cortesia</Text>
          <Text style={styles.policyText}>
            Cada adulto pagante terá direito a uma criança de até 12 anos cortesia. Condição limitada a duas cortesias por apartamento, obedecendo a capacidade máxima do apartamento (4, 5 ou 7 pessoas de acordo com a categoria e resort escolhido). Obs: Idade a considerar no dia do check-in, e cortesia de alimentação seguindo o regime adquirido na reserva.
          </Text>

          <Text style={styles.policyHeading}>Acesso ao Parque Aquático Hot Beach</Text>
          <Text style={styles.policyText}>
            O acesso diário e ilimitado ao parque Hot Beach Olímpia está incluso no para todos os hóspedes da reserva, respeitando seus horários e dias de funcionamento. Estacionamento do parque não incluso. - O parque se mantém fechado às segundas-feiras, consultar calendário no nosso site. - Horário de funcionamento do parque: das 09:00h às 17:00h.
          </Text>
        </View>
      </Page>
    </Document>
  );
}