/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import { ChevronRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Apresentacao() {
    return (
        <>
            <div className="w-full h-[297mm] font-sans">
                <header className="relative my-8 mx-14">
                    <svg className="_KMJVg absolute top-0 left-0 w-full h-full" role="presentation" viewBox="0 0 1804.575 256" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" id="__id1__id2" x1="0" y1="128" x2="1804.575" y2="128">
                                <stop stop-color="#e9e9e9" stop-opacity="1" offset="0"></stop>
                                <stop stop-color="#878787" stop-opacity="1" offset="0.5"></stop>
                                <stop stop-color="#878787" stop-opacity="1" offset="1"></stop>
                            </linearGradient>
                        </defs>
                        <rect x="0" y="0" width="1804.575" height="256" fill="url(#__id1__id2)"></rect>
                    </svg>
                    <div className="z-10 relative pl-10">
                        <Image
                            src="/images/logo_mabu-blue-removebg-preview.png"
                            width={220}
                            height={200}
                            alt="Logo Mabu"
                        />
                    </div>
                </header>

                <div className="w-full flex flex-col px-6">
                    <h1 className="text-3xl font-bold text-center">MABU THERMAS GRAND & RESORTS</h1>
                    <section className="flex flex-col gap-10 mt-4">
                        <p className="text-2xl font-bold text-justify">
                            O Mabu Thermas é o destino perfeito para quem procura lazer, bem-estar, entretenimento, acomodações amplas e confortáveis, variedade gastronômica e ainda, proximidade com os principais atrativos turísticos da cidade.
                        </p>
                        <p className="text-2xl font-bold text-justify">
                            Cinco restaurantes e bares, praia e piscinas termais, quadras esportivas, sala de jogos, SPA, tirolesa, wakeboard, lago para pesca esportiva e muitos outros espaços para uma estada incrível. O resort está localizado em uma das principais vias turísticas de Foz do Iguaçu e possui águas termais que mantém seu complexo de piscinas e praia com temperaturas constantes acima de 30ºgraus para aproveitar em qualquer época do ano.
                        </p>
                        <p className="text-2xl font-bold text-justify">
                            Além de toda estrutura do hotel, os hóspedes do Mabu Thermas têm acesso exclusivo ao Blue Park, maior parque aquático do Sul do Brasil.
                        </p>
                    </section>

                    <div className="flex items-center gap-6 mt-20 mb-8">
                        <Image
                            src="/images/location-one-mabu.jpeg"
                            alt="Localização Mabu"
                            className="w-1/3 h-[500px] object-cover rounded-lg"
                            width={500}
                            height={500}
                        />
                        <Image
                            src="/images/image-location-mabu.jpg"
                            alt="Localização Mabu"
                            className="w-1/3 h-[500px] object-cover rounded-lg"
                            width={500}
                            height={500}
                        />
                        <Image
                            src="/images/image-three.jpeg"
                            alt="Localização Mabu"
                            className="w-1/3 h-[500px] object-cover rounded-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full h-[297mm] font-sans">
                <section className="flex flex-col gap-10 mt-20 p-12">
                    <p className="text-2xl font-bold text-justify">
                        Cinco restaurantes e bares, praia e piscinas termais, quadras esportivas, sala de jogos, SPA, tirolesa, wakeboard, lago para pesca esportiva e muitos outros espaços para uma estada incrível. O resort está localizado em uma das principais vias turísticas de Foz do Iguaçu e possui águas termais que mantém seu complexo de piscinas e praia com temperaturas constantes acima de 30ºgraus para aproveitar em qualquer época do ano. Além de toda estrutura do hotel, os hóspedes do Mabu Thermas têm acesso exclusivo ao Blue Park, maior parque aquático do Sul do Brasil.
                    </p>

                    <div className="flex justify-center gap-6">
                        <Button className="flex items-center rounded-[44px] bg-[#576c85] h-7">
                            <Link href="https://www.hoteismabu.com.br/hoteis" target="_blank" >
                                Mabu Bussines
                            </Link>
                            <ChevronRightCircle
                                className=" text-[#576c85] fill-slate-200"
                                style={{ width: 26, height: 26 }}
                            />
                        </Button>
                    </div>
                    <p className="text-2xl font-bold text-justify">
                        A sofisticação dos hotéis Mabu no centro de Curitiba.
                        O Mabu Curitiba Business é pensado para você que vem a Curitiba a lazer ou a negócios. Aqui você encontra conforto, comodidade, alta gastronomia e uma equipe preparada para atendê-lo. Tudo isso no centro da cidade, em frente à Praça Santos Andrade e com vista para o Teatro Guaíra e para a Universidade Federal do Paraná
                    </p>

                    <div className="flex justify-center gap-6">
                        <Button className="flex items-center rounded-[44px] bg-[#576c85] h-7">
                            <Link href="https://www.hoteismabu.com.br/hoteis" target="_blank" >
                                My Mabu
                            </Link>
                            <ChevronRightCircle
                                className=" text-[#576c85] fill-slate-200"
                                style={{ width: 26, height: 26 }}
                            />
                        </Button>
                    </div>
                    <p className="text-2xl font-bold text-justify">
                        Incrível empreendimento de férias de frente para o Blue Park, parque aquático termal. Localizado em Foz do Iguaçu, faz parte do complexo de lazer e entretenimento da Rede Mabu. Com infraestrutura inteligente, o My Mabu alia conforto, conveniência, inovação, praticidade e diversão para toda a família.
                    </p>

                    <h2 className="text-4xl font-bold">Quem Somos</h2>
                    <p className="text-2xl font-bold text-justify">
                        O Grupo Mabu oferece há mais de 50 anos serviços hoteleiros e de entretenimento com alto padrão de excelência para garantir as melhores experiências aos seus hóspedes, a lazer ou a negócios. Constrói sua história mantendo valores como inovação, empreendedorismo e sustentabilidade. Investe constantemente para aprimorar os serviços prestados e a experiência dos seus clientes, assim como em medidas socioambientais. Atua em 3 categorias para atender diferentes necessidade de seus hóspedes.
                    </p>

                    <article className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-2xl font-bold">RESORT</h3>
                            <p className="text-xl font-bold text-justify">
                                Infraestrutura completa, áreas de lazer integradas à natureza e muitas opções de entretenimento indoor e outdoor para lazer em família. O Blue Park o maior parque aquático do sul está aberto aos hóspedes para muita diversão! Curta a primeira praia termal do Sul do país e o complexo de piscinas com águas termais. A alegria da nossa Equipe de Recreação complementa a experiência memorável.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">MULTIPROPRIEDADE</h3>
                            <p className="text-xl font-bold text-justify">
                                Incrível empreendimento de férias de frente para o Blue Park, parque aquático termal. Localizado em Foz do Iguaçu, faz parte do complexo de lazer e entretenimento da Rede Mabu. Com infraestrutura inteligente, o My Mabu alia conforto, conveniência, inovação, praticidade e diversão para toda a família.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">BUSINESS</h3>
                            <p className="text-xl font-bold text-justify">
                                Diferencia-se por sua localização central, com acesso fácil a pontos turísticos e comerciais. Infraestrutura completa para negócios e eventos.
                            </p>
                        </div>
                    </article>
                </section>
            </div>
            <div className="w-full h-[297mm] mt-10 font-sans">
                <div className="p-12">
                    <article className="flex flex-col">
                        <h3 className="text-3xl font-bold">Blue Park</h3>
                        <p className="text-2xl font-bold text-justify">
                            Foz ganha o maior parque aquático do Sul do Brasil. Mais um motivo para atrair visitantes daqui e do exterior. O Blue Park fica em cima do Aquífero Guarani, a segunda maior reserva de água doce do mundo. A primeira etapa entregue tem uma das maiores praias termais do mundo com ondas e garante muita diversão a todos.
                        </p>
                        <p className="text-2xl font-bold text-justify">
                            São 9 tipos de ondas que chegam de até 1,20m de altura, com areia de verdade e um cenário paradisíaco onde a cor da água lembra o mar caribenho.
                            Além das atrações radicais como o Twist Tube, toboágua com quase 70 metros de extensão e uma descida radical
                        </p>
                        <p className="text-2xl font-bold text-justify">
                            de 17 metros e o Fast Falls, 4 toboáguas interligados para deslizar em alta velocidade.
                            Para a Terceira Etapa a novidade será a Fantasy Island, uma área criada para os pequenos se divertirem em atrações exclusivas como o Play Lagoon e Kids Town e seus escorregadores e jatos d'água adequados aos pequenos e o Fun River, rio lento para um passeio em família pelas águas.
                        </p>
                    </article>
                    <article className="flex flex-col mt-8">
                        <h3 className="text-3xl font-bold">Sustentabilidade</h3>
                        <p className="text-2xl font-bold text-justify">
                            Há mais de cinco décadas o Grupo Mabu reforça seu compromisso de respeito à sociedade e ao meio em que está inserida. Atua no segmento de entretenimento e hospitalidade, consciente de seu papel para equilibrar o crescimento econômico com as necessidades do meio ambiente e da sociedade. Conheça as ações e os resultados alcançados em 2021 com a gestão da política de sustentabilidade.
                        </p>
                        <p className="text-2xl font-bold text-justify">
                            O Mabu Thermas Grand Resort está localizado sobre a maior fonte de águas termais do planeta, o Aquífero Guarani. As águas se renovam a cada 4 horas e afloram nas piscinas e praia do complexo, com aproximadamente 36° C, a mesma temperatura do corpo humano. O resort
                        </p>
                    </article>
                    <article className="flex flex-col mt-8">
                        <h3 className="text-3xl font-bold">Mabu Thermas Grand Resort</h3>
                        <p className="text-2xl font-bold text-justify">
                            O Mabu Thermas Grand Resort está localizado sobre a maior fonte de águas termais do planeta, o Aquífero Guarani. As águas se renovam a cada 4 horas e afloram nas piscinas e praia do complexo, com aproximadamente 36° C, a mesma temperatura do corpo humano. O resort em Foz do Iguaçu-PR está localizado a 12 km das Cataratas do Iguaçu, uma das Sete Novas Maravilhas Naturais do Mundo, e do Aeroporto Internacional de Foz do Iguaçu. Seus dados pessoais, em todos os momentos serão tratados de acordo com os princípios e requisitos contidos na legislação brasileira aplicável.
                            Encarregado de Proteção de Dados (DPO): lgpd@valimdias.adv.br
                            Mabu Thermas Resor
                        </p>
                    </article>
                </div>

                <footer className="w-full bg-[#01245e] py-4 px-20 mt-10">
                    <p className="text-white text-center text-2xl">
                        Seus dados pessoais, em todos os momentos serão tratados de acordo com os princípios e requisitos contidos na legislação brasileira aplicável.
                        Encarregado de Proteção de Dados (DPO): lgpd@valimdias.adv.br
                    </p>
                </footer>
            </div>
        </>
    );
}
