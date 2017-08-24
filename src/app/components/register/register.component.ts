import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/usuario/user';

@Component({
  selector: 'app-register',
  templateUrl: '../../view/register/register.html',
  styleUrls: ['./register.component.css'],
  providers: [LoginService]
})
export class RegisterComponent implements OnInit {

  public titulo: string = "Registro";
  public user: User;
  public errorMessage;
  public  status;

  constructor(
      private _loginService: LoginService,
      private _route: ActivatedRoute,
      private _rouuter: Router
  ) { }

  ngOnInit() {
      this.user = new User(1, "user", "" ,"", "", "", "null");
  }

  onSubmit() {

    this._loginService.register(this.user).subscribe(
      response => {
        this.status = response.status;
        if(this.status != "success"){
          this.status = "error";
        }
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    console.log(this.user);
  }

}
