import { aboutUsStats } from '@/constants/user.constants'
import SectionTitle from './SectionTitle'
import Image from 'next/image'
import bathroom from '@/public/images/bathroom.jpg'
import kitchen from '@/public/images/kitchen.png'
import study from '@/public/images/study.jpg'
import bedroom from '@/public/images/bedroom.jpg'

const AboutUs = () => {
  return (
    <div className="my-40" id="about">
      <SectionTitle title="About Us" />

      <section>
        <h2 className="text-white font-medium">
          We have the best interior designers at our disposal
        </h2>

        <p className="text-muted-foreground mt-4 mb-16 w-full md:max-w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eveniet
          et quod assumenda voluptatem minima inventore, quae unde accusamus ut,
          eos nobis provident natus omnis voluptates distinctio itaque incidunt
          doloribus?
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
            <div className="relative h-[450px] ">
              <Image
                src={study}
                alt="bedroom"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <div className="relative h-[450px] ">
              <Image
                src={bedroom}
                alt="bedroom"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-8">
            <div className="flex flex-row items-center justify-evenly">
              {aboutUsStats.map((stat) => (
                <div className="flex flex-col gap-y-2 my-6" key={stat.title}>
                  <h2 className="text-primary font-bold ">{stat.value}</h2>
                  <p className="uppercase text-muted-foreground font-bold text-sm">
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-8">
              <div className="hidden relative sm:block h-[300px] ">
                <Image
                  src={bathroom}
                  alt="bedroom"
                  fill
                  className="object-cover rounded-bl-[80px]"
                />
              </div>
              <div className="hidden relative sm:block h-[300px] ">
                <Image
                  src={kitchen}
                  alt="bedroom"
                  fill
                  className="object-cover rounded-br-[80px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default AboutUs
