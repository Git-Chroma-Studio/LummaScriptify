"use strict";

// #region Classes
class Cookie {

    constructor() { }

    /**
     * Define um cookie.
     * @param {string} name - Nome do cookie.
     * @param {string} value - Valor do cookie.
     * @param {Object} options - Opções do cookie (session, days, secure).
     * @param {boolean} [options.session] - Se true, o cookie será de sessão.
     * @param {number} [options.days] - Duração do cookie em dias.
     * @param {boolean} [options.secure] - Se true, o cookie será seguro (HTTPS).
     */
    Set(name, value, options = {}) {
        let expires = "";

        if (options.days && !options.session) {
            const date = new Date();
            date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`;
        } else if (options.session) {
            expires = `; expires=Session`;
        }

        const secure = options.secure ? "; Secure" : "";

        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value || "")}${expires}; path=/${secure}`;
    }

    /**
     * Obtém o valor de um cookie.
     * @param {string} name - Nome do cookie.
     * @returns {string | null} - Valor do cookie ou null se não existir.
     */
    Get(name) {
        const nameEQ = `${encodeURIComponent(name)}=`;
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
            }
        }

        return null;
    }

    /**
     * Obtém todos os cookies.
     * @returns {Array<{ key: string, value: string }>} - Array de objetos com chave e valor dos cookies.
     */
    GetAll() {
        return document.cookie.split(";").filter((cookie) => !cookie.isNullOrWhiteSpace())
            .map((cookie) => {
                const [name, ...valParts] = cookie.trim().split("=");
                const value = valParts.join("=");
                return { key: decodeURIComponent(name), value: decodeURIComponent(value) };
            });
    }

    /**
     * Remove um cookie.
     * @param {string} name - Nome do cookie.
     */
    Erase(name) {
        this.Set(name, "", { days: -1 });
    }

    /**
     * Remove todos os cookies.
     * @returns {Promise<boolean>} - Promise que resolve com true se todos os cookies foram removidos.
     */
    Clear() {
        return new Promise((resolve, reject) => {
            try {
                const cookies = document.cookie.split(";");

                for (let cookie of cookies) {
                    const eqPos = cookie.indexOf("=");
                    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
                    this.Erase(name);
                }
                resolve(true);
            } catch (error) {
                console.log("Clear error: ", error);
                reject(false);
            }
        });
    }
}
// #endregion

// #region Functions
/**
 * Serializa um formulário HTML para um objeto JSON.
 * @param {string} html - Seletor do formulário.
 * @returns {Object} - Objeto JSON com os dados do formulário.
 */
function serializeJson(html) {
    const formData = {};
    const form = document.querySelector(html);

    Array.from(form.elements).forEach(element => {
        if (!element.name || element.disabled) return;

        switch (element.type) {
            case "checkbox":
                if (!formData[element.name]) {
                    formData[element.name] = [];
                }
                if (element.checked) {
                    formData[element.name].push(element.value || true);
                }
                break;
            case "radio":
                if (element.checked) {
                    formData[element.name] = element.value;
                }
                break;
            case "select-multiple":
                formData[element.name] = Array.from(element.selectedOptions).map(option => option.value);
                break;
            case "file":
                formData[element.name] = Array.from(element.files);
                break;
            default:
                if (formData[element.name]) {
                    if (!Array.isArray(formData[element.name])) {
                        formData[element.name] = [formData[element.name]];
                    }
                    formData[element.name].push(element.value.trim());
                } else {
                    formData[element.name] = element.value.trim();
                }
        }
    });

    return formData;
}

/**
 * Serializa um formulário HTML para um objeto JSON complexo.
 * @param {string} html - Seletor do formulário.
 * @returns {Object} - Objeto JSON complexo com os dados do formulário.
 */
function serializeJsonComplex(html) {
    const formData = {};
    const form = document.querySelector(html);

    Array.from(form.elements).forEach(element => {
        if (!element.name || element.disabled) return;

        let value;
        switch (element.type) {
            case "checkbox":
                value = element.checked ? element.value || true : false; // Inclui false se não marcado
                break;
            case "radio":
                value = element.checked ? element.value : undefined;
                break;
            case "select-multiple":
                value = Array.from(element.selectedOptions).map(option => option.value);
                break;
            case "file":
                value = Array.from(element.files);
                break;
            default:
                value = element.value.trim();
        }

        // Divide o nome do campo em partes (ex: "pessoa.nome" => ["pessoa", "nome"])
        const keys = element.name.match(/[^[\].]+/g); // Suporta "." e "[]" como separadores
        let current = formData;

        keys.forEach((key, index) => {
            const isArrayIndex = /^\d+$/.test(keys[index + 1]); // Verifica se a próxima chave é um índice numérico

            if (index === keys.length - 1) {
                // Última chave: define o valor
                if (Array.isArray(current[key])) {
                    current[key].push(value);
                } else if (current[key] !== undefined) {
                    current[key] = [current[key], value].flat(); // Transforma em array se necessário
                } else {
                    current[key] = value;
                }
            } else {
                // Chave intermediária: cria o objeto ou array se não existir
                if (!current[key]) {
                    current[key] = isArrayIndex ? [] : {};
                }
                current = current[key];
            }
        });
    });

    return formData;
}

/**
 * Converte uma string para booleano.
 * @param {string} str - String a ser convertida.
 * @returns {boolean|null} - Valor booleano ou null se a string não for válida.
 */
function parseBool(str) {
    if (typeof str === "string") {
        str = str.trim().toLowerCase();
        if (str === "true" || str === "1") return true;
        if (str === "false" || str === "0") return false;
    }
    return null;
}

/**
 * Gera um UUID (Identificador Único Universal).
 * @returns {string} - UUID gerado.
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Gera uma string aleatória.
 * @param {number} [length=10] - Tamanho da string.
 * @returns {string} - String aleatória.
 */
function getString(length = 10) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

/**
 * Soma os valores de uma propriedade CSS (height ou width) de elementos selecionados.
 * @param {string} [propriedade='height'] - Propriedade CSS a ser somada ('height' ou 'width').
 * @param {...string} seletores - Seletores dos elementos.
 * @returns {number} - Soma dos valores da propriedade.
 */
function sumElements(propriedade = 'height', ...seletores) {
    let soma = 0;

    // Verifica se a propriedade é 'height' ou 'width'
    if (propriedade !== 'height' && propriedade !== 'width') {
        throw new Error("Propriedade inválida. Use 'height' ou 'width'.");
    }

    seletores.forEach(seletor => {
        // Seleciona todos os elementos que correspondem ao seletor
        const elementos = document.querySelectorAll(seletor);

        elementos.forEach(elemento => {
            // Obtém o valor da propriedade (height ou width) do elemento e converte para número
            const valor = parseFloat(window.getComputedStyle(elemento)[propriedade]);
            soma += valor;
        });
    });

    return soma;
}

/**
 * Compara duas datas.
 * @param {string|Date} inicial - Data inicial.
 * @param {string|Date} dtFinal - Data final.
 * @returns {Object} - Objeto com os resultados da comparação.
 * @property {boolean} isBefore - True se a data inicial for anterior à final.
 * @property {boolean} isSame - True se as datas forem iguais.
 */
function compareDates(inicial, dtFinal) {
    // Converte as datas para objetos Date e remove os segundos
    const Dinicial = new Date(inicial);
    Dinicial.setSeconds(0, 0); // Remove segundos e milissegundos

    const Dfinal = new Date(dtFinal);
    Dfinal.setSeconds(0, 0); // Remove segundos e milissegundos

    // Valida se as datas são válidas
    if (isNaN(Dinicial.getTime()) || isNaN(Dfinal.getTime())) {
        throw new Error("Datas inválidas fornecidas.");
    }

    // Retorna um objeto com os resultados das comparações
    return {
        isBefore: Dinicial < Dfinal, // Verifica se a data inicial é anterior à final
        isSame: Dinicial.getTime() === Dfinal.getTime(), // Verifica se as datas são iguais
    };
};

/**
 * Obtém os atributos data-* de um elemento HTML.
 * @param {string} html - Seletor do elemento.
 * @returns {Object} - Objeto com os atributos data-*.
 */
function getData(html) {
    const informacoes = {};
    const item = document.querySelector(html)

    // Itera sobre os atributos do elemento
    Array.from(item.attributes).forEach(attr => {
        if (attr.name.startsWith("data-")) {
            // Remove o prefixo "data-" e converte o nome para camelCase
            const nomeCampo = attr.name
                .slice(5) // Remove "data-"
                .split('-') // Divide por hífen
                .map((part, index) => {
                    if (index === 0) {
                        return part; // Mantém a primeira parte em minúsculas
                    }
                    return part.charAt(0).toUpperCase() + part.slice(1); // Converte para camelCase
                })
                .join(''); // Junta as partes

            // Adiciona o valor ao objeto de informações
            informacoes[nomeCampo] = attr.value;
        }
    });

    return informacoes;
}

/**
 * Pausa a execução por um determinado tempo.
 * @param {number} ms - Tempo em milissegundos.
 * @returns {Promise<void>} - Promise que resolve após o tempo especificado.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Preenche um formulário com dados.
 * @param {string} formulario - Seletor do formulário.
 * @param {Object} data - Dados para preencher o formulário.
 */
function populate(formulario, data) {
    const frm = document.querySelector(formulario);
    // Reseta o formulário
    frm.reset();

    // Itera sobre as chaves e valores do objeto de dados
    Object.entries(data).forEach(([key, value]) => {
        // Seleciona o controle do formulário com o nome correspondente
        const ctrls = frm.querySelectorAll(`[name="${key}"]`);

        ctrls.forEach(ctrl => {
            // Verifica o tipo do controle
            switch (ctrl.type) {
                case "radio":
                    // Marca o radio button se o valor corresponder
                    if (parseBool(ctrl.value) === value) {
                        ctrl.checked = true;
                    }
                    break;
                case "checkbox":
                    // Marca ou desmarca o checkbox com base no valor
                    ctrl.checked = value;
                    break;
                case "select-one": // <select> com uma única seleção
                case "select-multiple": // <select> com múltiplas seleções
                    // Define o valor selecionado do <select>
                    if (ctrl.type === "select-one") {
                        ctrl.value = value; // Define o valor selecionado
                    } else if (ctrl.type === "select-multiple" && Array.isArray(value)) {
                        // Para <select multiple>, marca as opções correspondentes
                        Array.from(ctrl.options).forEach(option => {
                            option.selected = value.includes(option.value);
                        });
                    }
                    break;
                default:
                    // Define o valor para outros tipos de controle
                    ctrl.value = value;
            }
        });
    });
}

/**
 * Verifica se uma string é um elemento HTML válido.
 * @param {string} str - String a ser verificada.
 * @returns {boolean} - True se a string for um elemento HTML válido.
 */
function isHTMLElement(str) {
    const temp = document.createElement('div');
    temp.innerHTML = str.trim();
    return temp.firstChild && temp.firstChild.nodeType === 1;
}

/**
 * Converte uma data URL para um Blob.
 * @param {string} dataURL - Data URL a ser convertida.
 * @returns {Blob} - Blob gerado.
 */
function dataURLToBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
}

/**
 * Converte uma string base64 para um Blob.
 * @param {string} base64 - String base64 a ser convertida.
 * @param {string} mimeType - Tipo MIME do Blob.
 * @returns {Blob} - Blob gerado.
 */
function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64); // Decodifica a string base64
    const byteNumbers = new Array(byteCharacters.length);

    // Converte cada caractere em um código de ponto de byte
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // Converte o array de números em um array de bytes
    const byteArray = new Uint8Array(byteNumbers);

    // Cria um Blob a partir do array de bytes
    return new Blob([byteArray], { type: mimeType });
}

/**
 * Verifica se uma cor hexadecimal é clara ou escura.
 * @param {string} hex - Cor hexadecimal.
 * @returns {string} - '#fff' se a cor for escura, '#000' se for clara.
 */
function isLightOrDark(hex) {
    /**
     * @param {string} rgb
     */
    function isLightOrDarkRGB(rgb) {
        const [r, g, b] = rgb.replace(/rgb|\(|\)|\s/g, '').split(',').map(Number);

        const luminance = (0.299 * r) + (0.587 * g) + (0.114 * b);

        return luminance > 128 ? '#fff' : '#000';
    }

    /**
     * @param {string} hex
     */
    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }

    const rgb = hexToRgb(hex);
    return isLightOrDarkRGB(rgb);
}

/**
 * Verifica se um valor é um objeto.
 * @param {*} value - Valor a ser verificado.
 * @returns {boolean} - True se o valor for um objeto.
 */
function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
};

/**
 * Gera um número aleatório entre um mínimo e um máximo.
 * @param {number} min - Valor mínimo.
 * @param {number} max - Valor máximo.
 * @returns {number} - Número aleatório gerado.
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
// #endregion

// 📌 **Exportação para ESModules (ESM)**
export {
    Cookie,
    serializeJson,
    serializeJsonComplex,
    parseBool,
    uuid,
    getString,
    sumElements,
    compareDates,
    getData,
    sleep,
    populate,
    isHTMLElement,
    dataURLToBlob,
    base64ToBlob,
    isLightOrDark,
    isObject,
    getRandom
};

// 📌 **Exportação para CommonJS (Node.js)**
if (typeof module !== "undefined" && typeof exports !== "undefined") {
    module.exports = {
        Cookie,
        serializeJson,
        serializeJsonComplex,
        parseBool,
        uuid,
        getString,
        sumElements,
        compareDates,
        getData,
        sleep,
        populate,
        isHTMLElement,
        dataURLToBlob,
        base64ToBlob,
        isLightOrDark,
        isObject,
        getRandom
    };
}

// 📌 **Exportação para Uso no Navegador (CDN)**
if (typeof window !== "undefined") {
    window.LummaScriptify = {
        Cookie,
        serializeJson,
        serializeJsonComplex,
        parseBool,
        uuid,
        getString,
        sumElements,
        compareDates,
        getData,
        sleep,
        populate,
        isHTMLElement,
        dataURLToBlob,
        base64ToBlob,
        isLightOrDark,
        isObject,
        getRandom
    };
}
