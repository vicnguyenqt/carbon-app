import { Token } from 'libs/tokens';
import { useFiatCurrency } from './useFiatCurrency';
import BigNumber from 'bignumber.js';

interface Props {
  base?: Token;
  quote?: Token;
}
export const useMarketPrice = ({ base, quote }: Props) => {
  const { selectedFiatCurrency, useGetTokenPrice } = useFiatCurrency();
  const { data: basePriceMap } = useGetTokenPrice(base?.address);
  const { data: quotePriceMap } = useGetTokenPrice(quote?.address);
  const basePrice = basePriceMap?.[selectedFiatCurrency] || 0;
  const quotePrice = quotePriceMap?.[selectedFiatCurrency] || 0;
  if (!basePrice || !quotePrice) return new BigNumber(0);
  return new BigNumber(basePrice).div(quotePrice);
};
