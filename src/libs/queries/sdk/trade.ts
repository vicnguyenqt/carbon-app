import { useQuery } from '@tanstack/react-query';
import { QueryKey } from 'libs/queries';
import { carbonSDK } from 'libs/sdk';
import BigNumber from 'bignumber.js';
import { useCarbonSDK } from 'hooks/useCarbonSDK';
import { Action, TradeActionStruct } from 'libs/sdk';
import { MatchAction } from '@bancor/carbon-sdk/src/types';

type GetTradeDataResult = {
  tradeActions: TradeActionStruct[];
  actionsTokenRes: Action[];
  totalSourceAmount: string;
  totalTargetAmount: string;
  effectiveRate: string;
  actionsWei: MatchAction[];
};

type Props = {
  sourceToken: string;
  targetToken: string;
  input: string;
  isTradeBySource: boolean;
  enabled?: boolean;
};

export const useGetTradeData = ({
  isTradeBySource,
  input,
  sourceToken,
  targetToken,
  enabled,
}: Props) => {
  const { isInitialized } = useCarbonSDK();

  return useQuery<GetTradeDataResult>(
    QueryKey.tradeData(sourceToken, targetToken, isTradeBySource, input),
    async () => {
      const hasInvalidInput =
        input === '' || isNaN(Number(input)) || new BigNumber(input).isZero();

      if (hasInvalidInput) {
        return {
          totalSourceAmount: '',
          totalTargetAmount: '',
          tradeActions: [],
          actionsTokenRes: [],
          effectiveRate: '',
          actionsWei: [],
        };
      }

      return await carbonSDK.getTradeData(
        sourceToken,
        targetToken,
        input,
        !isTradeBySource
      );
    },
    {
      enabled: !!enabled && isInitialized && input !== '...',
      cacheTime: 0,
      retry: 1,
    }
  );
};
