'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Icon from '@phosphor-icons/react'
import { Avatar, AvatarProps } from './Avatar'
import { Card } from './Card'
import { Dropdown } from './Dropdown'
import { Skeleton } from './Skeleton'
import { useThemes } from '@/hooks/useThemes'

import 'swiper/css'
import 'swiper/css/free-mode'
import '@/styles/swiper.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'

type NavigationProps = AvatarProps & {
  pendingTransactions: number | undefined
  myBooks: number | undefined
  wishList: number | undefined
  history: number | undefined
  points: number
  isLoading: boolean
}

export function Navigation({
  name,
  src,
  pendingTransactions,
  myBooks,
  wishList,
  points,
  history,
  isLoading,
}: NavigationProps) {
  const { changeTheme, isDarkTheme } = useThemes()

  function handleChangeTheme() {
    changeTheme()
  }

  type MenuItem = {
    link: string
    name: string
    subtitle: string
    icon: ReactNode
  }

  const menuItems: MenuItem[] = [
    {
      link: '/perfil/trocas-pendentes',
      name: 'Trocas',
      subtitle: `${pendingTransactions} pendente(s)`,
      icon: (
        <Icon.Swap
          weight="bold"
          size={22}
          className="text-primary-500 dark:text-yellow-500"
        />
      ),
    },
    {
      link: '/perfil/meus-livros',
      name: 'Meus Livros',
      subtitle: `${myBooks} livro(s)`,
      icon: (
        <Icon.Books
          weight="bold"
          size={22}
          className="text-primary-500 dark:text-yellow-500"
        />
      ),
    },
    {
      link: '/perfil/lista-desejos',
      name: 'Lista de Desejos',
      subtitle: `${wishList} desejo(s)`,
      icon: (
        <Icon.Heart
          weight="bold"
          size={22}
          className="text-primary-500 dark:text-yellow-500"
        />
      ),
    },
    {
      link: '/perfil/historico',
      name: 'Histórico',
      subtitle: `${history} troca(s)`,
      icon: (
        <Icon.ListMagnifyingGlass
          weight="bold"
          size={22}
          className="text-primary-500 dark:text-yellow-500"
        />
      ),
    },
  ]

  return (
    <nav className="mx-auto max-w-[73rem] font-primary">
      <section className="mb-10 flex items-start justify-between">
        {isLoading && (
          <>
            <div>
              <Skeleton
                variant="line"
                className="mb-2 h-8 w-56 animate-pulse md:w-64"
              />
              <Skeleton
                variant="line"
                className="h-5 w-32 animate-pulse md:w-52"
              />
              <div className="mt-2 flex items-center gap-1">
                <Skeleton variant="circle" className="h-[30px] w-[30px]" />
                <Skeleton
                  variant="line"
                  className="h-[30px] w-32 animate-pulse"
                />
              </div>
            </div>

            <Skeleton
              variant="circle"
              className="h-[60px] w-[60px] md:h-24 md:w-24"
            />
          </>
        )}
        {!isLoading && (
          <>
            <div>
              <p className="font-secondary text-title-sm md:text-title-base">
                Olá, {name?.replace('-', ' ')}!
              </p>
              <span className="font-primary text-xs-140 text-gray-300 md:text-lg">
                Sua jornada já lhe rendeu
              </span>
              <div className="mt-2 flex items-center gap-1">
                <Icon.CurrencyCircleDollar
                  className="h-[27px] w-[27px] text-yellow-500 md:h-9 md:w-9"
                  weight="bold"
                />
                <span className="font-secondary text-title-base">
                  {points} pontos
                </span>
              </div>
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="h-max w-max rounded-full">
                  <Avatar
                    className="hover:ring-2 hover:ring-white"
                    src={src}
                    name={name}
                  />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <Dropdown.Content>
                  <Dropdown.Item>
                    <Link
                      className="flex h-full w-full items-center justify-between px-3 dark:text-yellow-500"
                      href="/"
                    >
                      <span>Início</span>
                      <Icon.House size={14} />
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Separator />
                  <Dropdown.Item>
                    <Link
                      className="flex h-full w-full items-center justify-between px-3 dark:text-yellow-500"
                      href="/perfil/editar-perfil"
                    >
                      <span>Gerenciar Conta</span>
                      <Icon.Gear size={14} />
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Separator />
                  {!isDarkTheme && (
                    <>
                      <Dropdown.Item>
                        <button
                          className="flex h-full w-full items-center justify-between px-3"
                          onClick={handleChangeTheme}
                        >
                          <span>Alto Contraste</span>
                          <Icon.CircleHalf
                            size={18}
                            weight="fill"
                            color="#000"
                          />
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Separator />
                    </>
                  )}
                  {isDarkTheme && (
                    <>
                      <Dropdown.Item>
                        <button
                          onClick={handleChangeTheme}
                          className="flex h-full w-full items-center justify-between px-3"
                        >
                          <span>Tema claro</span>
                          <Icon.Sun size={18} />
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Separator />
                    </>
                  )}
                  <Dropdown.Item>
                    <Link
                      className="flex h-full w-full items-center justify-between px-3 text-red-500 dark:text-yellow-500"
                      href="/login"
                    >
                      <span>Encerrar sessão</span>
                      <Icon.SignOut
                        size={18}
                        className="text-red-500 dark:text-yellow-500"
                      />
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </>
        )}
      </section>
      <Swiper
        slidesPerView="auto"
        spaceBetween={14}
        freeMode={true}
        modules={[FreeMode]}
      >
        {menuItems.map((menuItem) => (
          <SwiperSlide key={menuItem.link}>
            <Link href={menuItem.link}>
              <Card type="menu">
                {menuItem.icon}
                <p className="h-max text-base-140-md text-black dark:text-yellow-500">
                  {menuItem.name}
                </p>
                <span className="h-max self-end text-xs-140 text-gray-400 dark:text-yellow-500">
                  {isLoading ? (
                    <Skeleton
                      variant="line"
                      className="w-[78px] animate-pulse"
                    />
                  ) : (
                    menuItem.subtitle
                  )}
                </span>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </nav>
  )
}
