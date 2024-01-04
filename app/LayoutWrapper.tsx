

import React from 'react';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/mapbox.css';

// TODO: Change to other toast provider
import ContextProvider from '../contexts/ContextProvider';

// Providers


require('@solana/wallet-adapter-react-ui/styles.css');

/**
 *
 * @param Children --> This will be the rendered component in the current page
 * @returns --> A wrapper of providers such as Session, WalletContext around the Children param
 */
type LayoutWrapperProps = {
  children: React.ReactNode;
  session: any;
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, session }) => {
  return (
    <ContextProvider>
      {children}
      {/* Change Notification settings here */}
    </ContextProvider>

  );
};

export default LayoutWrapper;
