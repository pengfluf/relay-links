const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => fetch('https://api.graph.cool/relay/v1/cjfi3b6ti1ffb0174azb9oyiq', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: operation.text,
    variables,
  }),
}).then((res) => res.json()));

const environment = new Environment({
  network,
  store,
});

export default environment;
