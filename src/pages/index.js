import React from 'react'
import Navbar from '@/components/Fragments/Navbar'
import HeaderSection from '@/components/Fragments/HeaderSection'
import FacilitiesSection from '@/components/Fragments/FacilitiesSection'
import PromoSection from '@/components/Fragments/PromoSection'
import DestinationSection from '@/components/Fragments/DestinationSection'

const index = () => {
  return (
    <div>
      <Navbar />
      <div className='flex flex-col h-screen overflow-y-scroll no-scrollbar font-poppins px-36 text-[13px] text-primaryblack bg-white gap-14'>
        <HeaderSection />
        <FacilitiesSection />
        <PromoSection />
        <DestinationSection />
      </div>
    </div>
  )
}

export default index
