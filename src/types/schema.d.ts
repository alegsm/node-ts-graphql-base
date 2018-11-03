// tslint:disable
// graphql typescript definitions

export namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    currentUser: IUser | null;
    dummy2: string | null;
    dummy: string | null;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    email: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    login: IAuthResponse;
    register: IAuthResponse;
  }

  interface ILoginOnMutationArguments {
    email?: string | null;
    password?: string | null;
  }

  interface IRegisterOnMutationArguments {
    email?: string | null;
    password?: string | null;
  }

  interface IAuthResponse {
    __typename: 'AuthResponse';
    token: string | null;
    errors: Array<IError> | null;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }
}

// tslint:enable
