const calculatorController = require("../calculatorController");

describe("Calculator Controller", () => {
    it("should add two numbers", () => {
        const result = calculatorController.addNumbersSimple(1, 2);
        expect(result).toBe(3);
    });

    it("should subtract two numbers", () => {
        const result = calculatorController.subtractNumbers(1, 2);
        expect(result).toBe(-1);
    });
});
