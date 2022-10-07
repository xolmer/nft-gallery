import React from 'react';

type Props = {
  nft: any;
};

const NFTCard = ({ nft }: Props) => {
  return (
    <div className="w-1/4 flex flex-col ">
      <div className="rounded-md">
        <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway}></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">Id: {nft.id.tokenId.slice(61)}</p>

          <p className="text-gray-600">
            Contract Address: {nft.contract.address.slice(0, 4)}...{nft.contract.address.slice(-4)}
            <a
              href={`https://etherscan.io/address/${nft.contract.address}`}
              target="_blank"
              rel="noreferrer"
            >
              <h2 className="text-blue-400 text-sm">View on Etherscan</h2>
            </a>
          </p>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600">Description: {nft.description.slice(0, 100)}... </p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
