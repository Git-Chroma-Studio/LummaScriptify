/**
 * LummaScriptify - Biblioteca de utilitários JavaScript
 * Copyright (C) 2023 Oséias Domingos Gomes
 *
 * Este programa é software livre: você pode redistribuí-lo e/ou modificar
 * sob os termos da GNU Affero General Public License conforme publicada
 * pela Free Software Foundation, seja a versão 3 da Licença, ou
 * (a seu critério) qualquer versão posterior.
 *
 * Este programa é distribuído na esperança de que seja útil,
 * mas SEM QUALQUER GARANTIA; sem mesmo a garantia implícita de
 * COMERCIALIZAÇÃO ou ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO. Consulte a
 * GNU Affero General Public License para mais detalhes.
 *
 * Você deve ter recebido uma cópia da GNU Affero General Public License
 * junto com este programa. Se não, veja <https://www.gnu.org/licenses/>.
 */

(function () {
    "use strict";

    console.log(`
██╗░░░░░██╗░░░██╗███╗░░░███╗███╗░░░███╗░█████╗░░██████╗░█████╗░██████╗░██╗██████╗░████████╗██╗███████╗██╗░░░██╗
██║░░░░░██║░░░██║████╗░████║████╗░████║██╔══██╗██╔════╝██╔══██╗██╔══██╗██║██╔══██╗╚══██╔══╝██║██╔════╝╚██╗░██╔╝
██║░░░░░██║░░░██║██╔████╔██║██╔████╔██║███████║╚█████╗░██║░░╚═╝██████╔╝██║██████╔╝░░░██║░░░██║█████╗░░░╚████╔╝░
██║░░░░░██║░░░██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║░╚═══██╗██║░░██╗██╔══██╗██║██╔═══╝░░░░██║░░░██║██╔══╝░░░░╚██╔╝░░
███████╗╚██████╔╝██║░╚═╝░██║██║░╚═╝░██║██║░░██║██████╔╝╚█████╔╝██║░░██║██║██║░░░░░░░░██║░░░██║██║░░░░░░░░██║░░░
╚══════╝░╚═════╝░╚═╝░░░░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░░░░╚═╝░░░╚═╝╚═╝░░░░░░░░╚═╝░░░`);

    // Extensões para Number
    if (!Number.prototype.toMoney)
        /**
         * Converte um número para formato monetário.
         * @param {boolean} [currency=false] - Se true, formata como moeda.
         * @returns {string} - Número formatado como moeda ou decimal.
         */
        Number.prototype.toMoney = function (currency = false) {
            return new Intl.NumberFormat('pt-BR', {
                style: currency ? "currency" : "decimal",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(this.valueOf());
        };

    if (!Number.prototype.toRound)
        /**
         * Arredonda um número com base na precisão especificada.
         * @param {number} [precision=0] - Precisão do arredondamento (0: padrão, 1: floor, 2: ceil).
         * @returns {number} - Número arredondado.
         */
        Number.prototype.toRound = function (precision = 0) {
            switch (precision) {
                case 1:
                    return Math.floor(this.valueOf());
                case 2:
                    return Math.ceil(this.valueOf());
                default:
                    return Math.round(this.valueOf());
            }
        };

    if (!Number.prototype.decimalPrecision)
        /**
         * Define a precisão decimal de um número.
         * @param {number} [precision=2] - Número de casas decimais.
         * @returns {number} - Número com a precisão definida.
         */
        Number.prototype.decimalPrecision = function (precision = 2) {
            return parseFloat(this.toFixed(precision));
        };

    // Extensões para Array
    if (!Array.prototype.divide)
        /**
         * Divide um array em subarrays de tamanho especificado.
         * @param {number} divisao - Tamanho de cada subarray.
         * @returns {Array<Array<any>>} - Array de subarrays.
         */
        Array.prototype.divide = function (divisao) {
            return this.reduce((acc, _, i) => {
                if (i % divisao === 0) acc.push(this.slice(i, i + divisao));
                return acc;
            }, []);
        };

    // Extensões para Date
    if (!Date.prototype.toDefault)
        /**
         * Formata uma data para o padrão brasileiro.
         * @param {boolean} [showTime=true] - Se true, inclui a hora.
         * @param {string} [base='às'] - Texto base para separar data e hora.
         * @returns {string} - Data formatada.
         */
        Date.prototype.toDefault = function (showTime = true, base = 'às') {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };

            if (showTime) {
                options.hour = '2-digit';
                options.minute = '2-digit';
            }

            return this.toLocaleString('pt-BR', options).replace(',', showTime ? ` ${base}` : '');
        };

    // Extensões para String
    if (!String.prototype.parseBool)
        /**
         * Converte uma string para booleano.
         * @returns {boolean|null} - Valor booleano ou null se a string não for válida.
         */
        String.prototype.parseBool = function () {
            const string = this.trim().toLowerCase();
            if (string === "true" || string === "1") return true;
            if (string === "false" || string === "0") return false;
            return null;
        };

    if (!String.prototype.toTitleCase)
        /**
         * Converte uma string para o formato de título.
         * @param {boolean} [sigla=false] - Se true, mantém siglas em maiúsculas.
         * @param {number} [tamanho=3] - Tamanho mínimo para considerar uma sigla.
         * @returns {string} - String formatada como título.
         */
        String.prototype.toTitleCase = function (sigla = false, tamanho = 3) {
            return this.replace(/\w\S*/g, function (txt) {
                if (sigla && txt.length >= tamanho && txt === txt.toUpperCase()) {
                    return txt;
                }
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };

    if (!String.prototype.isNullOrEmpty)
        /**
         * Verifica se a string é nula ou vazia.
         * @returns {boolean} - True se a string for nula ou vazia.
         */
        String.prototype.isNullOrEmpty = function () {
            return !this || this == "";
        };

    if (!String.prototype.isNullOrWhiteSpace)
        /**
         * Verifica se a string é nula, vazia ou contém apenas espaços em branco.
         * @returns {boolean} - True se a string for nula, vazia ou contiver apenas espaços.
         */
        String.prototype.isNullOrWhiteSpace = function () {
            return !this || this.trim() === "";
        };

    if (!String.prototype.getFirstAndLastWord)
        /**
         * Retorna a primeira e a última palavra de uma string.
         * @returns {string} - Primeira e última palavra da string.
         */
        String.prototype.getFirstAndLastWord = function () {
            const words = this.trim().split(/\s+/);
            if (words.length === 0) return "";
            if (words.length === 1) return words[0];
            return `${words[0]} ${words[words.length - 1]}`;
        };

    if (!String.prototype.fileExtension)
        /**
         * Extrai a extensão de um nome de arquivo.
         * @returns {string} - Extensão do arquivo.
         */
        String.prototype.fileExtension = function () {
            const match = this.match(/\.([^.]+)$/);
            return match ? match[1] : "";
        };

    if (!String.prototype.hashCode)
        /**
         * Gera um código hash para a string.
         * @returns {string} - Código hash em hexadecimal.
         */
        String.prototype.hashCode = function () {
            let hash = 0;
            if (this.length === 0) return hash.toString(16);
            for (let i = 0; i < this.length; i++) {
                const chr = this.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0;
            }
            return (hash >>> 0).toString(16);
        };

    if (!String.prototype.toNumber)
        /**
         * Converte uma string para número.
         * @returns {number} - Número convertido ou NaN se a conversão falhar.
         */
        String.prototype.toNumber = function () {
            const cleaned = this.replace(/[^\d,.-]/g, '').trim();
            const negativeMatch = cleaned.match(/^(-?)(.*)$/);
            if (!negativeMatch) return NaN;
            let [, negative, numberPart] = negativeMatch;
            numberPart = numberPart.replace(/\./g, "").replace(",", ".");
            if (numberPart.includes("."))
                return parseFloat(negative + numberPart);
            else
                return parseInt(negative + numberPart, 10);
        };

    if (!String.prototype.toAvatarName)
        /**
         * Gera um nome de avatar a partir de uma string.
         * @returns {string} - Iniciais do nome em maiúsculas.
         */
        String.prototype.toAvatarName = function () {
            const words = this.trim().split(" ").filter(Boolean);
            const firstInitial = words[0]?.charAt(0) || "";
            const secondInitial = words.length > 1 ? words[words.length - 1].charAt(0) : firstInitial;
            return `${firstInitial}${secondInitial}`.toUpperCase();
        };

    if (!String.prototype.isValidDocument)
        /**
         * Valida um documento (CPF, CNPJ, RG, CNH).
         * @param {string} tipo - Tipo de documento ('cpf', 'cnpj', 'rg', 'cnh').
         * @returns {boolean} - True se o documento for válido.
         */
        String.prototype.isValidDocument = function (tipo) {
            const documento = this.replace(/[^\d]+/g, '');
            if (tipo === 'cnpj') {
                if (documento.length !== 14 || /^(\d)\1{13}$/.test(documento)) return false;
                let tamanho = documento.length - 2;
                let numeros = documento.substring(0, tamanho);
                let digitos = documento.substring(tamanho);
                let soma = 0;
                let pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
                    if (pos < 2) pos = 9;
                }
                let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
                if (resultado !== parseInt(digitos.charAt(0))) return false;
                tamanho = tamanho + 1;
                numeros = documento.substring(0, tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
                    if (pos < 2) pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
                return resultado === parseInt(digitos.charAt(1));
            }
            if (tipo === 'cpf') {
                if (documento.length !== 11 || /^(\d)\1{10}$/.test(documento)) return false;
                let soma = 0;
                let resto;
                for (let i = 0; i < 9; i++) {
                    soma += parseInt(documento.charAt(i)) * (10 - i);
                }
                resto = (soma * 10) % 11;
                if (resto === 10 || resto === 11) resto = 0;
                if (resto !== parseInt(documento.charAt(9))) return false;
                soma = 0;
                for (let i = 0; i < 10; i++) {
                    soma += parseInt(documento.charAt(i)) * (11 - i);
                }
                resto = (soma * 10) % 11;
                if (resto === 10 || resto === 11) resto = 0;
                return resto === parseInt(documento.charAt(10));
            }
            if (tipo === 'rg') {
                if (documento.length < 8 || documento.length > 9) return false;
                return true;
            }
            if (tipo === 'cnh') {
                if (documento.length === 11 || documento.length === 12) {
                    return true;
                }
                return false;
            }
            return false;
        };

    if (!String.prototype.formatDocument)
        /**
         * Formata um documento (CPF, CNPJ, RG, CNH, telefone).
         * @param {string} tipo - Tipo de documento ('cpf', 'cnpj', 'rg', 'cnh', 'telefone').
         * @returns {string} - Documento formatado.
         */
        String.prototype.formatDocument = function (tipo) {
            const document = this.replace(/[^\d]+/g, '');

            if (tipo === 'cnpj' && document.length === 14)
                return document.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");

            if (tipo === 'cpf' && document.length === 11)
                return document.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");

            if (tipo === 'rg' && (document.length === 8 || document.length === 9))
                return document.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,1})$/, "$1.$2.$3-$4");

            if (tipo === 'cnh' && (document.length === 11 || document.length === 12))
                return document.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3.$4");

            if (tipo === 'telefone' && (document.length === 10 || document.length === 11))
                return document.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

            return document;
        };

    if (!String.prototype.removeFormatting)
        /**
         * Remove a formatação de uma string, mantendo apenas dígitos.
         * @returns {string} - String sem formatação.
         */
        String.prototype.removeFormatting = function () {
            return this.replace(/[^\d]+/g, '');
        };

    if (!String.prototype.isEmail)
        /**
         * Verifica se a string é um email válido.
         * @returns {boolean} - True se a string for um email válido.
         */
        String.prototype.isEmail = function () {
            const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
            return regex.test(this.valueOf());
        };

    if (!String.prototype.isURL)
        /**
         * Verifica se a string é uma URL válida.
         * @returns {boolean} - True se a string for uma URL válida.
         */
        String.prototype.isURL = function () {
            const pattern = new RegExp(
                '^(https?:\\/\\/)?' + // protocolo (http:// ou https://)
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // nome do domínio
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // ou endereço IP (v4)
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // porta e caminho
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', // fragmento
                'i' // flag case-insensitive
            );
            return !!pattern.test(this.valueOf()); // Retorna true ou false
        };

    if (!Object.prototype.isNullOrEmpty)
        /**
         * Verifica se um objeto é nulo ou vazio.
         * @returns {boolean} - True se o objeto for nulo ou vazio.
         */
        Object.prototype.isNullOrEmpty = function () {
            // Verifica se o objeto é null ou undefined
            if (this === null || this === undefined) {
                return true;
            }

            // Verifica se o objeto está vazio (sem propriedades próprias)
            if (Object.keys(this).length === 0) {
                return true;
            }

            // Caso contrário, o objeto não está vazio
            return false;
        };

    if (!Object.prototype.atributosVazios)
        /**
         * Verifica se todos os atributos de um objeto estão vazios.
         * @returns {boolean} - True se todos os atributos estiverem vazios.
         */
        Object.prototype.atributosVazios = function () {
            return Object.values(this).every(value =>
                value === null || value === undefined || value === '' ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === 'object' && Object.keys(value).length === 0)
            );
        };

    // Adiciona o método atributosPreenchidos ao Object.prototype
    if (!Object.prototype.atributosPreenchidos)
        /**
         * Verifica se todos os atributos de um objeto estão preenchidos.
         * @returns {boolean} - True se todos os atributos estiverem preenchidos.
         */
        Object.prototype.atributosPreenchidos = function () {
            return Object.values(this).every(value =>
                value !== null && value !== undefined && value !== '' &&
                (!Array.isArray(value) || value.length > 0) &&
                (typeof value !== 'object' || Object.keys(value).length > 0)
            );
        };


    // Classe Cookie
    class Cookie {
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

    // Adiciona a classe Cookie ao escopo global (window) se estiver no navegador
    if (typeof window !== "undefined") {
        window.Cookie = Cookie;
        window.serializeJson = serializeJson;
        window.serializeJsonComplex = serializeJsonComplex;
        window.parseBool = parseBool;
        window.uuid = uuid;
        window.getString = getString;
        window.sumElements = sumElements;
        window.compareDates = compareDates;
        window.getData = getData;
        window.sleep = sleep;
        window.populate = populate;
        window.isHTMLElement = isHTMLElement;
        window.dataURLToBlob = dataURLToBlob;
        window.base64ToBlob = base64ToBlob;
        window.isLightOrDark = isLightOrDark;
        window.isObject = isObject;
        window.getRandom = getRandom;
    }

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
})();
