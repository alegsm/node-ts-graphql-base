import {ResolverMap} from "../../graphql-utils";
import {User} from "../../../DB/entity/User";
import *as yup from "yup";
import {formatYupError} from "../../../ERRORS/formatYupError";
import {RegisterErrors} from "../../../ERRORS/errorMessages";
import {createConfirmEmailLink} from "../../../MAILING/createConfirmEmailLink";
import {GQL} from "../../../types/schema";
import {MailingHandler} from "../../../MAILING/mailingHandler";
import {createToken} from "../../../AUTH/authHandler";

const schema = yup.object().shape({
    email: yup.string().min(3, RegisterErrors.ERROR_EMAIL_SHORT).max(255).email(RegisterErrors.ERROR_EMAIL_INVALID),
    password: yup.string().min(3, RegisterErrors.ERROR_PASSWORD_SHORT).max(255),
});

export const resolvers: ResolverMap = {
    Query: {
        dummy: () => "dummy"
    },
    Mutation: {
        register: async (_, args: GQL.IRegisterOnMutationArguments, {redis, url}) => {
            try {
                await schema.validate(args, {abortEarly: false});
                const {email, password} = args;

                if(!email || !password) {
                    return {
                        errors: [{
                            path: "unexpected",
                            message: "unexpected error ALPHA"
                        }]
                    };
                }
                console.log('attempting to register ' + email);
                const userAlreadyExists = await User.findOne({where: {email: email}, select: ["id"]});
                if(userAlreadyExists) {
                    console.log('duplicated email');
                    return {
                        errors: [{
                            path: "email",
                            message: RegisterErrors.ERROR_EMAIL_DUPLICATED
                        }]
                    };
                }

                const user = User.create({
                    email: email,
                    password: password
                });

                await user.save();
                const link = await createConfirmEmailLink(url, user.id, redis);
                const token = await createToken(user.id);
                console.log('Link created');
                if(process.env.DISABLE_EMAIL_SEND !== "test" && process.env.ENABLE_EMAIL_SEND === "true")
                    await MailingHandler.sendConfirmationEmail(user.email, link);
                console.log('everything went well');
                return {
                    token: token
                };
            } catch (error) {
                console.log(error);
                return {
                    errors: formatYupError(error)
                };
            }
        }
    }
};
