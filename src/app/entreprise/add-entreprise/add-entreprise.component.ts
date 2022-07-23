import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Entreprise} from "../../models/Entreprise";
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
  entrepriseForm: FormGroup;
  entreprise: Entreprise;

  error = '';
  constructor(private entrepriseService: EntrepriseService,
              private  fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router,
              public dialogRef: MatDialogRef<AddEntrepriseComponent>) { }

  ngOnInit(): void {

    this.initForm();
  }
  initForm(): void{
    this.entrepriseForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      telephone: [''],
      suspendu :[''],
      actevated :[''],
      logo :[''],
      email : ['', Validators.required],
      password : ['', Validators.required],
      adresse : this.fb.group({
        boitePostal: '',
        pays: '',
        ville: '',
        lienFacebook: '',
        lienLinkedIn: '',
        lienTwitter: '',
        lientInstagram: '',
        siteWeb: ''
      }),
      type:"ENTREPRISE"
    });
  }

  onSubmit() {
    console.log(this.entrepriseForm.value);
    let formValue = this.entrepriseForm.value;

    console.log('entreprise', formValue);
    this.entrepriseService.ajoutEntreprise(formValue).subscribe(data =>{
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
