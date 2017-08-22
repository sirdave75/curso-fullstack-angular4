import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './view/layout.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {
  title = 'app';
  public identity;
  public token;

  constructor(
     private _loginService: LoginService
  ){}

  ngOnInit(){
       this.identity = this._loginService.getIdentity();
       this.token = this._loginService.getToken();
  }
}
