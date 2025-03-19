# Documentação da Biblioteca `LummaScriptify`

A biblioteca **LummaScriptify** é uma coleção de utilitários JavaScript que estende funcionalidades nativas de tipos como `Number`, `String`, `Array`, `Date` e `Object`, além de fornecer funções úteis para manipulação de formulários, cookies, datas, strings, entre outros. Ela foi projetada para simplificar tarefas comuns no desenvolvimento web.

## Instalação

### Via NPM
Para instalar a biblioteca via NPM, execute o seguinte comando:

```bash
npm install lummascriptify
```

Após a instalação, você pode importar a biblioteca em seu projeto:

```javascript
import 'lummascriptify';
```

### Via CDN
Para usar a biblioteca diretamente no navegador, adicione o seguinte script no seu HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/lummascriptify/dist/lummascriptify.min.js"></script>
```

## Licença de Uso

A biblioteca **LummaScriptify** está licenciada sob a **Licença LummaScriptify Proprietária**.  
**Permissões:**  
- Uso pessoal e em projetos internos.  
- Modificação do código para uso pessoal.  

**Restrições:**  
- Distribuição pública ou comercial sem autorização expressa.  
- Uso em projetos de terceiros sem licença válida.  

Para obter uma licença comercial, entre em contato: [oseias.d.gomes@gmail.com](mailto:oseias.d.gomes@gmail.com).

## Funcionalidades

A biblioteca é dividida em várias categorias de utilitários. Abaixo estão as principais funcionalidades:

### Extensões para `Number`

#### `toMoney(currency = false)`
Formata um número como moeda ou decimal.

**Parâmetros:**
- `currency` (boolean): Se `true`, formata como moeda. Padrão: `false`.

**Retorno:**
- `string`: Número formatado.

**Exemplo:**
```javascript
(1234.56).toMoney(); // "1.234,56"
(1234.56).toMoney(true); // "R$ 1.234,56"
```

#### `toRound(precision = 0)`
Arredonda um número com base na precisão especificada.

**Parâmetros:**
- `precision` (number): Precisão do arredondamento (0: padrão, 1: floor, 2: ceil). Padrão: `0`.

**Retorno:**
- `number`: Número arredondado.

**Exemplo:**
```javascript
(123.456).toRound(); // 123
(123.456).toRound(1); // 123 (floor)
(123.456).toRound(2); // 124 (ceil)
```

#### `decimalPrecision(precision = 2)`
Define a precisão decimal de um número.

**Parâmetros:**
- `precision` (number): Número de casas decimais. Padrão: `2`.

**Retorno:**
- `number`: Número com a precisão definida.

**Exemplo:**
```javascript
(123.456789).decimalPrecision(2); // 123.46
```

---

### Extensões para `Array`

#### `divide(divisao)`
Divide um array em subarrays de tamanho especificado.

**Parâmetros:**
- `divisao` (number): Tamanho de cada subarray.

**Retorno:**
- `Array<Array>`: Array de subarrays.

**Exemplo:**
```javascript
[1, 2, 3, 4, 5, 6].divide(2); // [[1, 2], [3, 4], [5, 6]]
```

---

### Extensões para `Date`

#### `toDefault(showTime = true, base = 'às')`
Formata uma data para o padrão brasileiro.

**Parâmetros:**
- `showTime` (boolean): Se `true`, inclui a hora. Padrão: `true`.
- `base` (string): Texto base para separar data e hora. Padrão: `'às'`.

**Retorno:**
- `string`: Data formatada.

**Exemplo:**
```javascript
new Date().toDefault(); // "01/01/2023 às 12:00"
new Date().toDefault(false); // "01/01/2023"
```

---

### Extensões para `String`

#### `parseBool()`
Converte uma string para booleano.

**Retorno:**
- `boolean | null`: Valor booleano ou `null` se a string não for válida.

**Exemplo:**
```javascript
"true".parseBool(); // true
"false".parseBool(); // false
```

#### `toTitleCase(sigla = false, tamanho = 3)`
Converte uma string para o formato de título.

**Parâmetros:**
- `sigla` (boolean): Se `true`, mantém siglas em maiúsculas. Padrão: `false`.
- `tamanho` (number): Tamanho mínimo para considerar uma sigla. Padrão: `3`.

**Retorno:**
- `string`: String formatada como título.

**Exemplo:**
```javascript
"hello world".toTitleCase(); // "Hello World"
"NASA".toTitleCase(true); // "NASA"
```

#### `isNullOrEmpty()`
Verifica se a string é nula ou vazia.

**Retorno:**
- `boolean`: `true` se a string for nula ou vazia.

**Exemplo:**
```javascript
"".isNullOrEmpty(); // true
"hello".isNullOrEmpty(); // false
```

#### `isValidDocument(tipo)`
Valida um documento (CPF, CNPJ, RG, CNH).

**Parâmetros:**
- `tipo` (string): Tipo de documento (`'cpf'`, `'cnpj'`, `'rg'`, `'cnh'`).

**Retorno:**
- `boolean`: `true` se o documento for válido.

**Exemplo:**
```javascript
"123.456.789-09".isValidDocument('cpf'); // true
```

#### `formatDocument(tipo)`
Formata um documento (CPF, CNPJ, RG, CNH, telefone).

**Parâmetros:**
- `tipo` (string): Tipo de documento (`'cpf'`, `'cnpj'`, `'rg'`, `'cnh'`, `'telefone'`).

**Retorno:**
- `string`: Documento formatado.

**Exemplo:**
```javascript
"12345678909".formatDocument('cpf'); // "123.456.789-09"
```

---

### Extensões para `Object`

#### `isNullOrEmpty()`
Verifica se um objeto é nulo ou vazio.

**Retorno:**
- `boolean`: `true` se o objeto for nulo ou vazio.

**Exemplo:**
```javascript
({}).isNullOrEmpty(); // true
({ key: 'value' }).isNullOrEmpty(); // false
```

#### `atributosVazios()`
Verifica se todos os atributos de um objeto estão vazios.

**Retorno:**
- `boolean`: `true` se todos os atributos estiverem vazios.

**Exemplo:**
```javascript
({ key: '' }).atributosVazios(); // true
```

#### `atributosPreenchidos()`
Verifica se todos os atributos de um objeto estão preenchidos.

**Retorno:**
- `boolean`: `true` se todos os atributos estiverem preenchidos.

**Exemplo:**
```javascript
({ key: 'value' }).atributosPreenchidos(); // true
```

---

### Funções Globais

#### `serializeJson(html)`
Serializa um formulário HTML para um objeto JSON.

**Parâmetros:**
- `html` (string): Seletor do formulário.

**Retorno:**
- `Object`: Objeto JSON com os dados do formulário.

**Exemplo:**
```javascript
const formData = serializeJson('#meuFormulario');
```

#### `serializeJsonComplex(html)`
Serializa um formulário HTML para um objeto JSON complexo.

**Parâmetros:**
- `html` (string): Seletor do formulário.

**Retorno:**
- `Object`: Objeto JSON complexo com os dados do formulário.

**Exemplo:**
```javascript
const formData = serializeJsonComplex('#meuFormulario');
```

#### `parseBool(str)`
Converte uma string para booleano.

**Parâmetros:**
- `str` (string): String a ser convertida.

**Retorno:**
- `boolean | null`: Valor booleano ou `null` se a string não for válida.

**Exemplo:**
```javascript
parseBool("true"); // true
```

#### `uuid()`
Gera um UUID (Identificador Único Universal).

**Retorno:**
- `string`: UUID gerado.

**Exemplo:**
```javascript
uuid(); // "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
```

#### `getString(length = 10)`
Gera uma string aleatória.

**Parâmetros:**
- `length` (number): Tamanho da string. Padrão: `10`.

**Retorno:**
- `string`: String aleatória.

**Exemplo:**
```javascript
getString(5); // "aBc12"
```

#### `sumElements(propriedade = 'height', ...seletores)`
Soma os valores de uma propriedade CSS (height ou width) de elementos selecionados.

**Parâmetros:**
- `propriedade` (string): Propriedade CSS a ser somada (`'height'` ou `'width'`). Padrão: `'height'`.
- `seletores` (string): Seletores dos elementos.

**Retorno:**
- `number`: Soma dos valores da propriedade.

**Exemplo:**
```javascript
sumElements('height', '.minhaClasse'); // 300
```

#### `compareDates(inicial, dtFinal)`
Compara duas datas.

**Parâmetros:**
- `inicial` (string | Date): Data inicial.
- `dtFinal` (string | Date): Data final.

**Retorno:**
- `Object`: Objeto com os resultados da comparação.
  - `isBefore` (boolean): `true` se a data inicial for anterior à final.
  - `isSame` (boolean): `true` se as datas forem iguais.

**Exemplo:**
```javascript
compareDates('2023-01-01', '2023-12-31'); // { isBefore: true, isSame: false }
```

#### `getData(html)`
Obtém os atributos `data-*` de um elemento HTML.

**Parâmetros:**
- `html` (string): Seletor do elemento.

**Retorno:**
- `Object`: Objeto com os atributos `data-*`.

**Exemplo:**
```javascript
const data = getData('#meuElemento');
```

#### `sleep(ms)`
Pausa a execução por um determinado tempo.

**Parâmetros:**
- `ms` (number): Tempo em milissegundos.

**Retorno:**
- `Promise`: Promise que resolve após o tempo especificado.

**Exemplo:**
```javascript
await sleep(1000); // Pausa por 1 segundo
```

#### `populate(formulario, data)`
Preenche um formulário com dados.

**Parâmetros:**
- `formulario` (string): Seletor do formulário.
- `data` (Object): Dados para preencher o formulário.

**Exemplo:**
```javascript
populate('#meuFormulario', { nome: 'João', idade: 30 });
```

#### `isHTMLElement(str)`
Verifica se uma string é um elemento HTML válido.

**Parâmetros:**
- `str` (string): String a ser verificada.

**Retorno:**
- `boolean`: `true` se a string for um elemento HTML válido.

**Exemplo:**
```javascript
isHTMLElement('<div></div>'); // true
```

#### `dataURLToBlob(dataURL)`
Converte uma data URL para um Blob.

**Parâmetros:**
- `dataURL` (string): Data URL a ser convertida.

**Retorno:**
- `Blob`: Blob gerado.

**Exemplo:**
```javascript
const blob = dataURLToBlob('data:image/png;base64,...');
```

#### `base64ToBlob(base64, mimeType)`
Converte uma string base64 para um Blob.

**Parâmetros:**
- `base64` (string): String base64 a ser convertida.
- `mimeType` (string): Tipo MIME do Blob.

**Retorno:**
- `Blob`: Blob gerado.

**Exemplo:**
```javascript
const blob = base64ToBlob('base64string', 'image/png');
```

#### `isLightOrDark(hex)`
Verifica se uma cor hexadecimal é clara ou escura.

**Parâmetros:**
- `hex` (string): Cor hexadecimal.

**Retorno:**
- `string`: `'#fff'` se a cor for escura, `'#000'` se for clara.

**Exemplo:**
```javascript
isLightOrDark('#ffffff'); // '#000'
```

#### `isObject(value)`
Verifica se um valor é um objeto.

**Parâmetros:**
- `value` (any): Valor a ser verificado.

**Retorno:**
- `boolean`: `true` se o valor for um objeto.

**Exemplo:**
```javascript
isObject({}); // true
```

#### `getRandom(min, max)`
Gera um número aleatório entre um mínimo e um máximo.

**Parâmetros:**
- `min` (number): Valor mínimo.
- `max` (number): Valor máximo.

**Retorno:**
- `number`: Número aleatório gerado.

**Exemplo:**
```javascript
getRandom(1, 10); // 7
```
Aqui está a documentação completa para a classe **Cookie**, incluindo descrições detalhadas de cada método, parâmetros, retornos e exemplos de uso:

# Classe `Cookie`

A classe `Cookie` fornece métodos para manipulação de cookies no navegador. Ela permite definir, obter, remover e limpar cookies de forma simples e eficiente.


## Métodos

### `Set(name, value, options = {})`
Define um cookie com um nome, valor e opções configuráveis.

**Parâmetros:**
- `name` (string): Nome do cookie.
- `value` (string): Valor do cookie.
- `options` (object): Opções do cookie (opcional).  
  - `session` (boolean): Se `true`, o cookie será de sessão (expira ao fechar o navegador).  
  - `days` (number): Duração do cookie em dias.  
  - `secure` (boolean): Se `true`, o cookie será seguro (HTTPS apenas).  

**Exemplo:**
```javascript
Cookie.Set('username', 'Oséias', { days: 7, secure: true });
```

---

### `Get(name)`
Obtém o valor de um cookie pelo nome.

**Parâmetros:**
- `name` (string): Nome do cookie.

**Retorno:**
- `string | null`: Valor do cookie ou `null` se o cookie não existir.

**Exemplo:**
```javascript
const username = Cookie.Get('username'); // "Oséias"
```

---

### `GetAll()`
Obtém todos os cookies armazenados no navegador.

**Retorno:**
- `Array<{ key: string, value: string }>`: Array de objetos com chave e valor dos cookies.

**Exemplo:**
```javascript
const cookies = Cookie.GetAll();
console.log(cookies); // [{ key: 'username', value: 'Oséias' }, ...]
```

---

### `Erase(name)`
Remove um cookie pelo nome.

**Parâmetros:**
- `name` (string): Nome do cookie.

**Exemplo:**
```javascript
Cookie.Erase('username'); // Remove o cookie 'username'
```

---

### `Clear()`
Remove todos os cookies armazenados no navegador.

**Retorno:**
- `Promise<boolean>`: Promise que resolve com `true` se todos os cookies foram removidos.

**Exemplo:**
```javascript
Cookie.Clear().then(() => console.log('Todos os cookies foram removidos!'));
```

## Exemplos de Uso

### Definindo um Cookie
```javascript
// Define um cookie que expira em 7 dias
Cookie.Set('theme', 'dark', { days: 7 });

// Define um cookie de sessão (expira ao fechar o navegador)
Cookie.Set('session_id', '12345', { session: true });

// Define um cookie seguro (HTTPS apenas)
Cookie.Set('secure_token', 'abc123', { secure: true });
```

### Obtendo um Cookie
```javascript
const theme = Cookie.Get('theme'); // "dark"
const sessionId = Cookie.Get('session_id'); // "12345"
```

### Removendo um Cookie
```javascript
Cookie.Erase('theme'); // Remove o cookie 'theme'
```

### Removendo Todos os Cookies
```javascript
Cookie.Clear().then(() => {
    console.log('Todos os cookies foram removidos!');
});
```

### Obtendo Todos os Cookies
```javascript
const cookies = Cookie.GetAll();
cookies.forEach(cookie => {
    console.log(`${cookie.key}: ${cookie.value}`);
});
```

## Detalhes Técnicos

### Como os Cookies São Armazenados
- **Nome e Valor:** Codificados usando `encodeURIComponent` para garantir que caracteres especiais sejam tratados corretamente.
- **Expiração:** Se `days` for fornecido, o cookie expira após o número especificado de dias. Caso contrário, é um cookie de sessão.
- **Segurança:** Se `secure` for `true`, o cookie só será enviado em conexões HTTPS.

### Limitações
- **Tamanho Máximo:** Cookies têm um limite de tamanho de ~4KB por domínio.
- **Número Máximo:** A maioria dos navegadores permite ~50 cookies por domínio.

## Boas Práticas
1. **Use Cookies Seguros:** Sempre que possível, defina cookies como seguros (`secure: true`) para evitar que sejam enviados em conexões HTTP não criptografadas.
2. **Evite Armazenar Dados Sensíveis:** Cookies não são o local ideal para armazenar informações confidenciais, como senhas ou tokens de autenticação.
3. **Limpe Cookies Desnecessários:** Remova cookies que não são mais úteis para liberar espaço e melhorar a privacidade do usuário.

## Contribuição
Se você deseja contribuir para o desenvolvimento desta biblioteca, sinta-se à vontade para abrir issues ou pull requests no [repositório oficial](https://github.com/seu-repositorio/lummascriptify).

## Licença
Este projeto está licenciado sob a **Licença LummaScriptify Proprietária**.  
**Permissões:**  
- Uso pessoal e em projetos internos.  
- Modificação do código para uso pessoal.  

**Restrições:**  
- Distribuição pública ou comercial sem autorização expressa.  
- Uso em projetos de terceiros sem licença válida.  

Para obter uma licença comercial, entre em contato: [oseias.d.gomes@gmail.com](mailto:oseias.d.gomes@gmail.com).

### Licença Comercial
Se você precisa de uma licença que permita o uso fechado da LummaScriptify em projetos comerciais, entre em contato para obter uma licença comercial personalizada: [oseias.d.gomes@gmail.com](mailto:oseias.d.gomes@gmail.com).