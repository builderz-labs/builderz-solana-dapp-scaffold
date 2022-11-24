import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider';

export const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

  console.log(networkConfiguration);

  return (
<>
<label className="cursor-pointer label w-[150px]">
      <a>Network</a>

    </label>
          <select             
          value={networkConfiguration}
          onChange={(e) => setNetworkConfiguration(e.target.value)} 
          className="select px-2 py-1"
        >
          <option value="mainnet-beta">mainnet-beta</option>
          <option value="devnet">devnet</option>
        </select></>
  );
};
