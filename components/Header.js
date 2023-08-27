import { React, useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '../assets/vphree24.png'
import Wallet from '../assets/wallet.png'
import Profile from '../assets/profile-icon.png'
import Discord from '../assets/discord.png'
import { ethers } from 'ethers'

const Header = () => {
	const router = useRouter();
  const [connectedAddress, setConnectedAddress] = useState('');

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const mmp = new ethers.providers.Web3Provider(window.ethereum);
        const signer = mmp.getSigner(accounts[0]);       
        const address = await signer.getAddress();
        setConnectedAddress(address); // Update the state with the connected address
      } catch (error) {
        console.log('MetaMask not found or error:', error);
      }
    }
  }

  //get connected wallet
  const connectedWallet = async () => {
    if (window.ethereum) {
      if (await window.ethereum.isConnected()) {          
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const mmp = new ethers.providers.Web3Provider(window.ethereum);
          const signr = mmp.getSigner(accounts[0]); 
          const address = await signr.getAddress();
          setConnectedAddress(address); 
        } catch (error) {
          console.log('MetaMask not found or error:', error);
        }
      }
    }
  };

  useEffect(() => {
    connectedWallet();
  }, []);

	return 	(
		<div className="v3-txt black-bg flex">
			<div className={"mr-auto brite"}>
				<a href="/" className="sans-underline">
					<Image
						height={40} 
						className="inline-flex align-middle my-3 ml-8 h-img" 
						src={Logo}
						alt="vphree logo"
					/>
					<h1 className="inline-flex align-middle h-txt ml-2">vphree</h1>
				</a>
			</div>
			<div className="justify-content-end">
				<a href="https://discord.gg/phunks" target="_blank" className="sans-underline">
					<Image
						height={30} 
						className="inline-flex align-middle my-3 mr-5 h-img-w brite" 
						src={Discord}
						alt="discord link icon"
					/>
				</a>
				<Image 
					height={30}
					className="inline-flex align-middle my-3 mr-5 h-img-w brite" 
					src={Wallet}
					alt="connect wallet icon"
					onClick={connectWallet}
				/>
				{ connectedAddress.length === 0 ?
					null : 
					<Image
						height={40}
						className="inline-flex align-middle my-3 mr-8 h-img brite" 
						src={Profile}
						alt="profile icon"
						onClick={() => {Router.push({pathname: `/profile/${connectedAddress}`})}}
					/>
				}
			</div>
		</div>
	)
} 

export default Header
