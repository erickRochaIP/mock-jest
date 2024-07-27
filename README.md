# Exemplo prático de mocks no Jest
Este repositório contem um exemplo simples de uma aplicação que faz uso de mocks para auxiliar a criação de testes automatizados.

O objetivo é levar a um primeiro contato com o uso de mocks e demonstrar, de forma prática, as razões que levam a sua utilização.

A aplicação tem um objetivo bem simples: informar fatos aleatórios a respeito de gatos. Esses fatos são obtidos por meio da API [MeowFacts](https://github.com/wh-iterabb-it/meowfacts). As funções da aplicação possuem testes unitários localizados em `meow-facts.test.js`.

Neste documento iremos:

- Apresentar instruções de como executar a aplicação local.
- Descrever o funcionamento da aplicação, passando por todos os trechos de código.
- Propor tarefas, as quais envolvem:
  - Realizar uma alteração no código e verificar se os testes ainda passam.
  - Implementar mocks nos testes.

## Rodando a aplicação
A seguir, os passos para rodar a aplicação local.

1. No terminal, clone o repositório.

```
git clone https://github.com/erickRochaIP/mock-jest.git
```

2. É necessário ter o Node.js para rodar a aplicação. Caso não tenha, siga os passos [desta página](https://nodejs.org/en/download/).

3. No diretório do projeto, instale as dependências.

```
cd mock-jest
npm install
```

4. Rode a aplicação, e decubra um novo fato sobre gatos.

```
npm start
```

## Explicação do código
O arquivo principal da aplicação é o `index.js` com o seguinte conteúdo:

```js
const { getMeowFact } = require("./meow-facts");

run();

async function run(){
    console.log(await getMeowFact({ upperCase: true }));
}
```

Seu objetivo é importar a função `getMeowFact` e utilizar um `console.log` para imprimir o retorno dessa função no terminal. Ele usa como parâmetro `upperCase: true` para que o resultado seja convertido em letras maiúsculas

O arquivo `meow-facts.js` é responsável por manter as funções que geram fatos aleatórios sobre gatos. Essas funções são `requestMeowFact` e `getMeowFact`.

```js
function requestMeowFact() {
    return fetch("https://meowfacts.herokuapp.com/?count=1")
        .then(res => res.json())
}
```

`requestMeowFact` apenas realiza uma chamada a API e retorna seu conteúdo sem nenhum tratamento. Um exemplo de retorno dessa função é:

```json
{
    data: [
        "When well treated, a cat can live twenty or more years but the average life span of a domestic cat is 14 years."
    ]
}
```

A outra função, `getMeowFact`, tem o seguinte conteúdo:

```js
function getMeowFact({ upperCase = false }) {
    return requestMeowFact()
        .then(json => json.data)
        .then(data => data[0])
        .then(fact => upperCase ? fact.toUpperCase() : fact.toLowerCase());
}
```
Ela recebe como parâmetro uma opção que determina se o resultado deve ser convertido para letras maiúsculas ou minúsculas. Ao final, a função extrai a informação do retorno da API e faz a conversão de acordo com o parâmetro de entrada. No exemplo anterior, usando a opção `upperCase: true`, o resultado seria:

```js
"WHEN WELL TREATED, A CAT CAN LIVE TWENTY OR MORE YEARS BUT THE AVERAGE LIFE SPAN OF A DOMESTIC CAT IS 14 YEARS."
```

Por último, o arquivo `meow-facts.test.js` contém os testes unitários de `meow-facts.js`.

```js
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
```

A função `describe` serve para agrupar um conjunto testes relacionados. Cada `test` define um caso de uso que queremos testar. A função `expect(...).toEqual(...)` compara se os dois valores fornecidos são iguais. Caso não sejam, o teste é considerado falho e o jest informará o nome de todos os testes que falharam.

Portanto, nessa aplicação definimos dois casos de teste. No primeiro, queremos conferir se passar o parâmetro `upperCase: false` faz com que todas as letras estejam minúsculas. No segundo, queremos conferir se passar o parâmetro `upperCase: true` faz com que todas as letras estejam maiúsculas.

Para conferir se os testes estão passando, execute:

```
npm test
```

## Realizando alterações

Dentro de `index.js`, troque o parâmetro `upperCase` para `false` e execute `npm start`.

Perceba que o retorno é algo parecido com

```
when well treated, a cat can live twenty or more years but the average life span of a domestic cat is 14 years.
```

O parâmetro `upperCase: false` faz com que todas as letras sejam convertidas para minúsculas, inclusive as primeiras de cada frase. Suponha que queremos mudar esse comportamento, de forma que `upperCase: true` converta todas as letras para maiúsculas, mas `upperCase: false` mantenha a mensagem original, sem alterações. Então precisamos alterar a linha 10 de `meow-facts.js` para:

```js
.then(fact => upperCase ? fact.toUpperCase() : fact);
```

Execute a aplicação novamente e perceba que agora o comportamento está da forma que queremos. Porém, os testes ficaram desatualizados, portanto executar `npm test` deve falhar.