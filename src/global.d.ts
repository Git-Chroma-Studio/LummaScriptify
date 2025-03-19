import { Cookie } from "./index";

declare global {
    interface Number {
        /**
         * Converte um número para formato monetário.
         * @param currency - Se true, formata como moeda.
         * @returns Número formatado como moeda ou decimal.
         */
        toMoney(currency?: boolean): string;
        /**
         * Arredonda um número com base na precisão especificada.
         * @param precision - Precisão do arredondamento (0: padrão, 1: floor, 2: ceil).
         * @returns Número arredondado.
         */
        toRound(precision?: number): number;
        /**
         * Define a precisão decimal de um número.
         * @param precision - Número de casas decimais.
         * @returns Número com a precisão definida.
         */
        decimalPrecision(precision?: number): number;
    }

    interface Array<T> {
        /**
         * Divide um array em subarrays de tamanho especificado.
         * @param divisao - Tamanho de cada subarray.
         * @returns Array de subarrays.
         */
        divide(divisao: number): T[][];
    }

    interface Date {
        /**
         * Formata uma data para o padrão brasileiro.
         * @param showTime - Se true, inclui a hora.
         * @param base - Texto base para separar data e hora.
         * @returns Data formatada.
         */
        toDefault(showTime?: boolean, base?: string): string;
    }

    interface String {
        /**
         * Converte uma string para booleano.
         * @returns Valor booleano ou null se a string não for válida.
         */
        parseBool(): boolean | null;
        /**
         * Converte uma string para o formato de título.
         * @param sigla - Se true, mantém siglas em maiúsculas.
         * @param tamanho - Tamanho mínimo para considerar uma sigla.
         * @returns String formatada como título.
         */
        toTitleCase(sigla?: boolean, tamanho?: number): string;
        /**
         * Verifica se a string é nula ou vazia.
         * @returns True se a string for nula ou vazia.
         */
        isNullOrEmpty(): boolean;
        /**
         * Verifica se a string é nula, vazia ou contém apenas espaços em branco.
         * @returns True se a string for nula, vazia ou contiver apenas espaços.
         */
        isNullOrWhiteSpace(): boolean;
        /**
         * Retorna a primeira e a última palavra de uma string.
         * @returns Primeira e última palavra da string.
         */
        getFirstAndLastWord(): string;
        /**
         * Extrai a extensão de um nome de arquivo.
         * @returns Extensão do arquivo.
         */
        fileExtension(): string;
        /**
         * Gera um código hash para a string.
         * @returns Código hash em hexadecimal.
         */
        hashCode(): string;
        /**
         * Converte uma string para número.
         * @returns Número convertido ou NaN se a conversão falhar.
         */
        toNumber(): number;
        /**
         * Gera um nome de avatar a partir de uma string.
         * @returns Iniciais do nome em maiúsculas.
         */
        toAvatarName(): string;
        /**
         * Valida um documento (CPF, CNPJ, RG, CNH).
         * @param tipo - Tipo de documento ('cpf', 'cnpj', 'rg', 'cnh').
         * @returns True se o documento for válido.
         */
        isValidDocument(tipo: string): boolean;
        /**
         * Formata um documento (CPF, CNPJ, RG, CNH, telefone).
         * @param tipo - Tipo de documento ('cpf', 'cnpj', 'rg', 'cnh', 'telefone').
         * @returns Documento formatado.
         */
        formatDocument(tipo: string): string;
        /**
         * Remove a formatação de uma string, mantendo apenas dígitos.
         * @returns String sem formatação.
         */
        removeFormatting(): string;
        /**
         * Verifica se a string é um email válido.
         * @returns True se a string for um email válido.
         */
        isEmail(): boolean;
        /**
         * Verifica se a string é uma URL válida.
         * @returns True se a string for uma URL válida.
         */
        isURL(): boolean;
    }

    interface Object {
        /**
         * Verifica se um objeto é nulo ou vazio.
         * @returns True se o objeto for nulo ou vazio.
         */
        isNullOrEmpty(): boolean;
        /**
         * Verifica se todos os atributos de um objeto estão vazios.
         * @returns True se todos os atributos estiverem vazios.
         */
        atributosVazios(): boolean;
        /**
         * Verifica se todos os atributos de um objeto estão preenchidos.
         * @returns True se todos os atributos estiverem preenchidos.
         */
        atributosPreenchidos(): boolean;
    }

    interface Window {
        Cookie: typeof Cookie;
        serializeJson: (html: string) => Object;
        serializeJsonComplex: (html: string) => Object;
        parseBool: (str: string) => boolean | null;
        uuid: () => string;
        getString: (length: number) => string;
        sumElements: (propriedade: string, ...seletores: any[]) => number;
        compareDates: (inicial: string | Date, dtFinal: string | Date) => Object;
        getData: (html: string) => Object;
        sleep: (ms: number) => Promise<void>;
        populate: (formulario: string, data: Object) => void;
        isHTMLElement: (str: string) => boolean;
        dataURLToBlob: (dataURL: string) => Blob;
        base64ToBlob: (base64: string, mimeType: string) => Blob;
        isLightOrDark: (hex: string) => string;
        isObject: (value: Object) => boolean;
        getRandom: (min: number, max: number) => number;
    }
    
}

export { };