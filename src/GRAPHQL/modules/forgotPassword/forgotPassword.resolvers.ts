import {ResolverMap} from "../../graphql-utils";
import {User} from "../../../DB/entity/User";
import {createForgotPasswordLink} from "../../../MAILING/createForgotPasswordLink";
import {MailingHandler} from "../../../MAILING/mailingHandler";
import * as bcrypt from "bcryptjs";

export const resolvers: ResolverMap = {
    Query: {
        dummy3: () => "bye"
    },
    Mutation: {
        forgotPassword: async (
            _,
            { email }: any, { redis, url }) => {

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return false;
            }

            const link = await createForgotPasswordLink(url, user.email, redis);

            if(process.env.DISABLE_EMAIL_SEND !== "test" && process.env.ENABLE_EMAIL_SEND === "true")
                await MailingHandler.sendForgotPasswordEmail(user.email, link);

            return true;
        },

        changePassword: async (_, { newPassword, key } : any, {redis} ) => {

            const userId = await redis.get(key);

            if(!userId) {
                return false;
            }

            const user = await User.findOne({where: {id: userId}});

            if (!user) {
                return false;
            }

            const hashPassword = await bcrypt.hash(newPassword, 10);
            await User.update({id: userId},{password: hashPassword});

            await redis.del(key);
            return true;
        }
    }
};
