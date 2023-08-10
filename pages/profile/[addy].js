import { React, useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Image from 'next/image'
import Header from  '../../components/Header'
import Footer from '../../components/Footer'
import Banner from '../../assets/profile-banner.png'
import { Silkscreen, Montserrat } from 'next/font/google'
import { Network, Alchemy } from 'alchemy-sdk'
import { ethers } from "ethers"
import { getNFTs } from '../../utils/nft';

export default function V3Phunks() {
  const router = useRouter()
  const walletAddy = router.query.addy
  const [nfts, setNFTs] = useState([]);
  const sdk = new ThirdwebSDK("goerli");
  const fallbackProvider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/Xq9-5SRgOVU_UxK6uHdIk-oNvvO_n1iZ');

  useEffect(() => {
    async function fetchNFTs() {
      const nftIds = await getNFTs(walletAddy);
      setNFTs(nftIds);
    }
    fetchNFTs();
  }, []);
  
  return (
    <>
      <Header/>
      <div className="page">
	      <div className="banner-wrapper mb-6">
	      	<Image className="col-banner" src={Banner} width="100%" alt="profile banner"/>
	      </div>
        <div className="content mx-4">
        	<h1 className="v3-txt mr-auto text-5xl">{walletAddy}</h1>
        	<div className="flex flex-wrap justify-center">
	            {nfts.map((nftId) => (
	            	(typeof(nftId) != 'undefined' ?
	                <Card
		                price="" 
		                atts=""
		                id={nftId}
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