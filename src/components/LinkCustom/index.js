import React from 'react';
import PropTypes from 'prop-types';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import CreateVoteMutation from '../../gql/mutations/CreateVoteMutation';
import { fetchQuery } from '../../Environment';

import { GC_USER_ID } from '../../constants';
import {
  timeDifferenceForDate,
  normalizeURL,
} from '../../utils';

import './style.css';

class LinkCustom extends React.Component {
  constructor() {
    super();

    this.state = {
      voteErrorShowed: false,
      voteErrorTimeout: 0,
    };

    this.userCanVoteOnLink = this.userCanVoteOnLink.bind(this);
    this.voteForLink = this.voteForLink.bind(this);
    this.setState = this.setState.bind(this);
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

  handleVoteError() {
    const {
      voteErrorTimeout,
    } = this.state;

    // We should be sure that the timer
    // isn't counting right now, because
    // we don't want to break it
    if (voteErrorTimeout === 0) {
      // Declare basic variables
      const initialTime = 3000;
      const timeStep = 1000;

      // Start recording the countdown
      // in the state and show the error
      this.setState({
        voteErrorTimeout: initialTime,
        voteErrorShowed: true,
      });

      // Every "timeStep" substract the "timeStep"
      // from the "voteErrorTimeout"
      const timerID = setInterval(() => {
        this.setState((prevState) => ({
          voteErrorTimeout: prevState.voteErrorTimeout - timeStep,
        }));
      }, timeStep);


      // Clear the interval and
      // hide the error
      setTimeout(() => {
        clearInterval(timerID);
        this.setState({
          voteErrorShowed: false,
        });
      }, initialTime);
    }
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
      this.handleVoteError();
    }
  }

  render() {
    const userId = localStorage.getItem(GC_USER_ID);
    const {
      link,
    } = this.props;
    const { voteErrorShowed } = this.state;
    return (
      <div className="linkCustom">
        <div className="linkCustom__votes">
          <div className="linkCustom__votes-count">
            {link.votes.count}
            {
              link.votes.count === 1 ?
                ' vote' : ' votes'
            }
          </div>
          {
            userId && (
              <button
                className="linkCustom__vote-button"
                onClick={this.voteForLink}
              >
                ▲
              </button>
            )
          }
          {
            voteErrorShowed && (
              <div className="linkCustom__vote-error">
                You have already voted for this link.
              </div>
            )
          }
        </div>

        <div className="linkCustom__content">
          <div className="linkCustom__info">
            <a
              href={normalizeURL(link.url)}
              className="linkCustom__description"
            >
              {link.description}
            </a>
            <a
              href={normalizeURL(link.url)}
              className="linkCustom__url"
            >
            ({link.url})
            </a>
          </div>
          <div className="linkCustom__author">
            by
            {' '}
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
