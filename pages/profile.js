import { React, useState } from 'react'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Image from 'next/image'
import Header from  '../components/Header'
import Footer from '../components/Footer'
import Banner from '../assets/profile-banner.png'
import { Silkscreen, Montserrat } from 'next/font/google'

export default function V3Phunks() {
  const sdk = new ThirdwebSDK("goerli");
  const [listed, setListed] = useState([]);
  (async () => {
    const contract = await sdk.getContract("0x8aC28C421d2CB0CbE06d47D617314159247Cd2dc", "marketplace");
    const listings = await contract.getActiveListings();
    setListed(listings)
  })()

  return (
    <>
      <Header/>
      <div className="page">
        <div className="banner-wrapper mb-6">
          <Image 
            className="col-banner" 
            src={Banner} 
            width="100%" 
            alt="profile banner"
          />
        </div>
        <div className="content mx-4">
          <h1 
            className="v3-txt mr-auto mb-4" 
            id="profile-addy">
              Profile: ---
          </h1>
          <div 
            className="withdraw-wrapper hidden" 
            id="withdraw"
          >
            <button 
              className="cta v3-bg" 
              //onclick="withdrawEth()"
            >
              WITHDRAW ETH
            </button>
          </div>
          <div id="assets" className="mt-4"></div>
        </div>
      </div>
      <Footer/>      
    </>
  )
}