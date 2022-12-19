import { FC, useState } from 'react';
import { useSetUserApproval } from 'queries/chain/approval';
import { Button } from 'components/Button';
import { shortenString } from 'utils/helpers';
import { Switch } from 'components/Switch';
import { ApprovalTokenResult } from 'hooks/useApproval';
import { QueryKey, useQueryClient } from 'queries';
import { useWeb3 } from 'web3';
import { config } from 'services/web3/config';

type Props = {
  data?: ApprovalTokenResult;
  isLoading: boolean;
  error: unknown;
};

export const ApproveToken: FC<Props> = ({ data, isLoading, error }) => {
  const { user } = useWeb3();
  const mutation = useSetUserApproval();
  const [isUnlimited, setIsUnlimited] = useState(true);
  const cache = useQueryClient();
  const [txBusy, setTxBusy] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false);

  const onApprove = async () => {
    if (!data) {
      return console.error('No data loaded');
    }
    setTxBusy(true);
    await mutation.mutate(
      { ...data, isUnlimited },
      {
        onSuccess: async (tx, variables) => {
          await tx.wait();
          void cache.invalidateQueries({
            queryKey: QueryKey.approval(
              user!,
              variables.tokenAddress,
              variables.spenderAddress
            ),
          });
          setTxBusy(false);
          setTxSuccess(true);
        },
        onError: () => {
          // TODO: proper error handling
          console.error('could not set approval');
          setTxBusy(false);
        },
      }
    );
  };

  if (data?.tokenAddress === config.tokens.ETH) {
    return null;
  }

  // TODO handle error
  if (!data) {
    if (isLoading) {
      return <div>is loading</div>;
    }
    return <div>error</div>;
  }

  return (
    <div
      className={
        'bg-content flex items-center justify-between rounded px-20 py-12'
      }
    >
      <div className={'space-y-6'}>
        <div className={'flex items-center space-x-10'}>
          <div className={'bg-secondary h-30 w-30 rounded-full'} />
          <div>{data.symbol}</div>
        </div>
        {data.approvalRequired && !txSuccess ? (
          <>
            <div className={'text-secondary'}>Allowance: {data.allowance}</div>

            <div className={'text-secondary'}>
              Spender: {shortenString(data.spenderAddress)}
            </div>
          </>
        ) : null}
      </div>

      {data.approvalRequired && !txSuccess ? (
        txBusy ? (
          <div>please wait</div>
        ) : (
          <div className={'flex h-82 flex-col items-end justify-between'}>
            <div className={'flex items-center space-x-8'}>
              <div className={'text-secondary'}>Unlimited</div>
              <Switch
                variant={'tertiary'}
                isOn={isUnlimited}
                setIsOn={setIsUnlimited}
                size={'sm'}
              />
            </div>
            <Button onClick={onApprove} size={'sm'}>
              Confirm
            </Button>
          </div>
        )
      ) : (
        <div className={'text-success-500'}>approved</div>
      )}

      {error ? <pre>{JSON.stringify(error, null, 2)}</pre> : null}
    </div>
  );
};