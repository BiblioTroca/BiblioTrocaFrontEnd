'use client'

import { ComponentProps, ReactNode, useState } from 'react'
import Link from 'next/link'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '@/contexts/AuthContext'
import { useThemes } from '@/hooks/useThemes'
import { VariantProps, tv } from 'tailwind-variants'
import { Logo } from '../Logo'
import { MobilePublicHeader } from './MobilePublicHeader'
import { SwitchTheme } from './SwitchTheme'
import { SessionButton } from './SessionButton'
import { AnimatePresence } from 'framer-motion'
import { List } from '@phosphor-icons/react'

const header = tv({
  base: 'py-6 mb-9 dark:bg-black',
  variants: {
    variant: {
      generic: 'bg-white border-b-[1px] border-gray-300',
      home: 'bg-transparent',
    },
  },

  defaultVariants: {
    variant: 'generic',
  },
})

type PublicHeaderProps = ComponentProps<'header'> &
  VariantProps<typeof header> & {
    children: ReactNode
  }

export function PublicHeader({ variant, children }: PublicHeaderProps) {
  const user = useContextSelector(AuthContext, (context) => {
    return context.user
  })

  const [openMenu, setOpenMenu] = useState(false)
  const { isDarkTheme } = useThemes()

  const isHomeHeader = variant === 'home'
  const homeHeaderStyles =
    'hover:text-primary-100 hover:border-primary-100 dark:hover:border-yellow-300'
  const isNonFocusable = openMenu ? -1 : 0

  function handleOpenMobileMenu() {
    setOpenMenu(!openMenu)
  }

  return (
    <>
      <header className={header({ variant })}>
        <div className="mx-auto flex max-w-[73rem] items-center justify-between px-6">
          {isHomeHeader || isDarkTheme ? (
            <Logo isWhiteLogo className="w-[8.438rem]" />
          ) : (
            <Logo className="w-[8.438rem]" />
          )}

          <nav className="hidden sm:block">
            <ul
              className={`flex gap-5 font-primary text-base-140-md text-gray-600 dark:text-yellow-500
              ${isHomeHeader && 'text-white'}`}
            >
              <li
                className={`border-b border-transparent transition-colors duration-200 dark:hover:text-yellow-300 
                ${isHomeHeader && homeHeaderStyles} 
                ${!isHomeHeader && 'hover:text-primary-500'}`}
              >
                <Link href="/">Home</Link>
              </li>

              <li
                className={`border-b border-transparent transition-colors duration-200 dark:hover:text-yellow-300 
                ${isHomeHeader && homeHeaderStyles}
                ${!isHomeHeader && 'hover:text-primary-500'}`}
              >
                <Link href="/livros">Buscar Livros</Link>
              </li>
            </ul>
          </nav>

          <div className="hidden items-center gap-5 sm:flex">
            {children}

            <SwitchTheme id="change-theme" isHomeHeader={isHomeHeader} />
          </div>

          <button
            onClick={handleOpenMobileMenu}
            aria-label="Abrir menu"
            aria-expanded={openMenu}
            aria-hidden={openMenu}
            tabIndex={isNonFocusable}
            className="sm:hidden"
          >
            <List
              weight="bold"
              size={'1.75rem'}
              className={
                isHomeHeader ? 'text-white' : 'text-gray-500 dark:text-white'
              }
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        <MobilePublicHeader
          openMenu={openMenu}
          openMobileMenu={handleOpenMobileMenu}
        >
          <SessionButton size="mobile" user={user} />
        </MobilePublicHeader>
      </AnimatePresence>
    </>
  )
}
