import Link from 'next/link'
import * as Accordion from '@radix-ui/react-accordion'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { CaretDown } from '@phosphor-icons/react'

export function FAQ() {
  const questionsAndAnswers = [
    {
      id: 'question1',
      title: 'Como funciona o sistema de trocas na Bibliotroca?',
      content:
        'Você pode listar seus livros para troca. Quando outro usuário se interessar por um de seus livros, ele enviará uma solicitação de troca. Após a negociação e os detalhes serem acertados, o livro é enviado.',
    },
    {
      id: 'question2',
      title: 'O que são os pontos e como eles funcionam?',
      content:
        'Os pontos são nossa moeda virtual. Quando você lista um livro para troca, recebe uma quantia de pontos. Se outro usuário solicitar seu livro, ele pagará os pontos para você. Da mesma forma, quando você solicitar um livro, pagará em pontos. É um sistema de equilíbrio, incentivando a troca contínua de materiais.',
    },
    {
      id: 'question3',
      title: 'O envio do livro é responsabilidade minha?',
      content:
        'Sim, após uma troca ser confirmada, o livro deve ser enviado ao solicitante por sua responsabilidade. Ambos podem negociar o método de envio que melhor se adequar, seja pessoalmente ou através de serviços de correio.',
    },
    {
      id: 'question4',
      title: 'Como posso avaliar outro usuário após uma troca?',
      content:
        'Após a conclusão de uma troca, ambas as partes têm a opção de avaliar a experiência na plataforma. Essas avaliações ajudam a construir uma comunidade confiável e transparente.',
    },
    {
      id: 'question5',
      title: 'E se eu quiser cancelar uma troca?',
      content:
        'Se desejar cancelar uma solicitação de troca antes de ser confirmada, você pode fazê-lo diretamente na seção de trocas em andamento. No entanto, após uma troca ser confirmada, recomendamos entrar em contato com a outra parte para discutir qualquer alteração.',
    },
  ]

  return (
    <section role="FAQ" className="py-9 px-6 text-gray-500">
      <h2 className="text-center text-title-lg font-secondary mb-3">
        Temos Respostas para Suas Perguntas
      </h2>
      <p className="text-center text-base-160 mb-10">
        Dê uma olhada nas questões mais frequentes sobre a Bibliotroca. Se não
        encontrar o que procura, não hesite em nos enviar sua dúvida.
      </p>

      <Button
        componentType={Link}
        size="md"
        href="https://wa.me/11912345678"
        target="_blank"
        className="mx-auto mb-10"
      >
        Envie sua pergunta
      </Button>

      <Card type="content" className="p-0">
        <Accordion.Root type="multiple">
          {questionsAndAnswers.map((item) => {
            return (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className="py-5 px-4 [&:has(+div)]:border-b-[1px] [&:has(+div)]:border-gray-300"
              >
                <Accordion.Trigger className="flex justify-between gap-3 text-start text-gray-500 font-secondary text-title-xs">
                  <span className="max-w-[16.5rem]">{item.title}</span>
                  <CaretDown weight="bold" />
                </Accordion.Trigger>

                <Accordion.Content className="mt-3 text-gray-500 text-base-160">
                  <p>{item.content}</p>
                </Accordion.Content>
              </Accordion.Item>
            )
          })}
        </Accordion.Root>
      </Card>
    </section>
  )
}
