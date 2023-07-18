import { PortfolioData } from 'components/strategies/portfolio/usePortfolioData';
import {
  buildAmountString,
  buildPercentageString,
} from 'components/strategies/portfolio/utils';
import { FC, useMemo } from 'react';
import { createColumnHelper, Table } from 'libs/table';
import { CellContext } from '@tanstack/react-table';
import { Token } from 'libs/tokens';
import { useStore } from 'store';
import { cn, getFiatDisplayValue } from 'utils/helpers';
import { Imager } from 'components/common/imager/Imager';
import { getColorByIndex } from 'utils/colorPalettes';
import { PathNames, useNavigate } from 'libs/routing';

type Props = {
  data: PortfolioData[];
  isLoading: boolean;
};

const columnHelper = createColumnHelper<PortfolioData>();

const CellToken = (info: CellContext<PortfolioData, Token>) => {
  const i = info.table.getSortedRowModel().flatRows.indexOf(info.row);
  const { symbol, logoURI } = info.getValue();

  return (
    <div className={cn('flex', 'items-center', 'space-s-16')}>
      <div
        className={cn('h-32', 'w-4', 'bg-blue', 'rounded-r-2')}
        style={{
          backgroundColor: getColorByIndex(i),
        }}
      />
      <Imager
        alt={'Token Logo'}
        src={logoURI}
        className={'h-32 w-32 rounded-full'}
      />
      <div>{symbol}</div>
    </div>
  );
};

export const PortfolioAllTokensDesktop: FC<Props> = ({ data, isLoading }) => {
  const navigate = useNavigate();

  const {
    fiatCurrency: { selectedFiatCurrency },
  } = useStore();

  const tableColumns = useMemo(
    () => [
      columnHelper.accessor('token', {
        header: 'Token',
        cell: CellToken,
      }),
      columnHelper.accessor('share', {
        header: 'Share',
        cell: (info) => buildPercentageString(info.getValue()),
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (info) =>
          buildAmountString(info.getValue(), info.row.original.token),
      }),
      columnHelper.accessor('value', {
        header: 'Value',
        cell: (info) =>
          getFiatDisplayValue(info.getValue(), selectedFiatCurrency),
      }),
    ],
    [selectedFiatCurrency]
  );

  return (
    <Table<PortfolioData>
      columns={tableColumns}
      data={data}
      onRowClick={(row) =>
        navigate({ to: PathNames.portfolioToken(row.original.token.address) })
      }
      manualSorting
      isLoading={isLoading}
    />
  );
};