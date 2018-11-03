import fetch from "node-fetch";

describe('Confirm email test', () => {

    it("Should send invalid when bad key", async () => {
        const response = await fetch(`${process.env.TEST_HOST}/confirm/errorparam`);
        const text = await response.text();
        expect(text).toEqual("invalid");
    });

});
