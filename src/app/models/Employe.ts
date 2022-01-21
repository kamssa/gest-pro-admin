import {Personne} from './personnes';
import {Adresse} from './Adresse';

export class Employe extends Personne{
  constructor(
    public id ?: number,
    public version?: number,
    public nom ?: string,
    public prenom ?: string,
    public email ?: string,
    public password ?: string,
    public fonction ?: string,
    public nomComplet ?: string,
    public activated?: boolean,
    public adresse ?: Adresse,
    public  type?: string,
    public roles?: []) {
    super(id, version, nom, prenom, email, password, fonction, nomComplet, adresse, type, roles);
  }

}
