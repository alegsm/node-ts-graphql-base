import request from "graphql-request";
import {forgotPasswordMutation, getRegisterMutation} from "../../graphQlRequests";

const email = "forgotPaswordEmail@test.com";
const oldPassword = "jlkajoioiqwe";

describe("should get link and change password", () => {

    it("Should Login an user", async () => {
        await request(
            process.env.TEST_HOST as string,
            getRegisterMutation(email, oldPassword)
        );

        const result: any = await request(
            process.env.TEST_HOST as string,
            forgotPasswordMutation(email)
        );

        expect(result.forgotPassword).toBeTruthy();

    });
});
