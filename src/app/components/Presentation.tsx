import Image from 'next/image'
import { Card } from '@/components/Card'
import { FeatureCard } from './FeatureCard'

import MobilePresentation from '../../assets/mobile-presentation.svg'
import SearchImage from '../../assets/featureCard/search.png'
import NegotiateImage from '../../assets/featureCard/negotiate.png'
import TradeImage from '../../assets/featureCard/trade.png'
import AvaliationImage from '../../assets/featureCard/avaliation.png'

export function Presentation() {
  return (
    <section className="max-w-[73rem] mx-auto px-6 py-9 text-gray-500 flex flex-col gap-4 min-[900px]:flex-row">
      <Card
        componentType="section"
        type="content"
        className="flex flex-col justify-between flex-1 pb-0 dark:bg-black dark:border"
      >
        <div className="dark:text-white">
          <h2 className="text-title-lg font-secondary mb-3">
            Reviva Cada Página
          </h2>
          <p className=" text-base-160 mb-11">
            Descubra o prazer de dar nova vida aos seus livros. Conecte-se,
            troque e aprofunde-se em novos temas de forma simples e direta.
          </p>
        </div>

        <Image
          src={MobilePresentation}
          alt="Celular pela metade exibindo uma página do sistema de detalhes da troca"
          width={512}
          className="mx-auto w-[25rem] min-[900px]:w-[32rem]"
        />
      </Card>

      <Card
        componentType="section"
        type="content"
        className="flex-1 dark:bg-black dark:border dark:text-white"
      >
        <h2 className="text-title-lg font-secondary mb-3">
          Excelência em Cada Ferramenta
        </h2>
        <p className="text-base-160 mb-5">
          Do início ao fim, facilitamos cada etapa do processo para que você
          possa focar no que realmente importa: a sua próxima grande leitura.
        </p>

        <ul className="grid grid-cols-2 gap-2 max-[350px]:grid-cols-1">
          <FeatureCard
            src={SearchImage}
            alt="Mulher buscando livro na prateleira"
            title="Busque e Explore"
            content="Explore e encontre livros desejados com facilidade em nossa plataforma."
          />
          <FeatureCard
            src={NegotiateImage}
            alt="Homem no telefone"
            title="Negocie Diretamente"
            content="Converse pelo WhatsApp para acertar detalhes e combinar a
                    troca do livro."
          />
          <FeatureCard
            src={TradeImage}
            alt="Dois homens fazendo soquinho"
            title="Confirme a Troca"
            content="Finalize sua negociação e confirme a troca com apenas alguns
                    cliques."
          />
          <FeatureCard
            src={AvaliationImage}
            alt="Mulher fazendo joia"
            title="Avaliações Transparentes"
            content="Veja feedbacks de trocas anteriores e compartilhe sua
                    experiência."
          />
        </ul>
      </Card>
    </section>
  )
}
