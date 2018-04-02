import React from 'react';
import PropTypes from 'prop-types';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

class LinkCustom extends React.Component {
  constructor() {
    super();

    this.voteForLink = this.voteForLink.bind(this);
  }

  async voteForLink() {

  }

  render() {
    return (
      <div>
        <div>{this.props.link.description}</div>
        <div>{this.props.link.url}</div>
      </div>
    );
  }
}

LinkCustom.propTypes = {
  link: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default createFragmentContainer(LinkCustom, graphql`
  fragment LinkCustom_link on Link {
    id
    description
    url
  }
`);
