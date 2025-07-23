import Image from 'next/image'
import HeroImg from '@/public/images/hero.jpeg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SearchVendors from './navbar/SearchVendors'

const HeroSection = () => {
  return (
    <div className="relative ">
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-[rgba(17,17,17,0.9)] via-[rgb(17,17,17,0.4)] to-[rgb(17,17,17,0.2)] z-10 "></div>

      <div className="h-[700px] max-h-[700px] w-full relative top-0 ">
        <Image src={HeroImg} alt="hero" fill className="object-cover " />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 flex flex-col gap-y-4">
        <h1 className="text-white text-pretty">We design your dream home</h1>
        <p className=" text-pretty">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit ipsum dolor
          sit
        </p>

        <SearchVendors />

        <div className="flex justify-center gap-x-4 w-full">
          <Button variant="outline">
            <Link href="/#services">Our Services</Link>
          </Button>
          <Button>
            <Link href="/#vendors">Browse Vendors</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
export default HeroSection
