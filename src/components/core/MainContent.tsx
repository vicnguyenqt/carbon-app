import { FC } from 'react';
import { useWeb3 } from 'libs/web3';
import { useLocation } from '@tanstack/react-location';
import { Outlet, PathNames } from 'libs/routing';
import { ErrorUnsupportedNetwork } from 'components/core/error/ErrorUnsupportedNetwork';
import { ErrorNetworkConnection } from 'components/core/error/ErrorNetworkConnection';
import { useTokens } from 'hooks/useTokens';
import { ErrorTokenList } from 'components/core/error/ErrorTokenList';

export const MainContent: FC = () => {
  const web3 = useWeb3();
  const {
    current: { pathname },
  } = useLocation();
  const tokens = useTokens();

  if (pathname === PathNames.debug) {
    return <Outlet />;
  }

  if (!web3.isSupportedNetwork) {
    return <ErrorUnsupportedNetwork />;
  }

  if (web3.networkError) {
    return <ErrorNetworkConnection />;
  }

  if (tokens.isError) {
    return <ErrorTokenList />;
  }

  return <Outlet />;
};