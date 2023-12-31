import type { Metadata } from 'next'
import Script from 'next/script'
import { MotionConfigs } from '@/lib/FramerMotion'
import { VLibrasPlugin } from '@/components/VLibrasPlugin'
import { ThemesProvider } from '@/lib/NextThemes'
import { AuthProvider } from '@/contexts/AuthContext'
import { QueryProvider } from '@/lib/ReactQuery'
import { barlow, inter } from '@/styles/fonts'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'BiblioTroca',
  description: 'Plataforma de Troca de Livros Educacionais',
  authors: [
    {
      name: 'André Luiz da Silva Santos',
      url: 'https://github.com/eoAndrelz',
    },
    {
      name: 'Guilherme Gonçalves Ferreira da Silva',
      url: 'https://github.com/guilhermegg8',
    },
    {
      name: 'Gustavo Nascimento Souza',
      url: 'https://github.com/Gustavo-Nasc',
    },
    {
      name: 'Leonardo Alex Cajé',
      url: 'https://github.com/leocaje',
    },
    {
      name: 'Mateus Santana da Silva',
      url: 'https://github.com/mateussantanasilva',
    },
    {
      name: 'Pedro Beverglieri Pessina',
      url: 'https://github.com/Pessinaaa',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`antialiased ${inter.variable} ${barlow.variable} bg-white-200 dark:bg-black`}
      >
        <MotionConfigs>
          <VLibrasPlugin />

          <ThemesProvider>
            <AuthProvider>
              <QueryProvider>{children}</QueryProvider>
            </AuthProvider>
          </ThemesProvider>
        </MotionConfigs>
      </body>
      <Script src="/scripts/hotjar.js" />
    </html>
  )
}
