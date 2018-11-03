export const forgotPasswordMutation = (email: string) => `
    mutation {
        forgotPassword(email: "${email}")
    }
`;

export const getRegisterMutation = (email: string, password: string) => `
    mutation {
        register(email: "${email}", password: "${password}") {
            errors {
                path
                message
            }
            token
        }
    }
`;

export const getLoginMutation = (email: string, password: string) => `
    mutation {
        login(email: "${email}", password: "${password}") {
            errors {
                path
                message
            }
            token
        }
    }
`;

export const currentUserQuery = `
{
  currentUser {
    id
    email
  }
}
`;

export const changePasswordMutation = (password: string, key: string) => `
    mutation {
        changePassword(newPassword: "${password}", key: "${key}")
    }
    `;
