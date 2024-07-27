function requestMeowFact() {
    return fetch("https://meowfacts.herokuapp.com/?count=1")
        .then(res => res.json())
}

function getMeowFact({ upperCase = false }) {
    return requestMeowFact()
        .then(json => json.data)
        .then(data => data[0])
        .then(fact => upperCase ? fact.toUpperCase() : fact);
}

module.exports = { getMeowFact }