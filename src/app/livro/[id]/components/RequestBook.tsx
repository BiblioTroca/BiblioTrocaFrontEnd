'use client'

import Link from 'next/link'
import { BookCompleteData } from '@/@types/bookCompleteData'
import { useContextSelector } from 'use-context-selector'
import { ModalContext } from '@/contexts/ModalContext'
import { motion } from 'framer-motion'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import * as Dialog from '@radix-ui/react-dialog'
import { Modal } from '@/components/Modal'
import { MapPin, Star } from '@phosphor-icons/react'
import { AuthContext } from '@/contexts/AuthContext'
import { useAddress } from '@/hooks/useAddress'
import { useQuery } from '@tanstack/react-query'

interface RequestBookProps {
  book: BookCompleteData
}

export function RequestBook({ book }: RequestBookProps) {
  const { modalIsOpen, changeModalVisibility } = useContextSelector(
    ModalContext,
    (context) => {
      return {
        ...context,
      }
    },
  )

  const token = useContextSelector(AuthContext, (context) => {
    return context.token
  })

  const { checkCep, bairro, cidade, isError } = useAddress()

  useQuery({
    queryKey: ['address', checkCep, book.user.location],
    queryFn: () => checkCep(book.user.location),

    enabled: !!book.user.location, // only runs if the location exists
  })

  const address = isError ? book.user.location : `${bairro}, ${cidade}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <Card
        componentType="section"
        type="content"
        className="flex h-full flex-col justify-between text-gray-500 dark:bg-black dark:text-white dark:shadow-solid-white"
      >
        <div>
          <h2 className="mb-3 font-secondary text-title-base text-primary-500 dark:text-white">
            Custo de 20 pontos
          </h2>

          <section className="mb-5 flex flex-col gap-1">
            <p className="text-base-140">
              Enviado por {book?.user.name + ' ' + book?.user.surname}
            </p>

            <div className="flex items-center gap-1">
              <p className="flex items-center gap-1 text-base-140">
                <Star weight="fill" className="text-orange-500" />
                {book?.user.averageRating}
              </p>
              <span className="text-sm-140 text-gray-400 dark:text-white">{`(${book?.user.avaliationsNumber})`}</span>
            </div>

            <p className="flex items-center gap-1 text-base-140">
              <MapPin size={'0.75rem'} />
              {address}
            </p>
          </section>

          <p className="mb-2 text-base-160">
            Negocie diretamente com {book?.user.name} e defina os detalhes da
            troca antes de prosseguir com a solicitação. Toque abaixo para
            iniciar a conversa.
          </p>

          <Button
            componentType={Link}
            variant="whatsapp"
            size="sm"
            href={`https://wa.me/${book?.user.phoneNumber}`}
            target="_blank"
          >
            Entrar em contato
          </Button>

          <p className="mb-11 mt-5 text-base-160">
            Tudo combinado e pronto para avançar? Solicite a troca agora mesmo
            clicando abaixo.
          </p>
        </div>

        <Dialog.Root onOpenChange={changeModalVisibility} open={modalIsOpen}>
          <Dialog.Trigger asChild>
            <Button disabled={!token}>Solicitar troca</Button>
          </Dialog.Trigger>

          <Modal variant="requestExchange" />
        </Dialog.Root>
      </Card>
    </motion.div>
  )
}
