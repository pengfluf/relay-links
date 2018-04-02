import React from 'react';
import { QueryRenderer } from 'react-relay';

import environment from '../../Environment';
import LinkList from '../LinkList';
import LinkListPageQuery from '../../gql/queries/LinkListPageQuery';

/* eslint-disable react/prefer-stateless-function */
class LinkListPage extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={LinkListPageQuery}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return <LinkList viewer={props.viewer} />;
          }
          return <div>Loading...</div>;
        }}
      />
    );
  }
}

export default LinkListPage;
