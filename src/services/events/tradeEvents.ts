import { sendGTMEvent } from './googleTagManager';
import {
  CarbonEvents,
  EventCategory,
  TradeGTMEventType,
  TradeGTMEventTypeBase,
  TransactionConfirmationGTMType,
} from './googleTagManager/types';
import {
  TradeEventBase,
  TradeEventType,
  TransactionConfirmationType,
} from './types';

export interface EventTradeSchema extends EventCategory {
  tradeWarningShow: {
    input: { message: string };
    gtmData: { message: string };
  };
  tradeErrorShow: {
    input: TradeEventType & { message: string };
    gtmData: TradeGTMEventType;
  };
  tradePairSwap: {
    input: TradeEventBase;
    gtmData: TradeGTMEventTypeBase;
  };
  tradePairChangeClick: {
    input: TradeEventBase;
    gtmData: TradeGTMEventTypeBase;
  };
  tradePairChange: {
    input: TradeEventBase;
    gtmData: TradeGTMEventTypeBase;
  };
  tradeSettingsClick: {
    input: TradeEventBase;
    gtmData: TradeGTMEventTypeBase;
  };
  tradeSettingsSlippageToleranceChange: {
    input: TradeEventBase & { tolerance: string };
    gtmData: TradeGTMEventTypeBase & {
      trade_settings_slippage_tolerance: string;
    };
  };
  tradeSettingsTransactionExpirationTimeChange: {
    input: TradeEventBase & { expirationTime: string };
    gtmData: TradeGTMEventTypeBase & {
      trade_settings_transaction_expiration_time: string;
    };
  };
  tradeSettingsResetAllClick: {
    input: TradeEventBase;
    gtmData: TradeGTMEventTypeBase;
  };
  tradeBuyPaySet: {
    input: TradeEventType;
    gtmData: TradeGTMEventType;
  };
  tradeSellPaySet: {
    input: TradeEventType;
    gtmData: TradeGTMEventType;
  };
  tradeBuyReceiveSet: {
    input: TradeEventType;
    gtmData: TradeGTMEventType;
  };
  tradeSellReceiveSet: {
    input: TradeEventType;
    gtmData: TradeGTMEventType;
  };
  tradeBuyClick: {
    input: TradeEventType;
    gtmData: TradeGTMEventType;
  };
  tradeSellClick: {
    input: TradeEventType;
    gtmData: TradeGTMEventType;
  };
  tradeBuy: {
    input: TradeEventType & TransactionConfirmationType;
    gtmData: TradeGTMEventType & TransactionConfirmationGTMType;
  };
  tradeSell: {
    input: TradeEventType & TransactionConfirmationType;
    gtmData: TradeGTMEventType & TransactionConfirmationGTMType;
  };
}

export const tradeEvents: CarbonEvents['trade'] = {
  tradeWarningShow: (data) => {
    sendGTMEvent('trade', 'tradeWarningShow', data);
  },
  tradeErrorShow: (data) => {
    const tradeData = prepareTradeEventData(data);
    sendGTMEvent('trade', 'tradeErrorShow', {
      ...tradeData,
      message: data.message,
    });
  },
  tradePairSwap: ({ buyToken, sellToken }) => {
    sendGTMEvent('trade', 'tradePairSwap', {
      token_pair: `${buyToken.symbol}/${sellToken.symbol}`,
      buy_token: buyToken.symbol,
      sell_token: sellToken.symbol,
    });
  },
  tradePairChangeClick: ({ buyToken, sellToken }) => {
    sendGTMEvent('trade', 'tradePairChangeClick', {
      token_pair: `${buyToken.symbol}/${sellToken.symbol}`,
      buy_token: buyToken.symbol,
      sell_token: sellToken.symbol,
    });
  },
  tradePairChange: ({ buyToken, sellToken }) => {
    sendGTMEvent('trade', 'tradePairChange', {
      token_pair: `${buyToken.symbol}/${sellToken.symbol}`,
      buy_token: buyToken.symbol,
      sell_token: sellToken.symbol,
    });
  },
  tradeSettingsClick: ({ buyToken, sellToken }) => {
    sendGTMEvent('trade', 'tradeSettingsClick', {
      token_pair: `${buyToken.symbol}/${sellToken.symbol}`,
      buy_token: buyToken.symbol,
      sell_token: sellToken.symbol,
    });
  },
  tradeSettingsSlippageToleranceChange: ({
    tolerance,
    buyToken,
    sellToken,
  }) => {
    sendGTMEvent('trade', 'tradeSettingsSlippageToleranceChange', {
      trade_settings_slippage_tolerance: tolerance,
      token_pair: `${buyToken.symbol}/${sellToken.symbol}`,
      buy_token: buyToken.symbol,
      sell_token: sellToken.symbol,
    });
  },
  tradeSettingsTransactionExpirationTimeChange: ({
    expirationTime,
    buyToken,
    sellToken,
  }) => {
    sendGTMEvent('trade', 'tradeSettingsTransactionExpirationTimeChange', {
      trade_settings_transaction_expiration_time: expirationTime,
      token_pair: `${buyToken.symbol}/${sellToken.symbol}`,
      buy_token: buyToken.symbol,
      sell_token: sellToken.symbol,
    });
  },
  tradeSettingsResetAllClick: ({ buyToken, sellToken }) => {
    sendGTMEvent('trade', 'tradeSettingsResetAllClick', {
      token_pair: `${buyToken.symbol}/${sellToken.symbol}`,
      buy_token: buyToken.symbol,
      sell_token: sellToken.symbol,
    });
  },
  tradeBuyPaySet: (data) => {
    const tradeData = prepareTradeEventData(data);
    sendGTMEvent('trade', 'tradeBuyPaySet', tradeData);
  },
  tradeSellPaySet: (data) => {
    const tradeData = prepareTradeEventData(data);
    sendGTMEvent('trade', 'tradeSellPaySet', tradeData);
  },
  tradeBuyReceiveSet: (data) => {
    const tradeData = prepareTradeEventData(data);
    sendGTMEvent('trade', 'tradeBuyReceiveSet', tradeData);
  },
  tradeSellReceiveSet: (data) => {
    const tradeData = prepareTradeEventData(data);
    sendGTMEvent('trade', 'tradeSellReceiveSet', tradeData);
  },
  tradeBuyClick: (data) => {
    const tradeData = prepareTradeEventData(data);
    sendGTMEvent('trade', 'tradeBuyClick', tradeData);
  },
  tradeSellClick: (data) => {
    const tradeData = prepareTradeEventData(data);
    sendGTMEvent('trade', 'tradeSellClick', tradeData);
  },
  tradeBuy: (data) => {
    const tradeData = prepareTradeEventData(data);
    sendGTMEvent('trade', 'tradeBuy', {
      ...tradeData,
      transaction_hash: data.transactionHash,
      blockchain_network: data.blockchainNetwork,
    });
  },
  tradeSell: (data) => {
    const tradeData = prepareTradeEventData(data);
    sendGTMEvent('trade', 'tradeSell', {
      ...tradeData,
      transaction_hash: data.transactionHash,
      blockchain_network: data.blockchainNetwork,
    });
  },
};

const prepareTradeEventData = (data: TradeEventType): TradeGTMEventType => {
  const { buy, buyToken, sellToken, valueUsd } = data;
  return {
    trade_direction: buy ? 'buy' : 'sell',
    token_pair: `${buyToken.symbol}/${sellToken.symbol}`,
    buy_token: buyToken.symbol,
    sell_token: sellToken.symbol,
    value_usd: valueUsd,
  };
};
