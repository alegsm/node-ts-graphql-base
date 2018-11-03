import {createTypeOrmConnection} from "../DB/createTypeOrmConnection";
import {User} from "../DB/entity/User";
import {redis} from "../REDIS/redis";
import {Connection} from "typeorm";
import {createForgotPasswordLink} from "./createForgotPasswordLink";
import request from "graphql-request";
import {changePasswordMutation, getLoginMutation} from "../GRAPHQL/graphQlRequests";

describe("Forgot passwords Links should work", ()=> {
    let userId = "";
    let connection: Connection;
    const newPassword = "newPassword";

    afterAll(async () => {
        await connection.close();
    });

    beforeAll(async () => {
        connection = await createTypeOrmConnection();
        const user = await User.create({
            email: "passwordLink@test.com",
            password: "12345678"
        }).save();
        userId = user.id;
    });

    it("Should create a working email link", async () => {
        const url  = await createForgotPasswordLink(process.env.TEST_HOST as string, userId, redis);
        const segments = url.split("/");
        const key = segments[segments.length - 1];

        const result: any = await request(
            process.env.TEST_HOST as string,
            changePasswordMutation(newPassword, key)
        );
        console.log(result);
        expect(result.changePassword).toBeTruthy();

        const token = await redis.get(key);
        expect(token).toBeNull();

        const loginResult: any = await await request(
            process.env.TEST_HOST as string,
            getLoginMutation("passwordLink@test.com", newPassword)
        );

        console.log(loginResult.login.errors);
        expect(loginResult.login.token).toBeDefined();
    });
});
