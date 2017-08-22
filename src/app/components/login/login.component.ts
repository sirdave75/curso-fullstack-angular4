import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {identifierModuleUrl} from "@angular/compiler";

@Component({
  selector: 'app-login',
  templateUrl: '../../view/login/login.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public titulo: string ;
  public user;
  public errorMessage;
  public identity;
  public token;


  constructor(
      private _loginService: LoginService,
      private _route: ActivatedRoute,
      private _router: Router
  ) {

    this.titulo = 'Identifícate';


  }

  ngOnInit() {
    this._route.params.subscribe(params=>{
        let logout = +params["id"];
        if(logout == 1){
            localStorage.removeItem('identity');
            localStorage.removeItem('token');
            this.identity = null;
            this.token = null;
            window.location.href = "/login";

        }
    });

    this.user = {
      "email":"",
      "password":"",
      "getHash":"false"
    };

    let identity = this._loginService.getIdentity();

    if( identity != null && identity.sub){
        this._router.navigate(['/index']);
    }
  }

  onSubmit(){

    this._loginService.signup(this.user).subscribe(
        response => {
          let identity = response;
          this.identity = identity;
          if(this.identity.length <= 1){ // no llega la identidad
            alert("error en el servidor");
          }
          else{
              //alert("entro en el servidor: "+this.identity.status);
            if(!this.identity.status){
                //alert("identityr: "+JSON.stringify(identity));
              //guardo la identidad del usuario en el localstorage y pido el token
              localStorage.setItem('identity', JSON.stringify(identity));
              this.user.getHash = "true";

              //GET TOKEN
              this._loginService.signup(this.user).subscribe(
                  response => {
                    let token = response;
                    this.token = token;
                    if(this.token.length <= 0){
                      alert("error en el servidor");
                    }
                    else{
                      if(!this.identity.status){
                        localStorage.setItem('token', token);

                        //Redireccion
                          window.location.href = "/";
                      }
                      else{
                        console.log(this.identity.data);
                      }
                    }
                  },
                  error => {
                    this.errorMessage = <any> error;
                    if (this.errorMessage != null){
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
              );
            }
            else{
              console.log(this.identity.data);
            }
          }
        },
        error => {
          this.errorMessage = <any> error;
          if (this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
    );
  }

}
