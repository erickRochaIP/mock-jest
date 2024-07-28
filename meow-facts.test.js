const rewire = require("rewire");
const meowFacts = rewire("./meow-facts");

describe("meow-facts suite", () => {

    test("Returns a meow fact to lower case", async () => {
        const fact = await meowFacts.getMeowFact({ upperCase: false });

        expect(fact).toEqual(fact.toLowerCase());
    })

    test("Returns a meow fact to upper case", async () => {
        const fact = await meowFacts.getMeowFact({ upperCase: true });

        expect(fact).toEqual(fact.toUpperCase());
    })
})