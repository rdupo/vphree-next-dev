useEffect(() => {
  const provider = new _ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL);
  const contractAddress = '0x101F2256ba4db70F2659DC9989e0eAFb4Fd53829';
  const contractABI = [
    {"inputs":[{"internalType":"address","name":"initialPhunksAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"}],"name":"PhunkBidEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"}],"name":"PhunkBidWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"},{"indexed":true,"internalType":"address","name":"toAddress","type":"address"}],"name":"PhunkBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"PhunkNoLongerForSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"minValue","type":"uint256"},{"indexed":true,"internalType":"address","name":"toAddress","type":"address"}],"name":"PhunkOffered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"uint256","name":"minPrice","type":"uint256"}],"name":"acceptBidForPhunk","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"buyPhunk","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"enterBidForPhunk","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"uint256","name":"minSalePriceInWei","type":"uint256"}],"name":"offerPhunkForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"uint256","name":"minSalePriceInWei","type":"uint256"},{"internalType":"address","name":"toAddress","type":"address"}],"name":"offerPhunkForSaleToAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pendingWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"phunkBids","outputs":[{"internalType":"bool","name":"hasBid","type":"bool"},{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"address","name":"bidder","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"phunkNoLongerForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"phunksAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"phunksOfferedForSale","outputs":[{"internalType":"bool","name":"isForSale","type":"bool"},{"internalType":"uint256","name":"phunkIndex","type":"uint256"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"uint256","name":"minValue","type":"uint256"},{"internalType":"address","name":"onlySellTo","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newPhunksAddress","type":"address"}],"name":"setPhunksContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"phunkIndex","type":"uint256"}],"name":"withdrawBidForPhunk","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  const contract = new _ethers.Contract(contractAddress, contractABI, provider);

  const fetchInitialActiveListings = async () => {
    const phunkOfferedFilter = contract.filters.PhunkOffered();
    const phunkBoughtFilter = contract.filters.PhunkBought();
    const ownershipTransferredFilter = contract.filters.OwnershipTransferred();
    const phunkNoLongerForSaleFilter = contract.filters.PhunkNoLongerForSale();

    const initialPhunkOfferedEvents = await contract.queryFilter(phunkOfferedFilter);
    const initialPhunkBoughtEvents = await contract.queryFilter(phunkBoughtFilter);
    const initialOwnershipTransferredEvents = await contract.queryFilter(ownershipTransferredFilter);
    const initialphunkNoLongerForSaleEvents = await contract.queryFilter(phunkNoLongerForSaleFilter);

    // Sort the initialPhunkOfferedEvents by phunkIndex and blockNumber (newest to oldest)
    initialPhunkOfferedEvents.sort((a, b) => {
      if (a.args.phunkIndex.eq(b.args.phunkIndex)) {
        return b.blockNumber - a.blockNumber; // Sort by blockNumber if phunkIndexes are equal
      }
      return a.args.phunkIndex.sub(b.args.phunkIndex).toNumber(); // Sort by phunkIndex
    });

    const uniquePhunkIndexes = new Set();
    const initialActiveListings = [];

    // Iterate through sorted events and select the first occurrence of each unique phunkIndex
    initialPhunkOfferedEvents.forEach(event => {
      const phunkIndex = event.args.phunkIndex;
      if (!uniquePhunkIndexes.has(phunkIndex)) {
        uniquePhunkIndexes.add(phunkIndex);
        initialActiveListings.push(phunkIndex);
      }

      const hasEventAfterOffered = (
          initialPhunkBoughtEvents.some(event => event.args.phunkIndex.eq(phunkIndex) && event.blockNumber > mostRecentPhunkOfferedEvent.blockNumber) ||
          initialOwnershipTransferredEvents.some(event => event.blockNumber > mostRecentPhunkOfferedEvent.blockNumber) ||
          initialphunkNoLongerForSaleEvents.some(event => event.blockNumber > mostRecentPhunkOfferedEvent.blockNumber)
        );

      if (hasEventAfterOffered) {
        uniquePhunkIndexes.delete(phunkIndex);
        const indexToRemove = initialActiveListings.indexOf(phunkIndex);
        if (indexToRemove !== -1) {
          initialActiveListings.splice(indexToRemove, 1);
        }
      }
    });

    setListed(initialActiveListings);
    setDisplayedData(initialActiveListings);

    // Set the most recent PhunkOffered event
    if (initialPhunkOfferedEvents.length > 0) {
      setMostRecentPhunkOfferedEvent(initialPhunkOfferedEvents[0]); // Most recent event is at the beginning of the sorted array
    }
  };

  const phunkOfferedListener = contract.on('PhunkOffered', (fromAddress, phunkIndex, minValue) => {
    setListed(listings => [...listings, phunkIndex]);
    setDisplayedData(listings => [...listings, phunkIndex]);

    // Update the most recent PhunkOffered event
    setMostRecentPhunkOfferedEvent({ args: { phunkIndex }, blockNumber: mostRecentPhunkOfferedEvent.blockNumber });
  });

  fetchInitialActiveListings();

  return () => {
    phunkOfferedListener.removeAllListeners();
  };
}, []);

