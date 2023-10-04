/* eslint-disable prettier/prettier */
import Image from 'next/image'
import { Card } from './Card'
import * as Dialog from '@radix-ui/react-dialog'
import { contentVariants } from '@/constants/modalVariants'
import { RequestExchangeModal } from './modalVariants/RequestExchangeModal'
import { DeleteAccountModal } from './modalVariants/DeleteAccountModal'
import { RefuseExchangeModal } from './modalVariants/RefuseExchangeModal'
import { EvaluateModal } from './modalVariants/EvaluateModal'
import { DeleteBookModal } from './modalVariants/DeleteBookModal'
import { StarRating } from './StarRating'
import { X } from '@phosphor-icons/react'

interface ModalProps {
  variant:
  | 'requestExchange'
  | 'deleteAccount'
  | 'refuseExchange'
  | 'evaluate'
  | 'deleteBook'
  namePersonEvaluated?: string
}

export function Modal({ variant }: ModalProps) {
  const selectedVariant = contentVariants[variant]

  function selectButtonSchema() {
    switch (variant) {
      case 'requestExchange':
        return <RequestExchangeModal />
      case 'deleteAccount':
        return <DeleteAccountModal />
      case 'refuseExchange':
        return <RefuseExchangeModal />
      case 'evaluate':
        return <EvaluateModal />
      case 'deleteBook':
        return <DeleteBookModal />
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 w-screen h-screen bg-overlay" />

      <Dialog.Content className="w-max">
        <Card
          type="content"
          componentType="section"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[20.438rem] max-[350px]:max-w-[18rem]  text-gray-500 dark:bg-black dark:border dark:text-white"
        >
          <Dialog.Close className="block ml-auto">
            <X weight="bold" size={'1.53rem'} />
          </Dialog.Close>

          <Image
            src={selectedVariant.imageUrl}
            alt={selectedVariant.alt}
            width={100}
            height={100}
            className="w-20 mx-auto my-6"
          />

          <Dialog.Title className="text-center text-xl-140-md">
            {selectedVariant.title}
          </Dialog.Title>

          <Dialog.Description className="mt-1 mb-12 text-center text-base-160">
            {selectedVariant.description}
          </Dialog.Description>

          {variant === 'evaluate' && (
            <StarRating />
          )}

          {selectButtonSchema()}
        </Card>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
