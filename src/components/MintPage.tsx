import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { BrowserProvider, Contract, parseEther, version } from "ethers";

interface MintPageProps {
  isWalletConnected: boolean;
}

const MintPage = ({ isWalletConnected }: MintPageProps) => {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    payer: '',
    amount: '',
    paytoken: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleMint = async () => {
    // if (!selectedFile || !formData.paytoken) {
    //   alert('Please fill all fields and upload a file.');
    //   return;
    // }
    if (typeof window === "undefined" || !window.ethereum) {
      console.error("MetaMask not found.");
      return;
    }

    if (!selectedFile) {
      alert('Please fill all fields and upload a file.');
      return;
    }
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('payer', formData.payer);
      formDataToSend.append('issuer', address);
      formDataToSend.append('amount', formData.amount);
      formDataToSend.append('paytoken', formData.paytoken);
      formDataToSend.append('file', selectedFile);

      // const response = await fetch('http://localhost:8000/mint', {
      //   method: 'POST',
      //   body: formDataToSend
      // });
      const response = await fetch(`${import.meta.env.API_BASE_URL}/mint`, {
        method: 'POST',
        body: formDataToSend
      });
      const data = await response.json();
      if (!response.ok) {
        alert('Upload failed: ' + data.details);
        return;
      }

      const uri = data.metadata_url;
      const CONTRACT_ADDRESS = '0x0a35e0519be345d44feae9c34c8f8e36eabc1921';
      const CONTRACT_ABI = [
        "function mintInvoice(address payer, uint256 amount, string memory description, string memory uri) returns (uint256)",
        "function balanceOf(address) view returns (uint256)",
      ];



      // const tokenMap: { [key: string]: string } = {
      //   usdt: "0xYourUSDTTokenAddress",
      //   usdc: "0xYourUSDCTokenAddress",
      //   eth: "0x0000000000000000000000000000000000000000"
      // };

      // const paytoken = tokenMap[formData.paytoken.toLowerCase()];
      // if (!paytoken) {
      //   alert("Invalid token selected.");
      //   return;
      // }

      const amount = parseEther(formData.amount);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // const balance = await contract.balanceOf(formData.payer);
      // alert(balance);

      const tx = await contract.mintInvoice(formData.payer, amount, String(formData.description), String(uri));
      // console.log(tx);
      await tx.wait();
      alert('NFT minted successfully!');
      setFormData({ name: '', description: '', payer: '', amount: '', paytoken: '' });
      setSelectedFile(null);

    } catch (error) {

      console.error('Error:', error);
      alert('Minting failed. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-16">
            <Wallet className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Wallet Required</h2>
            <p className="text-gray-600">Please connect your wallet to mint NFTs.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
            <CardTitle className="text-3xl font-bold text-center text-red-800">
              Mint Your NFT
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="NFT name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="NFT description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div>
              <Label>Payer Address</Label>
              <Input
                placeholder="Address of the payer"
                value={formData.payer}
                onChange={(e) => handleInputChange('payer', e.target.value)}
              />
            </div>

            <div>
              <Label>Issuer</Label>
              <Input value={address || ''} readOnly className="bg-gray-100" />
            </div>

            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Amount to be paid"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </div>

            {/* <div>
              <Label>Payment Token</Label>
              <Select onValueChange={(val) => handleInputChange('paytoken', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usdt">USDT</SelectItem>
                  <SelectItem value="usdc">USDC</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div>
              <Label>Upload File</Label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                {selectedFile && <span className="text-sm">{selectedFile.name}</span>}
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleMint}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isLoading ? 'Minting...' : 'Mint Invoice NFT'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MintPage;
