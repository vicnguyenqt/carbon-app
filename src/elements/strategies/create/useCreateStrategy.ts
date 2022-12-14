import { useOrder } from './useOrder';
import { useCreateStrategy } from 'queries';
import { useMemo, useState } from 'react';
import { useModal } from 'modals';
import { ModalTokenListData } from 'modals/modals/ModalTokenList';
import poolCollectionProxyAbi from 'abis/PoolCollection_Proxy.json';
import { ApprovalToken } from 'hooks/useApproval';
import { useTokens } from 'tokens';

const spenderAddress = poolCollectionProxyAbi.address;

export const useCreate = () => {
  const { openModal } = useModal();
  const { tokens } = useTokens();
  const source = useOrder();
  const target = useOrder();
  const [name, setName] = useState('');
  const mutation = useCreateStrategy();

  const showStep2 = !!source.token && !!target.token;

  const approvalTokens = useMemo(() => {
    const array: ApprovalToken[] = [];
    if (source.token) {
      array.push({
        tokenAddress: source.token?.address,
        spenderAddress,
        amount: source.budget,
        decimals: source.token?.decimals,
        token: source.token,
      });
    }
    if (target.token) {
      array.push({
        tokenAddress: target.token?.address,
        spenderAddress,
        amount: target.budget,
        decimals: target.token?.decimals,
        token: target.token,
      });
    }

    return array;
  }, [source.budget, source.token, target.budget, target.token]);

  const create = async () => {
    if (!(source && target)) {
      throw new Error('source or target tokens not set');
    }
    mutation.mutate(
      {
        token0: {
          balance: source.budget,
          token: source.token!,
          low: source.min,
          high: source.max,
        },
        token1: {
          balance: target.budget,
          token: target.token!,
          low: target.min,
          high: target.max,
        },
      },
      {
        onSuccess: async (tx) => {
          console.log('tx hash', tx.hash);
          await tx.wait();
          console.log('tx confirmed');
        },
        onError: (e) => {
          console.error('create mutation failed', e);
        },
      }
    );
  };

  const onCTAClick = async () => {
    openModal('txConfirm', { approvalTokens, onConfirm: create });
  };

  const openTokenListModal = (type?: 'source' | 'target') => {
    const onClick =
      type === 'source'
        ? source.setToken
        : type === 'target'
        ? target.setToken
        : () => {};

    const data: ModalTokenListData = {
      onClick,
      tokens: tokens ?? [],
      limit: true,
    };
    openModal('tokenLists', data);
  };

  return {
    source,
    target,
    name,
    setName,
    onCTAClick,
    openTokenListModal,
    showStep2,
  };
};
