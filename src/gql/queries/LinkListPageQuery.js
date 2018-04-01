import { graphql } from 'react-relay';

const LinkListPageQuery = graphql`
  query LinkListPageQuery {
    viewer {
      ...LinkList_viewer
    }
  }
`;

export default LinkListPageQuery;
