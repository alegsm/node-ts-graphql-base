import request from "graphql-request";
import { User } from "../../../DB/entity/User";
import { RegisterErrors } from "../../../ERRORS/errorMessages";
import { createTypeOrmConnection } from "../../../DB/createTypeOrmConnection";
import { Connection } from "typeorm";
import { getRegisterMutation } from "../../graphQlRequests";

const goodEmail = "registerTest@test.com";
const goodPassword = "asd";

const badEmail = "t";
const badPassword = "a";

describe("Register should handle error cases", () => {
  let connection: Connection;

  afterAll(async () => {
    await connection.close();
  });

  beforeAll(async () => {
    connection = await createTypeOrmConnection();
  });

  it("Should register an user with valid params and encrypt password", async () => {
    const response: any = await request(
      process.env.TEST_HOST as string,
      getRegisterMutation(goodEmail, goodPassword)
    );
    console.log(response);
    expect(response.register.token).toBeDefined();
    const users = await User.find({ where: { email: goodEmail } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(goodEmail);
    expect(user.password).not.toEqual(goodPassword);
  });

  it("Should not register a duplicated user", async () => {
    const response: any = await request(
      process.env.TEST_HOST as string,
      getRegisterMutation(goodEmail, goodPassword)
    );
    expect(response.register.errors).toHaveLength(1);
    expect(response.register.errors[0]).toEqual({
      path: "email",
      message: RegisterErrors.ERROR_EMAIL_DUPLICATED
    });
  });

  it("Should not register a user with bad email", async () => {
    const response: any = await request(
      process.env.TEST_HOST as string,
      getRegisterMutation(badEmail, goodPassword)
    );
    expect(response.register.errors.length).toBeGreaterThan(1);
    expect(response.register.errors[0].path).toEqual("email");
  });

  it("Should not register a user with bad password", async () => {
    const response: any = await request(
      process.env.TEST_HOST as string,
      getRegisterMutation(goodEmail, badPassword)
    );
    expect(response.register.errors.length).toBeGreaterThan(0);
    expect(response.register.errors[0]).toEqual({
      path: "password",
      message: RegisterErrors.ERROR_PASSWORD_SHORT
    });
  });
});
