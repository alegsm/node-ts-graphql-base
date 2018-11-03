import request from "graphql-request";
import {getLoginMutation, getRegisterMutation} from "../../graphQlRequests";

const goodEmail = "loginTest@test.com";
const goodPassword = "asd";


describe("Login Tests", () => {

    it("Should Login an user", async () => {
        await request(
            process.env.TEST_HOST as string,
            getRegisterMutation(goodEmail, goodPassword)
        );

        const response: any = await request(
            process.env.TEST_HOST as string,
            getLoginMutation(goodEmail, goodPassword)
        );

        expect(response.login.token).toBeDefined();
    });
});
