import { useExplorer } from './useExplorer';
import { useExplorerParams } from './useExplorerParams';
import { useLocation } from '@tanstack/react-location';
import { useStore } from 'store';
import { PathNames } from 'libs/routing';
import {
  StrategyPageTabs,
  StrategyTab,
} from 'components/strategies/StrategyPageTabs';
import { ReactComponent as IconOverview } from 'assets/icons/overview.svg';
import { ReactComponent as IconPieChart } from 'assets/icons/piechart.svg';
import { StrategyFilterSort } from 'components/strategies/overview/StrategyFilterSort';

export const ExplorerTabs = () => {
  const { strategies } = useExplorer();
  const { slug, type } = useExplorerParams();

  const {
    current: { pathname },
  } = useLocation();

  const {
    strategies: { sort, setSort, filter, setFilter },
  } = useStore();

  const tabs: StrategyTab[] = [
    {
      label: 'Overview',
      href: PathNames.explorerOverview(type, slug!),
      hrefMatches: [],
      icon: <IconOverview className={'h-18 w-18'} />,
      badge: strategies?.length || 0,
    },
    {
      label: 'Portfolio',
      href: PathNames.explorerPortfolio(type, slug!),
      hrefMatches: [PathNames.explorerPortfolioToken(type, slug!, '0x')],
      icon: <IconPieChart className={'h-18 w-18'} />,
    },
  ];

  return (
    <div className={'flex items-center justify-between gap-16'}>
      <StrategyPageTabs currentPathname={pathname} tabs={tabs} />
      {pathname === PathNames.explorerOverview(type, slug!) && (
        <StrategyFilterSort
          sort={sort}
          filter={filter}
          setSort={setSort}
          setFilter={setFilter}
        />
      )}
    </div>
  );
};