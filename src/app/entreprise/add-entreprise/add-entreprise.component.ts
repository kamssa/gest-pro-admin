import { Component, OnInit } from '@angular/core';
import {Manager} from "../../models/Manager";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Entreprise} from "../../models/Entreprise";
import {ManagerService} from "../../service/manager.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {EntrepriseService} from "../../service/entreprise.service";

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.scss']
})
export class AddEntrepriseComponent implements OnInit {
  managerForm: FormGroup;
  entreprises: Entreprise[];
  entreprise: Entreprise;

  error = '';
  constructor(private entrepriseService: EntrepriseService,
              private  fb: FormBuilder,
              private managerService: ManagerService,
              private _snackBar: MatSnackBar,
              private router: Router,
              public dialogRef: MatDialogRef<AddEntrepriseComponent>) { }

  ngOnInit(): void {

    this.initForm();
  }
  initForm(): void{
    this.managerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email :['', Validators.required],
      password : ['', Validators.required],
      fonction : ['', Validators.required],
      entreprise: this.fb.group({
        id: '',
        version: '',
        nom: ['', Validators.required],
        description:''

      }),
      adresse : this.fb.group({
        boitePostal: '',
        pays: '',
        ville: '',
        siteWeb: '',
        telephone: ''
      }),
      type: 'MANAGER'

    });
  }

  onSubmit() {
    console.log(this.managerForm.value);
    let formValue = this.managerForm.value;
    let manager: Manager = {
      nom : formValue.nom,
      prenom: formValue.prenom,
      email: formValue.email,
      password: formValue.password,
      fonction: formValue.fonction,
      entreprise: formValue.entreprise,
      adresse: formValue.adresse,

      type: 'MANAGER'
    };
    console.log('manager', manager);
    this.managerService.ajoutManager(manager).subscribe(data =>{
      if (data.status === 0){
        this.dialogRef.close(this.entreprise);
        this._snackBar.open('Succès de l\'opération!', '', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.router.navigate(['manager']);
      }else {
        this.error = data.messages[0];
        console.log( data.messages);
      }

    }, error => {
      this.error = error;
      console.log(this.error);


    });
  }

}
