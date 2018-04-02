import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation CreateUserMutation($createUserInput: SignupUserInput!, $signinUserInput: SigninUserInput!) {

    createUser(input: $createUserInput) {
      user {
        id
      }
    }

    signinUser(input: $signinUserInput) {
      token
      user {
        id
      }
    }

  }
`;

export default (name, email, password, callback) => {
  const variables = {
    createUserInput: {
      name,
      authProvider: {
        email: {
          email,
          password,
        },
      },
      clientMutationId: '',
    },

    signinUserInput: {
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
        const { id } = res.createUser.user;
        const { token } = res.signinUser;
        callback(id, token);
      },

      onError: (err) => console.error(err),
    }
  );
};
