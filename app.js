// Metamask Connection Module
const connectMetamask = async () => {
    if (!window.ethereum) {
      console.error('Metamask is not installed');
      return;
    }
  
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      document.getElementById('walletAddress').innerText = `Connected account: ${account}`;
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
      document.getElementById('walletAddress').innerText = 'Error connecting to Metamask';
    }
  };
  
  document.getElementById('connectButton').addEventListener('click', connectMetamask);
  
  // SHA256 Hashing Module
  const hashText = () => {
    const inputText = document.getElementById('inputText').value;
    if (!inputText) {
      document.getElementById('hashOutput').innerText = 'Please enter text to hash';
      return;
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);
    crypto.subtle.digest('SHA-256', data)
      .then(hash => {
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        document.getElementById('hashOutput').innerText = `SHA256 Hash: ${hashHex}`;
      })
      .catch(error => {
        console.error('Error calculating SHA256 hash:', error);
        document.getElementById('hashOutput').innerText = 'Error calculating SHA256 hash';
      });
  };
  
  document.getElementById('hashButton').addEventListener('click', hashText);
  
  // Doc Panel Module
  const loadSites = () => {
    fetch('sites.json')
      .then(response => response.json())
      .then(sites => {
        const docPanel = document.getElementById('docPanel');
        const siteFrame = document.getElementById('siteFrame');
  
        sites.forEach(site => {
          const listItem = document.createElement('div');
          listItem.textContent = site.name;
          listItem.style.cursor = 'pointer';
          listItem.addEventListener('click', () => {
            siteFrame.src = site.url;
          });
          docPanel.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error loading sites:', error);
        document.getElementById('docPanel').innerText = 'Error loading sites';
      });
  };
  
  loadSites();
  
  // AES Encryption/Decryption Module
  const encryptWithAES = (text, key) => {
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
  };
  
  const decryptWithAES = (text, key) => {
    const decrypted = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
  };
  
  const handleEncryption = () => {
    const inputText = document.getElementById('inputText').value;
    const encryptionKey = document.getElementById('encryptionKey').value;
  
    if (!inputText || !encryptionKey) {
      document.getElementById('outputText').innerText = 'Please enter text and encryption key';
      return;
    }
  
    const encrypted = encryptWithAES(inputText, encryptionKey);
    document.getElementById('outputText').innerText = encrypted;
  };
  
  const handleDecryption = () => {
    const inputText = document.getElementById('inputText').value;
    const encryptionKey = document.getElementById('encryptionKey').value;
  
    if (!inputText || !encryptionKey) {
      document.getElementById('outputText').innerText = 'Please enter text and encryption key';
      return;
    }
  
    const decrypted = decryptWithAES(inputText, encryptionKey);
    document.getElementById('outputText').innerText = decrypted;
  };
  
  document.getElementById('encryptButton').addEventListener('click', handleEncryption);
  document.getElementById('decryptButton').addEventListener('click', handleDecryption);



// 

const ethers = require('ethers');

// Connect to the local Ganache blockchain
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

// Get the list of test accounts
let accounts;
provider.listAccounts().then(acc => accounts = acc);

// Function to get the balance of an account
async function getBalance(address) {
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}

// Function to display the balance
function showBalance() {
  const addressInput = document.getElementById('address');
  const balanceElement = document.getElementById('balance');

  getBalance(addressInput.value)
    .then(balance => {
      balanceElement.textContent = `Balance: ${balance} ETH`;
    })
    .catch(error => {
      console.error(error);
      balanceElement.textContent = 'Error getting balance';
    });
}
