export interface ICliente {
  id?: number;
  nome: string;
  email: string;
}

export class Cliente {
  private _id?: number;
  private _nome: string;
  private _email: string;

  constructor(nome: string, email: string, id?: number) {
    this._nome = nome;
    this._email = email;
    this._id = id;
  }

  get id(): number | undefined {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }
}