import React from 'react';
import PropTypes from 'prop-types';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import CreateVoteMutation from '../../gql/mutations/CreateVoteMutation';
import { fetchQuery } from '../../Environment';

import { GC_USER_ID } from '../../constants';
import { timeDifferenceForDate } from '../../utils';

import './style.css';

class LinkCustom extends React.Component {
  constructor() {
    super();

    this.userCanVoteOnLink = this.userCanVoteOnLink.bind(this);
    this.voteForLink = this.voteForLink.bind(this);
  }

  async userCanVoteOnLink(userId, linkId) {
    const checkVoteQueryText = `
      query checkVoteQueryText($userId: ID!, $linkId: ID!) {
        viewer {
          allVotes(filter: {
            user: { id :$userId },
            link: { id: $linkId }
          }) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `;
    const checkVoteQuery = { text: checkVoteQueryText };

    const result =
      await fetchQuery(checkVoteQuery, { userId, linkId });
    return result.data.viewer.allVotes.edges.length === 0;
  }

  async voteForLink() {
    const userId = localStorage.getItem(GC_USER_ID);
    if (!userId) {
      console.log('You can\'t vote if you\'re not logged in.');
      return;
    }

    const linkId = this.props.link.id;
    const canUserVoteOnLink =
      await this.userCanVoteOnLink(userId, linkId);
    if (canUserVoteOnLink) {
      CreateVoteMutation(userId, linkId);
    } else {
      console.log('You\'ve already voted for this link.');
    }
  }

  render() {
    const userId = localStorage.getItem(GC_USER_ID);
    const {
      index,
      link,
    } = this.props;
    return (
      <div className="linkCustom">

        <div>
          <span>{index + 1}</span>
          {
            userId && (
              <button
                className="linkCustom__vote"
                onClick={this.voteForLink}
              >
                ▲
              </button>
            )
          }
        </div>

        <div>
          <div>
            {link.description} ({link.url})
          </div>
          <div>
            {link.votes.count} votes | by{' '}
            {
              link.postedBy ?
                link.postedBy.name :
                'Unknown'
            }
            {' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        </div>

      </div>
    );
  }
}

LinkCustom.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }),
  index: PropTypes.number,
};

export default createFragmentContainer(LinkCustom, graphql`
  fragment LinkCustom_link on Link {
    id
    description
    url
    createdAt
    postedBy {
      id
      name
    }
    votes {
      count
    }
  }
`);
