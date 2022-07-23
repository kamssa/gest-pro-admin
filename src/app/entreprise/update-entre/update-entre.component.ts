import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntrepriseService} from "../../service/entreprise.service";
import {Entreprise} from "../../models/Entreprise";

@Component({
  selector: 'app-update-entre',
  templateUrl: './update-entre.component.html',
  styleUrls: ['./update-entre.component.scss']
})
export class UpdateEntreComponent implements OnInit {


  entreprise: Entreprise;
  entrepriseForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private entrepriseService: EntrepriseService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Entreprise,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateEntreComponent>) { }

  ngOnInit(): void {

    this.entrepriseService.getEntrepriseById(this.data['entreprise'])
      .subscribe(res => {
        console.log(res.body);
        this.entreprise = res.body;
        this.entrepriseForm = this.fb.group({
          id: this.entreprise.id,
          version: this.entreprise.version ,
          nom: this.entreprise.nom,
          description: this.entreprise.description,
          telephone: this.entreprise.telephone,
          suspendu: this.entreprise.suspendu,
          actevated: this.entreprise.actevated,
          logo: this.entreprise.logo,
          email: this.entreprise.email,
          password: [""],

          adresse : this.fb.group({
            boitePostal: this.entreprise.adresse.boitePostal,
            pays: this.entreprise.adresse.pays,
            ville: this.entreprise.adresse.ville,
            lienFacebook: this.entreprise.adresse.lienFacebook,
            lienLinkedIn: this.entreprise.adresse.lienLinkedIn,
            lienTwitter: this.entreprise.adresse.lienTwitter,
            lientInstagram: this.entreprise.adresse.lientInstagram,
            siteWeb: this.entreprise.adresse.siteWeb
          }),
          type:"ENTREPRISE",
        });
      });
  }

  onSubmit() {
    const formValue = this.entrepriseForm.value;
    this.entrepriseService.modifEntreprise(formValue).subscribe(data => {
      if (data){
        this.entreprise = data.body;
        this.dialogRef.close(this.entreprise);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    // this.manageForm.reset();
  }

}
