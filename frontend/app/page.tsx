import Hero from '@/components/AutoSlideCarousel';
import Subscription from '@/components/Subscription';

export default function Page() {

  return (
    <div className='flex flex-col space-y-16' >
      <Hero />
      <Subscription />
    </div>
  )
}
