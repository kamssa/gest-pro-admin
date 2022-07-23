import {Adresse} from "./Adresse";
import {Personne} from "./Personne";

export class Entreprise extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public description ?: string,
              public logo ?: string,
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
