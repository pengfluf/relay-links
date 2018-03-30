import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import Link from '../Link';

function LinkList(props) {
  return (
    <div>
      {
        props.viewer.allLinks.edges.map(({ node }) => (
          <Link
            key={node.__id}
            link={node}
          />
        ))
      }
    </div>
  );
}

export default createFragmentContainer(LinkList, graphql`
  fragment LinkList_viewer on Viewer {
    allLinks(last: 100, orderBy: createdAt_DESC) @connection(key: "LinkList_allLinks", filters: []) {
      edges {
        node {
          ...Link_link
        }
      }
    }
  }
`);
