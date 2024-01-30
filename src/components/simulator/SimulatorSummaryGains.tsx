import { Tooltip } from 'components/common/tooltip/Tooltip';
import { ReactComponent as IconTooltip } from 'assets/icons/tooltip.svg';
import { cn, prettifySignedNumber } from 'utils/helpers';
import { FC } from 'react';
import { Token } from 'libs/tokens';
import { useFiatCurrency } from 'hooks/useFiatCurrency';

interface Props {
  quoteToken: Token;
  portfolioGains: number;
}

export const SimulatorSummaryGains: FC<Props> = ({
  portfolioGains,
  quoteToken,
}) => {
  const { selectedFiatCurrency, getFiatValue } = useFiatCurrency(quoteToken);

  const portfolioGainsRounded = portfolioGains.toFixed(2);
  const portfolioGainsFiat = getFiatValue(portfolioGainsRounded);
  const portfolioGainsFiatFormatted = prettifySignedNumber(portfolioGainsFiat, {
    currentCurrency: selectedFiatCurrency,
    round: true,
    decimals: 2,
    noSubscript: true,
  });

  return (
    <article className={cn('flex flex-col rounded-8')}>
      <Tooltip element={<TooltipContent />}>
        <h4 className="text-secondary flex items-center gap-4 font-mono !text-12">
          Estimated Gains
          <IconTooltip className="h-10 w-10" />
        </h4>
      </Tooltip>
      <p className={`text-24 font-weight-500`}>{portfolioGainsFiatFormatted}</p>
    </article>
  );
};

const TooltipContent: FC<{}> = () => (
  <>
    <span className="align-middle">TBD.&nbsp;</span>
  </>
);
