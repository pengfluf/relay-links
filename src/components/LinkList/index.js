import React from 'react';
import PropTypes from 'prop-types';

import {
  createPaginationContainer,
  graphql,
} from 'react-relay';
import NewVoteSubscription from '../../gql/subscriptions/NewVoteSubscription';

import { ITEMS_PER_PAGE } from '../../constants';

import LinkCustom from '../LinkCustom';

import './style.css';

class LinkList extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    NewVoteSubscription();
  }

  loadMore() {
    this.setState({ isLoading: true });
    if (!this.props.relay.hasMore()) {
      console.log('Nothing more to load');
      return;
    } else if (this.props.relay.isLoading()) {
      console.log('Request is already pending');
      return;
    }

    this.props.relay.loadMore(
      ITEMS_PER_PAGE,
      () => {
        this.setState({ isLoading: false });
      }
    );
  }

  render() {
    return (
      <div>
        <h2 className="section-title">
          Link List
        </h2>
        {
          this.props.viewer.allLinks.edges.map(({ node }) => (
            <LinkCustom
              key={node.__id}
              link={node}
            />
          ))
        }
        {
          this.props.relay.hasMore() ?
            <button
              onClick={this.loadMore}
              className="btn btn--loadmore"
            >
              {
                this.state.isLoading ?
                  'Loading...'
                  :
                  'Load More'
              }
            </button>
            :
            null
        }
      </div>
    );
  }
}

LinkList.propTypes = {
  viewer: PropTypes.shape({
    allLinks: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  relay: PropTypes.shape({
    hasMore: PropTypes.func,
    isLoading: PropTypes.func,
    loadMore: PropTypes.func,
  }),
};

export default createPaginationContainer(
  LinkList,
  {
    viewer: graphql`
      fragment LinkList_viewer on Viewer {
        allLinks(
          first: $count,
          after: $after,
          orderBy: createdAt_DESC
        ) @connection(key: "LinkList_allLinks") {
          edges {
            node {
              ...LinkCustom_link
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  },
  {
    direction: 'forward',

    query: graphql`
    query LinkListForwardQuery(
      $count: Int!,
      $after: String,
    ) {
      viewer {
        ...LinkList_viewer
      }
    }
  `,

    getConnectionFromProps(props) {
      return props.viewer && props.viewer.allLinks;
    },

    getFragmentVariables(previousVariables, totalCount) {
      return {
        ...previousVariables,
        count: totalCount,
      };
    },

    getVariables(props, paginationInfo) {
      return {
        count: paginationInfo.count,
        after: paginationInfo.cursor,
      };
    },
  }
);
