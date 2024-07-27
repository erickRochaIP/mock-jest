const { getMeowFact } = require("./meow-facts");

describe("meow-facts suite", () => {

    test("Returns a meow fact to lower case", async () => {
        const fact = await getMeowFact({ upperCase: false });

        expect(fact).toEqual(fact.toLowerCase());
    })

    test("Returns a meow fact to upper case", async () => {
        const fact = await getMeowFact({ upperCase: true });

        expect(fact).toEqual(fact.toUpperCase());
    })
})