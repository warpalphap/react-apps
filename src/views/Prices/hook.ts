import { subscribeToBinancePrice } from 'brokers';
import { useEffect, useState } from 'react';
import { Coin } from 'types';

import { symbols } from './symbols';

export function useHook() {
  const [list, setList] = useState<Map<string, Coin>>(new Map([]));
  useEffect(() => {
    const { socket } = subscribeToBinancePrice({
      symbols,
      onMessage(coin: Coin) {
        setList((state) => new Map([...state, [coin.symbol, coin]]));
      },
    });
    return () => {
      console.log(`=== Socket closed ${Date.now()}`);
      socket.close();
    };
  }, []);

  return {
    list: [...list.values()],
  };
}
