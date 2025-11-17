import Hero from '@/components/sections/Hero'
import NoticeBoard from '@/components/sections/NoticeBoard'
import Stats from '@/components/sections/Stats'
import Highlights from '@/components/sections/Highlights'
import ContactInfo from '@/components/sections/ContactInfo'

export default function Home() {
  return (
    <>
      <Hero />
      <NoticeBoard />
      <Stats />
      <Highlights />
      <ContactInfo />
    </>
  )
}
