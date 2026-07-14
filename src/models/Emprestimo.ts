export interface IEmprestimo {
  id?: number;
  dt_emprestimo?: Date;
  dt_devolucao?: Date | null;
  devolvido: boolean;
  id_livro: number;
  id_cliente: number;
}

export class Emprestimo {
  private _id?: number;
  private _dtEmprestimo?: Date;
  private _dtDevolucao?: Date | null;
  private _devolvido: boolean;
  private _idLivro: number;
  private _idCliente: number;

  constructor(
    idLivro: number,
    idCliente: number,
    devolvido: boolean = false,
    dtEmprestimo?: Date,
    dtDevolucao?: Date | null,
    id?: number
  ) {
    this._idLivro = idLivro;
    this._idCliente = idCliente;
    this._devolvido = devolvido;
    this._dtEmprestimo = dtEmprestimo;
    this._dtDevolucao = dtDevolucao;
    this._id = id;
  }

  get id(): number | undefined {
    return this._id;
  }

  get idLivro(): number {
    return this._idLivro;
  }

  get idCliente(): number {
    return this._idCliente;
  }

  get devolvido(): boolean {
    return this._devolvido;
  }

  set devolvido(status: boolean) {
    this._devolvido = status;
  }

  get dtEmprestimo(): Date | undefined {
    return this._dtEmprestimo;
  }

  get dtDevolucao(): Date | null | undefined {
    return this._dtDevolucao;
  }

  set dtDevolucao(data: Date | null | undefined) {
    this._dtDevolucao = data;
  }
}