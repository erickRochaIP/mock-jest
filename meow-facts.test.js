const rewire = require("rewire");
const meowFacts = rewire("./meow-facts");

const meowFactMocked = "When well treated, a cat can live twenty or more years but the average life span of a domestic cat is 14 years.";

const requestMeowFactMock = jest.fn(() => Promise.resolve({
    data: [meowFactMocked]
}));
meowFacts.__set__('requestMeowFact', requestMeowFactMock);

describe("meow-facts suite", () => {

    test("Returns a meow fact to lower case", async () => {
        const fact = await meowFacts.getMeowFact({ upperCase: false });

        expect(fact).toEqual(meowFactMocked);
    })

    test("Returns a meow fact to upper case", async () => {
        const fact = await meowFacts.getMeowFact({ upperCase: true });

        expect(fact).toEqual(meowFactMocked.toUpperCase());
    })
})