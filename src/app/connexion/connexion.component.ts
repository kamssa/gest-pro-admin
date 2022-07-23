import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Personne} from "../models/Personne";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  form: FormGroup ;
  private returnUrl: string;
  submitted = false;
  loading = false;
  error = '';


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
// convenience getter for easy access to form fields
  get f() {

    return this.form.controls;
  }
  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.loading = true;
    let  admin : Personne = {
      email: email,
      password: password,
      type:'ADMIN'
    };
    console.log(admin);
    this.authService.login(admin).subscribe(data => {
        console.log('auth reussi', data.messages);
        if (data){
          console.log('Voir la data retournée', data);
          const helper = new JwtHelperService();
          const decoded= helper.decodeToken(data.body.body.accessToken);
          this.router.navigate([this.returnUrl]);

        }

      },
      error => {
        this.error = "email ou mot de passe oublié";
        this.loading = false;
      });
    this.router.navigate(['dashboard']);
  }
}
