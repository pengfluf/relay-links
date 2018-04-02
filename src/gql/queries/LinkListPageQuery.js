import { graphql } from 'react-relay';

const LinkListPageQuery = graphql`
  query LinkListPageQuery(
    $count: Int!,
    $after: String
  ) {
    viewer {
      ...LinkList_viewer
    }
  }
`;

export default LinkListPageQuery;
