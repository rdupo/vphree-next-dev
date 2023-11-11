import { React, useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import Header from  '../../components/Header'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import Banner from '../../assets/profile-banner.png'
import Profile from '../../assets/profile-icon.png'
import { Silkscreen, Montserrat } from 'next/font/google'
import { Network, Alchemy } from 'alchemy-sdk'
import { ethers } from "ethers"
import { getNFTs } from '../../utils/getNFTs';

export default function V3Phunks() {
  const router = useRouter()
  const walletAddy = router.query.addy || ''
  const [connectedAddress, setConnectedAddress] = useState('')
  const [nfts, setNFTs] = useState([]);
  const [pendingWithdrawAmt, setPendingWithdrawAmt] = useState('')
  const marketContract = "0x101F2256ba4db70F2659DC9989e0eAFb4Fd53829"
  const marketAbi = [
      {"inputs":[{"internalType":"address","name":"initialPhunksAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"}],"name":"PhunkBidEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"}],"name":"PhunkBidWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"},{"indexed":true,"internalType":"address","name":"toAddress","type":"address"}],"name":"PhunkBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"PhunkNoLongerForSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"minValue","type":"uint256"},{"indexed":true,"internalType":"address","name":"toAddress","type":"address"}],"name":"PhunkOffered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"uint256","name":"minPrice","type":"uint256"}],"name":"acceptBidForPhunk","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"buyPhunk","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"enterBidForPhunk","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"uint256","name":"minSalePriceInWei","type":"uint256"}],"name":"offerPhunkForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"uint256","name":"minSalePriceInWei","type":"uint256"},{"internalType":"address","name":"toAddress","type":"address"}],"name":"offerPhunkForSaleToAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pendingWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"phunkBids","outputs":[{"internalType":"bool","name":"hasBid","type":"bool"},{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"address","name":"bidder","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"phunkNoLongerForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"phunksAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"phunksOfferedForSale","outputs":[{"internalType":"bool","name":"isForSale","type":"bool"},{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"uint256","name":"minValue","type":"uint256"},{"internalType":"address","name":"onlySellTo","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newPhunksAddress","type":"address"}],"name":"setPhunksContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"withdrawBidForPhunk","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  const provider = new ethers.providers.JsonRpcProvider(
    //process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL
    'https://eth-goerli.g.alchemy.com/v2/Xq9-5SRgOVU_UxK6uHdIk-oNvvO_n1iZ', 5);
  const [signer, setSigner] = useState([]);
  const contract = new ethers.Contract(marketContract, marketAbi, provider);

  useEffect(() => {
    async function fetchNFTs() {
      const thisAddy = router.query.addy
      const nftIds = await getNFTs(thisAddy);
      console.log('ids: ', nftIds);
      setNFTs(nftIds);
    }
    fetchNFTs();
  }, []);

  //get connected wallet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (async () => {
        if (window.ethereum) {
          if (await window.ethereum.isConnected()) {          
            try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              const mmp = new ethers.providers.Web3Provider(window.ethereum);
              const signr = mmp.getSigner(accounts[0]);       
              const address = await signr.getAddress();
              setConnectedAddress(address);
              setSigner(signr);
              const sContract = new ethers.Contract(marketContract, marketAbi, signr);
              const amt = await sContract.pendingWithdrawals(connectedAddress);
              setPendingWithdrawAmt(ethers.utils.formatUnits(amt._hex));
            } catch (error) {
              console.log('MetaMask not found or error:', error);
            }
          }
        }
      })();
    }
  }, []);
      

  //connect wallet, if needed
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const mmp = new ethers.providers.Web3Provider(window.ethereum);
        const signer = mmp.getSigner(accounts[0]);       
        const address = await signer.getAddress();
        setConnectedAddress(address); 
        setSigner(signr);
        const sContract = new ethers.Contract(marketContract, marketAbi, signr);
        const amt = await sContract.pendingWithdrawals(connectedAddress);
        setPendingWithdrawAmt(amt);
      } catch (error) {
        console.log('MetaMask not found or error:', error);
      }
    }
  };

  //withdraw() function
  async function withdrawMyEth() {
    const cpmp = new ethers.Contract(marketContract, marketAbi, signer);
    const withdrawPromise = cpmp.withdraw();
    await withdrawPromise;
  };

  //withdraw
  async function withdraw() {
    if(signer._isSigner) {
      withdrawMyEth()
    } else {
      connectWallet()
      withdrawMyEth()
    }
  };
  
  return (
    <>
      <Header/>
      <div className="page">
        <div className="content px-8">
        	<h1 className="v3-txt mr-auto text-5xl mt-4">
            <Image
              height={40}
              className="inline-flex align-middle my-3 mr-4 h-img" 
              src={Profile}
              alt="profile icon"
            />
            {walletAddy.substr(0,4) + "..." + walletAddy.substr(walletAddy.length - 4, walletAddy.length)}
          </h1>
          <p className="white-txt text-xl">
            This wallet owns {nfts.length} V3 Phunks.
          </p>
          { connectedAddress === walletAddy && pendingWithdrawAmt > 0 ?
            <div className="my-2">
              <button 
                className="cta v3-b black-bg v3-txt"
                onClick={withdraw}
              >
                WITHDRAW {Number(pendingWithdrawAmt).toFixed(3)}Ξ
              </button>
            </div>
            :
            null
          }
        	<div className="flex flex-wrap justify-left">
	            {nfts.map((nftId) => (
	            	(typeof(nftId) != 'undefined' ?
	                <Card
                    key={`_${nftId}`}
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