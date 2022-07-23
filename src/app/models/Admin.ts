import {Adresse} from "./Adresse";
import {Personne} from "./Personne";
import {Departement} from "./Departement";

export class Admin extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public nom ?: string,
              public prenom ?: string,
              public email ?: string,
              public telephone?: string,
              public password ?: string,
              public nomComplet ?: string,
              public suspendu ?: boolean,
              public actevated ?: boolean,
              public adresse ?: Adresse,
              public  type?: string,
              public roles?: []) {
              super(id, version, nom, prenom, email, telephone, password, nomComplet, suspendu, actevated, adresse, type, roles);
  }
}
