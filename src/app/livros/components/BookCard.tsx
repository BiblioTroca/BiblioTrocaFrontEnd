import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { BookSimpleData } from '@/@types/bookSimpleData'
import { useAddress } from '@/hooks/useAddress'
import { Card } from '@/components/Card'
import { ArrowRight, PaperPlaneTilt, MapPin, Star } from '@phosphor-icons/react'

interface BookCardProps {
  book: BookSimpleData
}

export function BookCard({ book }: BookCardProps) {
  const { checkCep, bairro, cidade, isError } = useAddress()

  useQuery({
    queryKey: ['address', book.user.location, book.id],
    queryFn: () => {
      checkCep(book.user.location)

      return book.user.location
    },

    enabled: !!book.user.location, // only runs if the location exists
  })

  const address = isError ? book.user.location : `${bairro}, ${cidade}`

  const existingAverageRating = book.user.averageRating
    ? book.user.averageRating
    : '-'
  const existingAvaliationsNumber = book.user.avaliationsNumber
    ? book.user.avaliationsNumber
    : '0'

  return (
    <Card
      componentType="article"
      type="content"
      className="px-0 text-gray-500 hover:ring-2 hover:ring-primary-400"
    >
      <header className="mb-3 flex items-start justify-between gap-3 px-4 max-[350px]:flex-col">
        <div className="flex flex-col">
          <strong className="font-secondary text-title-sm">{book.name}</strong>
          <p className="text-base-140 text-gray-400 dark:text-white">
            por {book.author}
          </p>
        </div>

        <Link
          href={`/livro/${book.id}`}
          prefetch={false} // prefetch works only on hover
          className="flex items-center gap-1 text-sm-140 transition-colors duration-200 hover:text-primary-500 dark:text-yellow-500 dark:hover:text-yellow-300"
        >
          Detalhes
          <ArrowRight size={'0.75rem'} />
        </Link>
      </header>

      <p className="mb-3 px-4 text-base-160">{book.shortDescription}</p>

      <span
        aria-label="categoria"
        className="mx-4 mb-4 inline-block rounded-xl border-[1px] border-primary-500 px-3 py-1 text-xs-140 text-primary-500 dark:border-white dark:text-white"
      >
        {book.category}
      </span>

      <footer className="flex items-start justify-between border-t-[1px] border-gray-300 pt-4 max-[350px]:flex-col">
        <div className="flex flex-col gap-[0.125rem] px-4">
          <p className="flex items-center gap-1 text-base-140">
            <PaperPlaneTilt size={'0.75rem'} />
            Enviado por {book.user.name}
          </p>
          <p className="flex items-center gap-1 text-sm-140 text-gray-400 dark:text-white">
            <MapPin size={'0.75rem'} />
            {address}
          </p>
        </div>

        <div className="flex items-center gap-1 px-4 max-[350px]:mt-[0.125rem]">
          <p className="flex items-center gap-1 text-base-140">
            <Star weight="fill" className="text-orange-500" />
            {existingAverageRating}
          </p>
          <span className="text-sm-140 text-gray-400 dark:text-white">{`(${existingAvaliationsNumber})`}</span>
        </div>
      </footer>
    </Card>
  )
}
