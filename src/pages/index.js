import React, { useState } from 'react'
import Navbar from '@/components/Fragments/Navbar'
import HeaderSection from '@/components/Fragments/HeaderSection'
import FacilitiesSection from '@/components/Fragments/FacilitiesSection'
import PromoSection from '@/components/Fragments/PromoSection'
import DestinationSection from '@/components/Fragments/DestinationSection'
import BannerSection from '@/components/Fragments/BannerSection'
import FooterSection from '@/components/Fragments/FooterSection'
import { useDispatch } from 'react-redux';
import { setShowModal } from '@/redux/slice/showModalSlice';
import ModalDetailDestination from '@/components/Elements/ModalDetailDestination'
import ModalDetailPromo from '@/components/Elements/ModalDetailPromo'
import useGetData from '@/Hooks/useGetData'

const index = () => {
  const [showDetailDestination, setShowDetailDestination] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showDetailPromo, setShowDetailPromo] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const dispatch = useDispatch();
  const { getData } = useGetData();

  const handleShowDetailDestination = async (destinationId) => {
    const getDestination = async () => {
      await getData(`activity/${destinationId}`, (res) => {
        setSelectedDestination(res.data.data);
      })
    }

    try {
      await getDestination();
      setShowDetailDestination(true);
      dispatch(setShowModal(true));
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowDetailPromo = async (promoId) => {
    const getPromo = async () => {
      await getData(`promo/${promoId}`, (res) => {
        setSelectedPromo(res.data.data);
      })
    }

    try {
      await getPromo();
      setShowDetailPromo(true);
      dispatch(setShowModal(true));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='relative cursor-default lg:cursor-none flex flex-col font-poppins text-[13px] text-primaryblack dark:text-slate-200'>
      <Navbar />
      <div className='relative flex flex-col h-screen gap-12 px-4 overflow-y-scroll bg-white sm:gap-16 xl:gap-20 sm:px-10 dark:bg-primaryblack no-scrollbar lg:px-36'>
        <HeaderSection />
        <FacilitiesSection />
        <PromoSection handleShowDetailPromo={handleShowDetailPromo} />
        <DestinationSection handleShowDetailDestination={handleShowDetailDestination} />
        <BannerSection />
        <FooterSection />
      </div>
      <ModalDetailDestination showDetailDestination={showDetailDestination} setShowDetailDestination={setShowDetailDestination} selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} />
      <ModalDetailPromo showDetailPromo={showDetailPromo} setShowDetailPromo={setShowDetailPromo} selectedPromo={selectedPromo} setSelectedPromo={setSelectedPromo} />
    </div>
  )
}

export default index
