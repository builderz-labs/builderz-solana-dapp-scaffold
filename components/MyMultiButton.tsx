import * as React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function MyMultiButton() {

  return (
    <div className="mr-4 ml-4">   
        <WalletMultiButton className="glow-on-hover sm:w-[150px] md:w-auto " />
    </div>
  );
}
