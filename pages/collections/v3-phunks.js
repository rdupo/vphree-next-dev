import { React, useState } from 'react'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Image from 'next/image'
import Header from  '../../components/Header'
import CollectionInfo from '../../components/CollectionInfo'
import Filter from '../../components/Filter'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import Banner from '../../assets/v3banner.png'
import Twitter from '../../assets/twitter.png'
import Etherscan from '../../assets/etherscan.png'
import { Silkscreen, Montserrat } from 'next/font/google'

export default function V3Phunks() {
  const collectionContract = "0x169b1CE420F585d8cB02f3b23240a5b90BA54C92"
  const maps = "https://maps.org/"
  const target = "_blank"
  const desc = ["V3Phunks are a low entry-point evolution of the CryptoPhunks ecosystem. 10,000 Phunks minting for .005ETH each with absolutely 100% of proceeds going directly and trustlessly to ",<a href={maps} target={target}>MAPS</a>, ", a mental health organization. A Philanthropic, Phree, and Phunky arm of the overall CryptoPhunk community."]
  const sdk = new ThirdwebSDK("goerli");
  const [listed, setListed] = useState([]);

  (async () => {
    //all listings
    const contract = await sdk.getContract("0x8aC28C421d2CB0CbE06d47D617314159247Cd2dc", "marketplace");
    const listings = await contract.getActiveListings({tokenContract:collectionContract});
    setListed(listings)
  })()

   return (
    <>
      <Header/>
      <div className="page">
        <div className="banner-wrapper mb-6">
          <Image className="col-banner" src={Banner} width="100%" alt="v3 phunks banner"/>
        </div>
        <div className="content px-8">
          <CollectionInfo
            title="v3 Marketplace"
            desc={desc}
            twitter="https://twitter.com/v3phunks"
            contract={collectionContract}
          />
          <Filter />
          <div className="flex flex-wrap justify-center">
            {listed.map((listing) => (
              (typeof(listing) != 'undefined' ?
                <Card
                  price={parseInt(listing.buyoutPrice._hex)*(10e-19)} 
                  atts={listing.asset.attributes.length-1}
                  id={listing.asset.id}
                />
              : null )  
            ))}
          </div>
        </div>    
      </div>
      <Footer/>      
    </>
  )
}