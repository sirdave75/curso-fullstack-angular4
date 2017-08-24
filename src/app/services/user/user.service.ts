import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { LoginService} from '../login/login.service';


@Injectable()
export class UserService {

    public  url = "http://localhost/curso-fullstack/symfony/web/app_dev.php";
    public identity;
    public token;

    constructor(private _http: Http, private _loginService: LoginService) { }

    getUser(){
        let authorization = this._loginService.getToken();
        let params = 'authorization=' + authorization;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        return this._http.post(this.url + "/user/user",params, {headers:headers})
            .map(res => res.json());
    }
}