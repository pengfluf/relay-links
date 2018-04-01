import React from 'react';

import { handleChangeInput } from '../../utils';
import CreateLinkMutation from '../../gql/mutations/CreateLinkMutation';

class CreateLink extends React.Component {
  constructor() {
    super();

    this.state = {
      description: '',
      url: '',
    };

    this.setState = this.setState.bind(this);
    this.createLink = this.createLink.bind(this);
  }

  createLink() {
    const {
      description,
      url,
    } = this.state;

    CreateLinkMutation(
      description, url,
      () => console.log('Mutation completed')
    );
  }

  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div>
          <input
            value={description}
            onChange={(e) =>
              handleChangeInput('description', e.target.value, this.setState)
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            value={url}
            onChange={(e) =>
              handleChangeInput('url', e.target.value, this.setState)
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button onClick={this.createLink}>Post</button>
      </div>
    );
  }
}
export default CreateLink;
