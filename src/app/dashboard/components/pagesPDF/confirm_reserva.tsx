import { ReservasProps } from "@/types/reservasProps";
import Image from "next/image";

export function ConfirmReserva({ reserva }: { reserva: ReservasProps | null }) {
  return (
    <div className="w-full max-w-[210mm] py-4 px-12" id="confirm-reserva">
      <header className="w-full">
        <Image
          src="/images/mabu/pdf-confirm/logo-header-menor.png"
          width={793}
          height={86}
          alt="Logo Mabu"
          className="w-[793px] h-[86px] object-fill"
        />
      </header>

      <section className="flex flex-col mt-6">
        <h2 className="font-bold">Confirmação de Reserva</h2>
        <div className="flex flex-col border text-sm">
          <div className="flex justify-around h-8 items-center text-center text-white bg-[#195c79]">
            <p>Reserva</p>
            <p>Produto</p>
          </div>
          <div className="flex justify-around h-8 items-center text-center bg-gray-100">
            <p className="text-center">Nº RE500{reserva?.numeroReserva}</p>
            <p className="text-center">Hotel & Resort</p>
          </div>
        </div>
      </section>

      <main className="w-full border-t border-b pb-6 border-zinc-400 mt-6">
        <h2 className="font-bold mt-2">Hotel Mabu Thermas Grand Resort</h2>
        <div className="flex justify-between">
          <Image
            src="/images/mabu/pdf-confirm/room.png"
            width={279}
            height={192}
            alt="Hotel Mabu"
            className="w-[279px] h-[192px] object-cover"
          />
          <Image
            src="/images/mabu/pdf-confirm/location-mabu-menor.png"
            width={390}
            height={192}
            alt="Hotel Mabu"
            className="w-[390px] h-[192px] object-cover"
          />
        </div>

        <section className="flex items-center justify-between text-sm">
          <div className="w-1/2">
            <p className="font-semibold text-sm">
              Suíte:{" "}
              {reserva?.cotacao?.suite
                ? `${reserva.cotacao.suite} ${reserva.cotacao.quantidadeDeQuartos}`
                : reserva?.cotacao?.quantidadeDeQuartos}
            </p>
            <p>
              Nome: <span>{reserva?.cotacao?.nomeUsuario}</span>
            </p>
            <p>
              CPF: <span>{reserva?.rgCPF}</span>
            </p>
            <p>
              Check-in: <span>{reserva?.cotacao?.checkIn?.slice(0, 10)}</span>
            </p>
            <p>
              Check-out: <span>{reserva?.cotacao?.checkOut?.slice(0, 10)}</span>
            </p>
            <p>Adicional: {reserva?.adicional}</p>
          </div>
          <div className="flex justify-center w-1/2">
            <p>Av. das Cataratas, 3175, Foz do Iguaçu - PR, 85853-000</p>
          </div>
        </section>

        <section className="flex flex-col mt-6">
          <h2 className="font-bold">Acompanhantes</h2>
          <div className="flex flex-col border text-sm">
            <div className="flex justify-around h-8 items-center text-white bg-[#195c79]">
              <p>Nome Completo</p>
            </div>
            {reserva?.reservaAcompanhante?.map((acompanhante, index) => (
              <div
                key={index}
                className="flex justify-around h-8 items-center bg-gray-100"
              >
                <p>{acompanhante}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full mt-6">
          <h2 className="font-bold">Politicas</h2>

          <p className="mt-6 text-sm font-semibold">Informações do Quarto</p>
          <p className="text-xs text-zinc-600">
            Os apartamentos Master do Mabu Thermas oferecem 23 m², 2 camas casal
            (195 X 139cm), frigobar, ar condicionado central, TV a cabo e
            banheiro com ducha. Os apartamentos estão localizados na Ala
            Cataratas e acomodam até 04 pessoas, entre adultos e crianças. -
            Internet Wireless ; - Estacionamento cortesia para um automóvel ; -
            Acesso cortesia ao Blue Park ; - 2 crianças 8 anos FREE ; - Equipe
            de recreação até as 22:00 ; - Café da manhã cortesia (servido no
            restaurante);
          </p>
        </div>
        <div className="w-full mt-6">
          <h2 className="font-bold">Politicas</h2>

          <p className=" text-sm font-semibold mt-2">Políticas Gerais</p>
          <p className="text-xs text-zinc-600">
            Check-in: 15h00 Check-out: 12h00 Early check-in e late check-out
            deverá ser solicitado na reserva, será confirmado mediante
            disponibilidade direto na recepção do hotel e estará sujeito a
            cobranças adicionais. NÃO HOSPEDAMOS MENORES CASO AS EXIGÊNCIAS DE
            DOCUMENTAÇÃO NÃO SEJAM CUMPRIDAS: Se acompanhados pelos pais (ou um
            deles), o menor deverá portar obrigatoriamente identidade ou
            certidão de nascimento original ou cópia autenticada, desde que os
            pais também estejam portando documento de identificação com foto; Se
            a criança ou adolescente estiver sozinha ou acompanhada de
            terceiros, é exigida autorização assinada pelos pais ou responsáveis
            com firma devidamente registrada em cartório ou autorização
            judicial. ANIMAIS O hotel não aceita animais de estimação de nenhum
            porte. DESISTÊNCIA APÓS A ENTRADA OU SAÍDA ANTECIPADA - será cobrado
            o valor integral da reserva, sem direito a qualquer reembolso,
            porém, estudada possibilidade de carta de crédito e alteração para
            uma nova data. NO-SHOW O não comparecimento na data do check-in{" "}
            <br />
            caracteriza no-show. Será cobrado o valor integral da reserva, sem
            qualquer reembolso, porém, estudada possibilidade de carta de
            crédito e alteração para uma nova data. Blue Park, em funcionamento,
            consulte o calendário no link:
            https://www.blueparkfoz.com.br/calendario **Informamos que o cartão
            utilizado na compra e confirmação da reserva, deverá ser apresentado
            no checkin, junto a documentação exigida. ** Para pagamento em
            outras moedas, consultar câmbio do dia, no estabelecimento para
            conversão. **TARIFAS CORPORATIVAS E RECEPTIVO REAIS OU DOLARES NÃO
            INCLUI
          </p>
          <p className="w-full text-end text-xs text-zinc-600">
            INGRESSO AO BLUEPARK, mas, possui condição ESPECIAL de desconto na
            compra do ingresso.#
          </p>
        </div>

        <div className="w-full mt-6 border-t pt-4 border-zinc-400">
          <h2 className="font-bold">Informações gerais</h2>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold mt-3">
              Estimado Cliente, este voucher integra a documentação da sua
              viagem, para que a sua experiência seja a melhor possível e para
              evitar qualquer contratempo, por gentileza se atente nas
              informações a seguir: Documentação:
            </p>
            <p className="text-[10px] text-zinc-600">
              .É necessário apresentar um documento de identificação oficial com
              foto dos hospedes para a realização do check-in e embarque. Em
              alguns casos poderá ser solicitado do hospede principal da reserva
              um cartão de credito físico ou até mesmo um deposito em dinheiro
              no ato do check-in para despesas extras, podendo ser realizado o
              estorno caso não haja nenhuma despesa extra;
              <br />. A apresentação dos documentos é de inteira
              responsabilidade dos devidos passageiros;
              <br />. A Vacina de febre amarela é obrigatória para vários países
              em casos de viagens internacionais, e é devidamente recomendado
              pelo Ministério da Saúde que a mesma deverá ser tomada por pelo
              menos 10 dias antes da data de embarque, sendo negado o embarque
              caso não possua o comprovante de vacinação. Por gentileza consulte
              seu agente de viagens para informações adicionais;
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <p className="text-xs font-semibold">
              Documentos aceitos para Brasileiros:
            </p>
            <p className="text-[10px] text-zinc-600">
              . Em território Nacional podem ser aceitos: Registro Geral (RG),
              Carteira Nacional de Habilitação (CNH).
              <br />. Para Viagens Internacionais podem ser aceitos: Passaporte
              dentro do período de validade com no mínimo seis meses de validade
              na data de embarque e Visto Consular se necessário por exigência
              do país. Em casos de países com acordo Mercosul dentre eles:
              Argentina, Chile, Paraguai e Uruguai além do Passaporte valido,
              poderá ser apresentado o Registro Geral (RG) Desde que o mesmo
              esteja dentro do prazo de emissão de até 10 anos.
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <p className="text-xs font-semibold">
              Documentos aceitos para Estrangeiros:
            </p>
            <p className="text-[10px] text-zinc-600">
              . Carteira RNE original e Passaporte Válido Original. (Não será
              aceito nenhum tipo de cópia, apenas o documento original) Embarque{" "}
              <br />
              de Menores:
            </p>
            <p className="mt-3 text-[10px] text-zinc-600">
              . Menores de 18 desacompanhados dos responsáveis legais devem
              possuir autorização registrada em Cartório com firma reconhecida
              para se hospedarem nos hotéis dentro do Brasil, porém deve estar
              acompanhados de um maior de 18 anos pois não podem se hospedar
              sozinhos. E para casos de embarque (Voos) menores de 16 anos só
              podem embarcar desacompanhados dos pais portando autorização
              registrada em Cartório com firma reconhecida, em casos de guarda
              compartilhada, o menor de idade só consegue embarcar com um
              responsável desde que estejam portanto autorização também
              reconhecida em Cartório do outro responsável legal autorizando o
              embarque. Menores de 12 anos embarcando sozinho, só podem viajar
              portando autorização em Cartório com firma reconhecida, porém
              deverá ser pago a companhia aérea uma taxa extra para
              acompanhamento do mesmo.{" "}
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <p className="text-xs font-semibold">Regras aéreas:</p>
            <p className="text-[10px] text-zinc-600">
              . É recomendado para voos nacionais se apresentar no aeroporto com
              no mínimo 02 horas de antecedência; . É recomendado para voos
              internacionais se apresentar no aeroporto com no mínimo 03 horas
              de antecedência;
              <br />. A Franquia de bagagem varia de acordo com a tarifa aérea
              seleciona, por gentileza confirmar com o seu agente de viagens; .
              Em casos de NO-SHOW (Não comparecimento para o embarque) por
              gentileza avisar imediatamente seu agente de viagens.{" "}
              <strong className="font-bold">Regras Hoteleiras</strong>:
              <br />. O horário de check-in pode variar dependendo da região de
              hospedagem ou até mesmo das regras dos hotéis, ficando previsto
              dentre eles os horários de: 14:00/ 15:00/ 16:00 por gentileza
              confirmar com o seu agente de viagens qual o horário de check-in
              predefinido para o hotel selecionado;
              <br /> . O horário de check-out pode variar dependendo da região
              de hospedagem ou até mesmo das regras dos hotéis, ficando previsto
              dentre eles os horários de: 11:00/ 12:00 por gentileza confirmar
              com o seu agente de viagens qual o horário de check-in predefinido
              para o hotel selecionado;
              <br />. Para chegadas após as 18h deverá ser avisado ao hotel para
              o não cancelamento da reserva;
              <br />. Não há garantia da disponibilidade de realizar early
              check-in e late check-out, essas condições precisam ser tratadas
              diretamente com o hotel mediante disponibilidade e cobrança
              dependendo das regras do hotel.
            </p>
            <p className="text-[10px] text-zinc-600">
              . As diárias confirmadas e pré-pagas no Brasil incluem taxas
              governamentais, refeições e até mesmo outros serviços quando
              especificado.
              <br />. Despesas extras como: Resort Fee e taxas não
              governamentais (dentre outras) deverão ser pagas diretamente ao
              hotel quando não descritas no voucher. . A Reserva está confirmada
              no hotel, período, tipo de acomodação e regime de alimentação
              conforme informações deste voucher, o mesmo não será aceito como
              forma de pagamento.
              <br />. Para hospedagens internacionais é expressamente proibido o
              Check-in de menores de 21 anos, o responsável pela reserva deve
              ser maior de 21 anos para que não gere nenhum tipo de multa pelo
              hotel. A grande maioria dos hotéis exige a apresentação do nome
              correto conforme documento de todos os hospedes para cada
              apartamento reservado.
              <br />. Não será aceito check-in de passageiros que não estejam na
              reserva para eventuais trocas de nomes por gentileza consultar
              seus agentes de viagens pois poderá implicar no cancelamento da
              reserva confirmada e solicitado uma nova reserva mediante a
              disponibilidade e nova tarifa.
              <br />. Crianças não pagantes, compartilhando apartamento com
              adultos em plano familiar, não terão direito ao café da manhã e
              outras refeições (Exceto se especificado no voucher), e deverão
              compartilhar a cama com seus responsáveis. A solicitação de cama
              extra quando disponível pelo hotel implicará em cobranças
              adicionais localmente.
              <br />. Somente são garantidas as configurações de cama/ quartos
              sinalizados como 01 BED (UMA CAMA) e 02 BEDS (DUAS CAMAS – QUE
              PODEM SER DUAS CAMAS DE SOLTEIRO OU DE CASAL) e poderá ser
              configurado como sofá cama ou outros conforme a politica de cada
              hotel, consulte seu agente de viagens para qualquer DE SOLTEIRO OU
              DE CASAL) e poderá ser configurado como sofá cama ou outros
              conforme a politica de cada hotel, consulte seu agente de viagens
              para qualquer duvida referente a acomodação.{" "}
              <strong className="font-bold">Alteração e cancelamentos</strong>:
            </p>
            <p className="text-[10px] text-zinc-600">
              . Nos casos de no-show (não comparecimento) será cobrado o valor
              integral do passageiro sem direito a reembolso;
            </p>
            <p className="text-[10px] text-zinc-600 mt-3">
              . Toda e qualquer alteração/ cancelamento de reservas deverá ser
              solicitada pelo seu agente de viagens;
              <br />. Será obedecido as condições, prazos, políticas e multas
              constantes nas reservas;
              <br />. Alterações locais em qualquer tipo de serviços podem gerar
              mudanças de tarifa pré-paga, multas e até mesmo gerar a não
              prestação do serviço ficando sob responsabilidade do passageiro.
            </p>
            <p className="text-[10px] text-zinc-600 mt-3">
              . Alterações e cancelamentos não poderão ser solicitados
              diretamente aos hotéis e companhias aéreas e prestadores de
              serviços, deverão ser solicitadas a operadora prestadora do
              serviço;
              <br />. No caso de cancelamentos com a viagem já iniciada, além do
              estabelecido em contrato, será devolvido apenas o valor que for
              conseguido recuperar dos fornecedores.
              <br />
              *. Em todas as reservas deverá ser inserido os dados de contato
              dos passageiros para em casos de alterações de voos ou serviços, o
              mesmo ser informado;{" "}
              <strong className="font-bold">*Boa Viagem!</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
