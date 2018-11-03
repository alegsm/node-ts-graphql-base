import * as bcrypt from "bcryptjs";
import {ResolverMap} from "../../graphql-utils";
import {GQL} from "../../../types/schema";
import {User} from "../../../DB/entity/User";
import {LoginErrors} from "../../../ERRORS/errorMessages";
import {createToken} from "../../../AUTH/authHandler";



const errorResponse = [
    {
        path: "email",
        message: LoginErrors.ERROR_BAD_CREDENTIALS
    }
];

export const resolvers: ResolverMap = {
    Query: {
        dummy2: () => "bye"
    },
    Mutation: {
        login: async (
            _,
            { email, password }: GQL.ILoginOnMutationArguments) => {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return {
                    errors: errorResponse
                };
            }

            const valid = await bcrypt.compare(password as string, user.password);

            if (!valid) {
                return {
                    errors: errorResponse
                };
            }

            const token = await createToken(user.id);
            return {
                token: token
            };

            return null;
        }
    }
};
