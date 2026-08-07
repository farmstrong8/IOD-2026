const request = require("supertest");
const app = require("../app");

describe("Calculator Routes", () => {
    // generate some random numbers to test the calculator

    test("GET /calculator/add => sum of numbers", () => {
        const number1 = 1;
        const number2 = 2;
        return request(app)
            .get(`/calculator/add?num1=${number1}&num2=${number2}`)

            .expect("Content-Type", /json/)
            .expect(200)

            .then((response) => {
                expect(response.body).toEqual({
                    result: 3,
                });
            });
    });
});
