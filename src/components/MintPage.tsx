import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Toast from '@/components/ui/toast';
import SuccessModal from "@/components/ui/SuccessModal";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { BrowserProvider, Contract, parseEther } from "ethers";

interface MintPageProps {
  isWalletConnected: boolean;
}

const MintPage = ({ isWalletConnected }: MintPageProps) => {
  const { address } = useAccount();
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    payer: '',
    amount: '',
    paytoken: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMintedNft, setIsMintedNft] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const MintedSuccess = () => {
    setIsMintedNft(true);
  };

  const handleGoToNFTs = () => {
    setIsMintedNft(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isAllowed = ['image/', 'application/pdf'].some(type =>
        file.type.startsWith(type)
      );

      if (!isAllowed) {
        setToast({ message: 'Unsupported file type!', type: 'error' });
        return;
      }
      setToast({ message: `Success File upload.`, type: 'success' });
      setSelectedFile(file);
    }
  };

  const handleMint = async () => {
    const missingFields = [];
    if (!selectedFile) missingFields.push('File');
    if (!formData.name?.trim()) missingFields.push('Name');
    if (!formData.description?.trim()) missingFields.push('Description');
    if (!formData.payer?.trim()) missingFields.push('Payer');
    if (!formData.amount?.toString().trim()) missingFields.push('Amount');

    if (typeof window === "undefined" || !window.ethereum) {
      console.error("MetaMask not found.");
      return;
    }

    if (missingFields.length > 0) {
      setToast({
        message: `Please fill in the following:\n${missingFields.join(', ')}.`,
        type: 'error',
      });
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

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mint`, {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      if (!response.ok) {
        setToast({
          message: `Upload failed: ${data.details}`,
          type: 'error',
        });
        return;
      }

      const uri = data.metadata_url;
      const CONTRACT_ADDRESS = '0x0a35e0519be345d44feae9c34c8f8e36eabc1921';
      const CONTRACT_ABI = [
        "function mintInvoice(address payer, uint256 amount, string memory description, string memory uri) returns (uint256)",
        "function balanceOf(address) view returns (uint256)",
      ];

      const amount = parseEther(formData.amount);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.mintInvoice(formData.payer, amount, String(formData.description), String(uri));
      await tx.wait();

      MintedSuccess();
      setFormData({ name: '', description: '', payer: '', amount: '', paytoken: '' });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error:', error);
      setToast({
        message: `Minting failed. See console for details.`,
        type: 'error',
      });
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
    <div className="min-h-screen bg-white py-8 relative">
      {isLoading && <LoadingOverlay />}
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
            <CardTitle className="text-3xl font-bold text-center text-red-800">
              Mint Your NFT
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* ...Inputs... */}
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

            <div>
              <Label>Upload File</Label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*,application/pdf"
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

      <SuccessModal
        isOpen={isMintedNft}
        onClose={() => setIsMintedNft(false)}
        onConfirm={handleGoToNFTs}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default MintPage;
