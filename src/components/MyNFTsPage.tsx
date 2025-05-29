"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, ExternalLink, Heart, X } from "lucide-react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

const CONTRACT_ADDRESS = "0x0a35e0519be345d44feae9c34c8f8e36eabc1921";

const ERC721_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
];

interface MyNFTsPageProps {
  isWalletConnected: boolean;
}

interface NFT {
  tokenId: string;
  name: string;
  description: string;
  image: string;
  collection?: string;
  issuer?: string;
  amount?: string;
}

const isPdf = async (url: string): Promise<boolean> => {
  try {
    const res = await fetch(url, { method: "HEAD" });
    const type = res.headers.get("Content-Type");
    return type === "application/pdf";
  } catch {
    return false;
  }
};

const MyNFTsPage = ({ isWalletConnected }: MyNFTsPageProps) => {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewingNFT, setViewingNFT] = useState<NFT | null>(null);
  const [isPdfPreview, setIsPdfPreview] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!window.ethereum) return;
      setLoading(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC721_ABI, provider);
        const balance = await contract.balanceOf(address);
        const nftList: NFT[] = [];

        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(address, i);
          const tokenURI = await contract.tokenURI(tokenId);
          const response = await fetch(tokenURI);
          const metadata = await response.json();

          nftList.push({
            tokenId: tokenId.toString(),
            name: metadata.name || `NFT #${tokenId}`,
            description: metadata.description || "",
            image: metadata.image || "/placeholder.svg",
            collection: metadata.collection || "",
            issuer: metadata.attributes?.find((attr) => attr.trait_type === "issuer")?.value || "Unknown",
            amount: metadata.attributes?.find((attr) => attr.trait_type === "amount")?.value || "1",
          });
        }

        setNFTs(nftList);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isWalletConnected) {
      fetchNFTs();
    }
  }, [isWalletConnected]);

  useEffect(() => {
    const checkPdfType = async () => {
      if (viewingNFT) {
        const pdf = await isPdf(viewingNFT.image);
        setIsPdfPreview(pdf);
      }
    };
    checkPdfType();
  }, [viewingNFT]);

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Image className="h-16 w-16 text-red-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Wallet Required</h2>
            <p className="text-gray-600 text-center">Please connect your wallet to view your NFTs.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 relative">
      {loading && <LoadingOverlay />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My NFTs</h1>
          <p className="text-gray-600">Manage and view your NFT collection</p>
        </div>

        {nfts.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Image className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No NFTs Yet</h3>
              <p className="text-gray-500 text-center">You haven't minted any NFTs yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nfts.map((nft, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <iframe src={nft.image} title="PDF Viewer" className="w-full h-[70vh] border rounded" />
                  <div className="absolute top-2 right-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white/90">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold truncate">{nft.name}</CardTitle>
                  <p className="text-sm text-gray-600">{nft.collection}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div>
                    <p className="text-xs text-gray-500">Description:</p>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">{nft.description}</p>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <p>Token ID: <span className="font-medium text-gray-800">#{nft.tokenId}</span></p>
                    <p>Amount: <span className="font-medium text-gray-800">{nft.amount}</span></p>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <p>Issuer: <span className="font-medium text-gray-800">{nft.issuer}</span></p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setViewingNFT(nft)}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="default" size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                      Sell
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {viewingNFT && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setViewingNFT(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewingNFT(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">{viewingNFT.name}</h2>
            <p className="text-gray-600">{viewingNFT.description}</p>
            <p className="text-gray-500 mt-2">Issuer: <span className="font-medium text-gray-800">{viewingNFT.issuer}</span></p>
            <p className="text-gray-500">Amount: <span className="font-medium text-gray-800">{viewingNFT.amount}</span></p>

            <div className="my-4">
              {isPdfPreview ? (
                <iframe
                  src={viewingNFT.image}
                  title="PDF Viewer"
                  className="w-full h-[70vh] border rounded"
                />
              ) : (
                <img
                  src={viewingNFT.image}
                  alt={viewingNFT.name}
                  className="max-w-full max-h-[70vh] object-contain rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTsPage;
