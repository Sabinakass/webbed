import axios from 'axios';

const PINATA_API_KEY = 'dbac4d398e7219c9f731';
const PINATA_SECRET_API_KEY = 'dc34f42aa6396a236d5a24e265d3c884ddb995bc1a5b425332625716bdfdbee7';
const PINATA_BASE_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

export const uploadToPinata = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post(PINATA_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_API_KEY,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading file to IPFS: ', error);
    throw new Error('Unable to upload file to IPFS');
  }
};
