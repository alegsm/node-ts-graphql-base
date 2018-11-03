import {createConfirmEmailLink} from "./createConfirmEmailLink";
import {createTypeOrmConnection} from "../DB/createTypeOrmConnection";
import {User} from "../DB/entity/User";
import fetch from 'node-fetch';
import {redis} from "../REDIS/redis";
import {Connection} from "typeorm";

describe("Email Links should work", ()=> {
    let userId = "";
    let connection: Connection;

    afterAll(async () => {
        await connection.close();
    });

    beforeAll(async () => {
        connection = await createTypeOrmConnection();
        const user = await User.create({
            email: "emailTest@test.com",
            password: "12345678"
        }).save();
        userId = user.id;
    });

    it("Should create a working email link", async () => {
        const url  = await createConfirmEmailLink(process.env.TEST_HOST as string, userId, redis);
        const response = await fetch(url);
        const text = await response.text();
        expect(text).toEqual("ok");
        const user = await User.findOne({where: {id: userId}}) as User;
        expect(user.confirmed).toBeTruthy();
        const segments = url.split("/");
        const key = segments[segments.length - 1];
        redis.get(key, (_, result) => {
            expect(result).toBeNull();
        });

    });
});
