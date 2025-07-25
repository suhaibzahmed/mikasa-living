import Image from 'next/image'
import HeroImg from '@/public/images/hero.jpeg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SearchVendors from './navbar/SearchVendors'

const HeroSection = () => {
  return (
    <div className="relative h-[800px] w-full" id="home">
      <Image src={HeroImg} alt="hero" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white gap-y-6 p-4">
        <h1 className="text-5xl font-bold md:text-6xl">
          We design your dream home
        </h1>
        <p className="max-w-2xl text-lg text-pretty">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit ipsum dolor
          sit
        </p>
        <div className="mt-4 flex flex-col gap-y-4 w-full max-w-lg">
          <SearchVendors />
          <div className="flex justify-center gap-x-4 w-full">
            <Button variant="secondary">
              <Link href="/#services">Our Services</Link>
            </Button>
            <Button>
              <Link href="/#vendors">Browse Vendors</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HeroSection
