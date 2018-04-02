import React from 'react';
import PropTypes from 'prop-types';

import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import NewVoteSubscription from '../../gql/subscriptions/NewVoteSubscription';

import LinkCustom from '../LinkCustom';

class LinkList extends React.Component {
  componentDidMount() {
    NewVoteSubscription();
  }

  render() {
    return (
      <div>
        {
          this.props.viewer.allLinks.edges.map(({ node }, index) => (
            <LinkCustom
              key={node.__id}
              index={index}
              link={node}
            />
          ))
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
};

export default createFragmentContainer(LinkList, graphql`
  fragment LinkList_viewer on Viewer {
    allLinks(last: 100, orderBy: createdAt_DESC) @connection(key: "LinkList_allLinks", filters: []) {
      edges {
        node {
          ...LinkCustom_link
        }
      }
    }
  }
`);
