import axios from "axios";
import {User} from "../../../DB/entity/User";
import {currentUserQuery, getRegisterMutation} from "../../graphQlRequests";

const email = "bob5@bob.com";
const password = "jlkajoioiqwe";

describe("should get token in login and get user from token", () => {

    test("get current user", async () => {
        const {data}: any = await axios.post(
            process.env.TEST_HOST as string,
            {
                query: getRegisterMutation(email, password)
            },
        );

        const token = data.data.register.token;
        expect(token).toBeDefined();

        const response = await axios.post(
            process.env.TEST_HOST as string,
            {
                query: currentUserQuery
            },
            {
                headers: {
                    Authorization: token
                }
            }
        );
        const user: User = response.data.data.currentUser;
        expect(user.email).toBe(email);
    });
});
