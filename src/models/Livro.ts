export interface ILivro {
    id?: number;
    titulo: string;
    dt_publicacao?: Date | null;
    qtd_total: number;
    qtd_disponivel: number;
    id_autor: number;
}

export class Livro {
    private _id?: number;
    private _titulo: string;
    private _dtPublicacao?: Date | null;
    private _qtdTotal: number;
    private _qtdDisponivel: number;
    private _idAutor: number;

    constructor(
        titulo: string,
        qtdTotal: number,
        qtdDisponivel: number,
        idAutor: number,
        dtPublicacao?: Date | null,
        id?: number
    ) {
        this._titulo = titulo;
        this._qtdTotal = qtdTotal;
        this._qtdDisponivel = qtdDisponivel;
        this._idAutor = idAutor;
        this._dtPublicacao = dtPublicacao;
        this._id = id;
    }

    get id(): number | undefined {
        return this._id;
    }

    get titulo(): string {
        return this._titulo;
    }

    get qtdTotal(): number {
        return this._qtdTotal;
    }

    get qtdDisponivel(): number {
        return this._qtdDisponivel;
    }

    set qtdDisponivel(qtd: number) {
        this._qtdDisponivel = qtd;
    }

    get idAutor(): number {
        return this._idAutor;
    }

    get dtPublicacao(): Date | null |undefined {
        return this._dtPublicacao;
    }
}