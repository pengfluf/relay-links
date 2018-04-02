import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation SignInUserMutation($input: SigninUserInput!) {
    signinUser(input: $input) {
      token
      user {
        id
      }
    }
  }
`;

export default (email, password, callback) => {
  const variables = {
    input: {
      email: {
        email,
        password,
      },
      clientMutationId: '',
    },
  };

  commitMutation(
    environment,
    {
      mutation,
      variables,

      onCompleted: (res) => {
        const { id } = res.signinUser.user;
        const { token } = res.signinUser;
        callback(id, token);
      },

      onError: (err) => console.error(err),
    },
  );
};
