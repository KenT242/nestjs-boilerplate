import crypto from 'crypto';

import Web3 from 'web3';
import { Injectable } from '@nestjs/common';

interface IGetLoginMessage {
  address: string;
  nonce: string;
}

type IVerifySignature = {
  signature: string;
  message: string;
  address: string;
};

@Injectable()
export class Web3SignatureService {
  private web3: Web3;
  constructor() {
    this.web3 = new Web3(process.env.BERACHAIN_RPC);
  }

  generateNonce(): string {
    return crypto.randomUUID();
  }

  signMessage(message: string, privateKey: string): { signature: string } {
    return {
      signature: this.web3.eth.accounts.sign(message, privateKey).signature,
    };
  }

  getLoginMessage({ address, nonce }: IGetLoginMessage) {
    return {
      message: `Welcome to BeraMarket!\nClick to sign in and accept the BeraMarket Terms of Service and Privacy Policy.\nThis request will not trigger a blockchain transaction or cost any gas fees.\nWallet address:\n${address}\nNonce:\n${nonce}`,
    };
  }

  async verifySignature({ signature, message, address }: IVerifySignature): Promise<{
    address: string;
  } | null> {
    const recoveredAddress = this.web3.eth.accounts.recover(message, signature);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return null;
    }
    return {
      address: recoveredAddress.toLowerCase(),
    };
  }
}
