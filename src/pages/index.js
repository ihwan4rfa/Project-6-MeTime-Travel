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
  console.log(showDetailPromo);

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
    <div className='relative flex flex-col'>
      <Navbar />
      <div className='flex flex-col relative h-screen overflow-y-scroll no-scrollbar font-poppins px-36 text-[13px] text-primaryblack bg-white gap-20'>
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
