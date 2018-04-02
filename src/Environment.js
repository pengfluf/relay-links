import { SubscriptionClient } from 'subscriptions-transport-ws';
import {
  GC_AUTH_TOKEN,
  RELAY_API_URL,
  SUBSCRIPTION_URL,
} from './constants';

const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

const store = new Store(new RecordSource());

export const fetchQuery = (operation, variables) => fetch(RELAY_API_URL, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`,
  },
  body: JSON.stringify({
    query: operation.text,
    variables,
  }),
}).then((res) => res.json());

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text;

  const subscriptionClient = new SubscriptionClient(
    SUBSCRIPTION_URL,
    { reconnect: true }
  );

  const client = subscriptionClient
    .request({ query, variables })
    .subscribe({
      next: (result) => {
        observer.onNext({ data: result.data });
      },
      complete: () => {
        observer.onCompleted();
      },
      error: (error) => {
        observer.onError(error);
      },
    });

  return {
    dispose: client.unsubscribe,
  };
};

const network = Network.create(fetchQuery, setupSubscription);

const environment = new Environment({
  network,
  store,
});

export default environment;
