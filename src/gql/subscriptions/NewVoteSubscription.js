import {
  graphql,
  requestSubscription,
} from 'react-relay';
import environment from '../../Environment';

const subscription = graphql`
  subscription NewVoteSubscription {
    Vote {
      node {
        id
        user {
          id
        }
        link {
          id
          _votesMeta {
            count
          }
        }
      }
    }
  }
`;

export default () => {
  const subscriptionConfig = {
    subscription,
    variables: {},

    updater: (proxyStore) => {
      const createVoteField = proxyStore.getRootField('Vote');
      const newVote = createVoteField.getLinkedRecord('node');
      const updatedLink = newVote.getLinkedRecord('link');
      const linkId = updatedLink.getValue('id');
      const newVotes = updatedLink.getLinkedRecord('_votesMeta');
      const newVoteCount = newVotes.getValue('count');

      const link = proxyStore.get(linkId);
      link
        .getLinkedRecord('votes')
        .setValue(newVoteCount, 'count');
    },

    onError: (err) => console.error(err),
  };

  requestSubscription(
    environment,
    subscriptionConfig,
  );
};
