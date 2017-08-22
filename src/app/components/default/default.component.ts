import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-default',
  templateUrl: '../../view/default/default.html',
  styleUrls: ['./default.component.css'],
  providers: [LoginService]
})
export class DefaultComponent implements OnInit {

  public titulo;
  public identity;
  constructor(private _loginService: LoginService) {
    this.titulo = 'Portada';
  }

  ngOnInit() {
    this.identity = this._loginService.getIdentity();
  }

}
