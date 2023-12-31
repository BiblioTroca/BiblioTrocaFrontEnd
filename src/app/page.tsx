import { cookies } from 'next/headers'
import Image from 'next/image'
import { getAuthentication } from '@/utils/auth'
import { PublicHeader } from '../components/PublicHeader'
import { SessionButton } from '@/components/PublicHeader/SessionButton'
import { Presentation } from './components/Presentation'
import { AboutUs } from './components/AboutUs'
import { GetStarted } from './components/GetStarted'
import { FAQ } from './components/FAQ'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'

import MobileHero from '../assets/mobile-hero.svg'
import ShadowHero from '../assets/shadow-hero.png'

export default function Home() {
  const isAuthenticated = cookies().has('token')
  const { user } = getAuthentication(isAuthenticated)

  return (
    <>
      <div className="relative h-screen overflow-hidden bg-radial-gradient dark:bg-dark-mode">
        <PublicHeader variant="home">
          <SessionButton variant="home" user={user} />
        </PublicHeader>

        <Reveal isHero>
          <section className="relative mx-auto flex max-w-[73rem] flex-col items-center">
            <h1 className="max-w-xl bg-gradient-title bg-clip-text px-6 text-center font-secondary text-title-xl text-transparent lg:max-w-[45rem] lg:text-title-2xl">
              Cada Livro, uma Nova Jornada ao Conhecimento
            </h1>

            <Image
              src={MobileHero}
              alt="Dois celulares exibindo as versões do sistema mobile"
              width={550}
              quality={100}
              priority
              className="relative z-0 px-6 lg:-my-[1.45rem] lg:w-[34.375rem] min-[2000px]:w-[42rem]"
            />
          </section>
        </Reveal>

        <Image
          src={ShadowHero}
          alt=""
          width={1440}
          className="absolute bottom-0 h-44 w-screen"
        />
      </div>

      <main className="dark:bg-black">
        <Reveal>
          <Presentation />
        </Reveal>

        <Reveal>
          <AboutUs />
        </Reveal>

        <GetStarted />

        <Reveal>
          <FAQ />
        </Reveal>
      </main>

      <Reveal noMargin>
        <Footer />
      </Reveal>
    </>
  )
}
