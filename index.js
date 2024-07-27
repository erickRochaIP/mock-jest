const { getMeowFact } = require("./meow-facts");

run();

async function run(){
    console.log(await getMeowFact({ upperCase: false }));
}
