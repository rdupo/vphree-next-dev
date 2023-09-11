import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';

const getTxnHistory = (id) => {
  const settings = {
    apiKey: 'Xq9-5SRgOVU_UxK6uHdIk-oNvvO_n1iZ',
    network: Network.ETH_GOERLI,
  };
  const alchemy = new Alchemy(settings);
  const [txn, setTxn] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  
  const v3Abi = [
    {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"flipMintState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mapsEthAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintState","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  const mpAbi = [
    {"inputs":[{"internalType":"address","name":"initialPhunksAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"}],"name":"PhunkBidEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"}],"name":"PhunkBidWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"},{"indexed":true,"internalType":"address","name":"toAddress","type":"address"}],"name":"PhunkBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"PhunkNoLongerForSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"minValue","type":"uint256"},{"indexed":true,"internalType":"address","name":"toAddress","type":"address"}],"name":"PhunkOffered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"uint256","name":"minPrice","type":"uint256"}],"name":"acceptBidForPhunk","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"buyPhunk","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"enterBidForPhunk","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"uint256","name":"minSalePriceInWei","type":"uint256"}],"name":"offerPhunkForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"uint256","name":"minSalePriceInWei","type":"uint256"},{"internalType":"address","name":"toAddress","type":"address"}],"name":"offerPhunkForSaleToAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pendingWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"phunkBids","outputs":[{"internalType":"bool","name":"hasBid","type":"bool"},{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"address","name":"bidder","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"phunkNoLongerForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"phunksAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"phunksOfferedForSale","outputs":[{"internalType":"bool","name":"isForSale","type":"bool"},{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"uint256","name":"minValue","type":"uint256"},{"internalType":"address","name":"onlySellTo","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newPhunksAddress","type":"address"}],"name":"setPhunksContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"withdrawBidForPhunk","outputs":[],"stateMutability":"nonpayable","type":"function"}];

  const fetchTransactionHistory = async () => {
    const retry = async (fn, maxRetries = 5) => {
      let retries = 0;
      while (retries < maxRetries) { 
        try {
          return await fn();
        } catch (error) {
          console.error(`Error fetching data (retry ${retries + 1}):`, error.message);
          retries++;
        }
      }
      throw new Error(`Max retries (${maxRetries}) exceeded.`);
    };

    const transformMarketplaceEvent = (event) => {         
      for(let i = 0; i < event.length; i++) {    
        return {
          eventType: event[i].event,
          from: event[i].from,
          to: event[i].event === 'PhunkOffered' ? '' : event[i].to,
          amount: ethers.utils.formatUnits(event[i].args.minValue._hex,18),
          tokenId: ethers.utils.formatUnits(event[i].args.phunkIndex._hex,0),
          timestamp: event[i].blockNumber,
        }
      }
    };

    const transformList = async (event) => {
      const results = [];

      for (let i = 0; i < event.length; i++) {
        const txHash = event[i].transactionHash;
        const txnReceipt = await alchemy.core.getTransactionReceipt(txHash);
        //console.log('topics: ', txnReceipt.logs[0].topics.length);
        results.push({
          eventType: 'PhunkOffered',
          from: txn.from,
          to: '',
          amount: ethers.utils.formatUnits(txnReceipt.logs[0].topics[1]), 
          tokenId: ethers.utils.formatUnits(txnReceipt.logs[0].topics[0]),
          timestamp: txn.blockNumber,
        });
      }

      return results;
    };

    const transformOffer = async (event) => {
      const results = [];
      
      for (let i = 0; i < event.length; i++) {
        const txHash = event[i].transactionHash;
        const txnReceipt = await alchemy.core.getTransactionReceipt(txHash);
        //console.log('topics: ', txnReceipt.logs[0].topics.length);
        results.push({
          eventType: 'PhunkBidEntered',
          from: txn.from,
          to: txn.to,
          amount: ethers.utils.formatUnits(txnReceipt.logs[0].topics[1]),
          tokenId: ethers.utils.formatUnits(txnReceipt.logs[0].topics[0]),
          timestamp: txn.blockNumber,
        });
      }

      return results;
    };

    const transformSale = async (event) => {
      const results = [];
      
      for (let i = 0; i < event.length; i++) {
        const txHash = event[i].transactionHash;
        const txnReceipt = await alchemy.core.getTransactionReceipt(txHash);
        //console.log('topics: ', txnReceipt.logs[0].topics.length);
        results.push({
          eventType: 'PhunkBought',
          from: txn.from,
          to: txn.to,
          amount: ethers.utils.formatUnits(txnReceipt.logs[0].topics[1]),
          tokenId: ethers.utils.formatUnits(txnReceipt.logs[0].topics[0]),
          timestamp: txn.blockNumber, 
        });
      }

      return results;
    };

    const transformNFTEvent = (event) => {
      for(let i = 0; i < event.length; i++) {          
        return {
          eventType: event[i].event,
          from: event[i].args.from,
          to: event[i].args.to,
          amount: '',
          tokenId: ethers.utils.formatUnits(event[i].args.tokenId._hex,0),
          timestamp: event[i].blockNumber,
        };
      }
    };

    const nftContract = new ethers.Contract('0x169b1CE420F585d8cB02f3b23240a5b90BA54C92', v3Abi, provider);
    const marketplaceContract = new ethers.Contract('0x101F2256ba4db70F2659DC9989e0eAFb4Fd53829', mpAbi, provider);

    const filterList = marketplaceContract.filters.PhunkOffered(id, null, null);
    const filterOffer = marketplaceContract.filters.PhunkBidEntered(id, null, null);
    const filterSale = marketplaceContract.filters.PhunkBought(id, null, null, null);
    const filterV3 = nftContract.filters.Transfer(null, null, id);

    const List = await retry(async () => await marketplaceContract.queryFilter(filterList));
    const Offer = await retry(async () => await marketplaceContract.queryFilter(filterOffer));
    const Sale = await retry(async () => await marketplaceContract.queryFilter(filterSale));
    const marketplaceEvents = [...List, ...Offer, ...Sale];

    const nftEvents = await retry(async () => await nftContract.queryFilter(filterV3));

    // Combine all events
    const combinedEvents = [];
    const transformedMarketplaceEvent = transformMarketplaceEvent(marketplaceEvents);
    const transformedNFTEvent = transformNFTEvent(nftEvents);
    combinedEvents.push(transformedMarketplaceEvent, transformedNFTEvent);
    //console.log('combined', combinedEvents)
    
    // Sort combinedEvents array by timestamp
    combinedEvents.sort((a, b) => a.timestamp - b.timestamp);
    const filteredEvents = combinedEvents.filter( i => i.tokenId.includes(id) );
    //console.log('filtered', filteredEvents)

    // Filter out events with the same timestamp as in transactionHistory
    const refilteredEvents = filteredEvents.filter(event => {
      return !transactionHistory.some(prevEvent => prevEvent.timestamp === event.timestamp);
    });
  
    const formattedEvents = refilteredEvents.map(event => {
      let eventType;
      if (event.from == '0x0000000000000000000000000000000000000000') {
        eventType = 'Mint';
      }
      else if (event.eventType === 'Transfer') {
        eventType = 'Transfer';
      } else if (event.eventType === 'PhunkOffered') {
        eventType = 'Listed';
      } else if (event.eventType === 'PhunkBought') {
        eventType = 'Sold';
      } else if (event.eventType === 'PhunkBidEntered') {
        eventType = 'Offer'
      }

      return {
        from: event.from,
        to: event.to,
        eventType: eventType,
        amount: event.amount,
      };
    });

    if (formattedEvents.length > 0) {
      setTransactionHistory(formattedEvents);
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/Xq9-5SRgOVU_UxK6uHdIk-oNvvO_n1iZ',5);
    fetchTransactionHistory();
  }, [id]);
 
  return { transactionHistory };
};

export default getTxnHistory;