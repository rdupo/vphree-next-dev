import { React, useState } from 'react'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Image from 'next/image'
import Header from  '../../components/Header'
import Footer from '../../components/Footer'
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
        <div className="content mx-4">
          <div className="row-wrapper block px-0 my-4">
            <div className="nft-info grid-rows-4 inline-block pl-0 align-top v3-bg">
              <div id="img-wrapper"></div>
            </div>
            <div className="metadata grid-rows-4 inline-block align-top">
              <h2 id="title" className="v3-txt">v3phunk #---</h2>
              <div className="id-and-owner">
                <p>Owner: <a id="owner">---</a></p>
              </div>
              <div className="metadata" id="md"></div>
            </div>
            <div className="contract-interactions grid-rows-3 inline-block pr-0 align-top">
              <div className="price-and-bid">
                <h2 className="lite-v3-txt">&nbsp;</h2>
                <p id="price">Price: ---</p>
                <p id="bid" className="hidden">Top Bid: ---</p>
                <p className="hidden">Bidder: <a id="top-bidder">---</a></p>
              </div>
              <div 
                className="p-3 black-bg v3-txt hidden v3-b" 
                id="not-connected">
                  Please connect your wallet to interact with this Phunk
              </div>
              <div className="hidden" id="buy-bid-buttons">
                <button 
                  className="v3-bg w-100 p-1 my-2 brite hidden" 
                  //onClick="buyPhunk();"
                  id="buy-btn">BUY</button>
                <br/>
                <button 
                  className="v3-bg w-100 p-1 my-2 brite hidden" 
                  //onClick="togl('enter-bid-amount');"
                  id="bid-btn-togl">BID</button>
                <br/>
                <div className="hidden" id="enter-bid-amount">
                  <input
                    className="lite-v3-bg w-100 p-1 my-2" 
                    type="number" 
                    name="bid-amt" 
                    placeholder="bid amount"
                    id="bid-amt"/>
                  <br/>
                  <button 
                    className="black-bg v3-txt v3-b w-100 p-1 my-2 brite" 
                    //onClick="bidOnPhunk();"
                    id="place-bid-btn">PLACE BID</button>
                </div>
                <button 
                  className="v3-bg w-100 p-1 my-2 brite hidden"
                  //onClick="cancelPhunkBid()"
                  id="cxl-bid-btn">CANCEL BID</button>
              </div>
              <div className="seller-buttons">
                <button 
                  className="v3-bg w-100 p-1 my-2 brite hidden" 
                  //onClick="togl('enter-list-amount');"
                  id="list-btn-togl">LIST</button>
                <br id="delist-br"/>
                <div id="enter-list-amount" className="hidden">
                  <input 
                    className="lite-v3-bg w-100 p-1 my-2" 
                    type="number" 
                    name="sell-amt" 
                    placeholder="list price"
                    id="sell-amt"/>
                  <br/>
                  <button 
                    className="black-bg v3-txt v3-b w-100 p-1 my-2 brite" 
                    //onClick="offerPhunkForSale();"
                    >LIST</button>
                </div>
                <button 
                  className="v3-bg w-100 p-1 my-2 brite hidden" 
                  //onClick="delistPhunk();"
                  id="delist-btn">DELIST</button>
                <br/>
                <button 
                  className="v3-bg w-100 p-1 my-2 brite hidden" 
                  //onClick="acceptBidForPhunk();"
                  id="accept-bid-btn">ACCEPT BID</button>
              </div>
            </div>
          </div>
          <div className="row-wrapper mt-5">
            <div className="tx-history"></div>
          </div>
        </div>
      </div>
      <Footer/>      
    </>
  )
}