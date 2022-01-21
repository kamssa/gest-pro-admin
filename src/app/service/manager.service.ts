import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {Manager} from "../models/Manager";
import {Personne} from "../models/personnes";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private managerCreerSource = new Subject<Resultat<Manager>>();
  private managerModifSource = new Subject<Resultat<Manager>>();
  private managerFiltreSource = new Subject<string>();
  private managerSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  managerCreer$ = this.managerCreerSource.asObservable();
  managerModif$ = this.managerModifSource.asObservable();
  managerFiltre$ = this.managerFiltreSource.asObservable();
  managerSupprime$ = this.managerSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllManager():Observable<Resultat<Manager[]>> {
    return this.http.get<Resultat<Manager[]>>(`${environment.apiUrl}/api/auth/manager`);
  }
  ajoutManager(manager: Manager): Observable<Resultat<Manager>> {
    console.log('methode du service qui ajoute  manager', manager);
    return this.http.post<Resultat<Manager>>(`${environment.apiUrl}/api/auth/signupManage`, manager);
  }
  getPersonneByEmail(email: string): Observable<Resultat<Personne>> {
    return this.http.get<Resultat<Manager>>(`${environment.apiUrl}/api/auth/manager/${email}`);
  }
  getManagerById(id: number): Observable<Resultat<Manager>> {
    return this.http.get<Resultat<Manager>>(`${environment.apiUrl}/api/auth/manager/${id}`);
  }
  getPersonneById(id: number): Observable<Resultat<Personne>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/auth/getPersonneById/${id}`);
  }

  personneCreer(res: Resultat<Manager>) {
    console.log('manager a ete  creer correctement essaie source');
    this.managerCreerSource.next(res);
  }

  personneModif(res: Resultat<Manager>) {
    this.managerModifSource.next(res);
  }

  filtrepersonne(text: string) {
    this.managerFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('personneService: ' + message);

  }
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  // recuper les erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
