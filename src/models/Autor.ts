export interface IAutor {
    id?: number;
    nome: string;
    nacionalidade?: string;
}

export class Autor {
    private _id?: number;
    private _nome: string;
    private _nacionalidade?: string;

    constructor(nome: string, nacionalidade?: string, id?: number) {
        this._nome = nome;
        this._nacionalidade = nacionalidade;
        this._id = id;
    }

    get id(): number | undefined {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(nome:string) {
        this._nome = nome;
    }

    get nacionalidade(): string | undefined {
        return this._nacionalidade;
    }

    set nacionalidade(nacionalidade: string | undefined) {
        this._nacionalidade = nacionalidade;
    }
}