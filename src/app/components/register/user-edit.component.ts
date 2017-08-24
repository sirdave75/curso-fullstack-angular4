import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/usuario/user';
import { UploadService} from '../../services/upload.service';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'user-edit',
    templateUrl: '../../view/register/user-edit.html',
    styleUrls: ['./register.component.css'],
    providers: [LoginService, UploadService, UserService]
})
export class UserEditComponent implements OnInit {

    public titulo: string = "Actualizar mis datos";
    public user: User;
    public errorMessage;
    public  status;
    public newPass;
    public identity;

    constructor(
        private _loginService: LoginService,
        private _uploadService: UploadService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        let identity = this._loginService.getIdentity();
        this.identity = identity;

        console.log("identity al entrar en el edit: "+this.identity.image);
        if( identity == null ){
            this._router.navigate(['/index']);
        }
        else{
            this.user = new User(identity.sub,
                                 identity.role,
                                 identity.name,
                                 identity.surname,
                                 identity.email,
                                 identity.password,
                                 identity.image);
        }

    }

    onSubmit() {
        this.newPass = this.user.password;

        if(this.user.password == this.identity.password){
            this.user.password = "";
        }

        this._loginService.update_user(this.user).subscribe(
            response => {
                this.status = response.status;
                if(this.status != "success"){
                    this.status = "error";
                }
                else{
                    if(this.newPass == this.identity.password){
                        this.user.password = this.identity.password;
                    }

                    localStorage.setItem("identity", JSON.stringify(this.user));

                    window.location.href = "/user-edit";

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

    public filesToUpload: Array<File>;
    public resultUpload;

    fileChangeEvent(fileInput: any){

        console.log("evveneto change lanzado");

        //acaptura los filchero del campo file del formulario
        this.filesToUpload = <Array<File>>fileInput.target.files;

        let token = this._loginService.getToken();
        let url = "http://localhost/curso-fullstack/symfony/web/app_dev.php/user/upload-image-user";

        this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(
            (result) => {
                this.resultUpload = result;
                console.log(this.resultUpload);
                this._userService.getUser().subscribe(
                    response =>{
                        let identity = response.data;
                        this.identity = identity;
                        localStorage.setItem('identity', JSON.stringify(identity));
                        this.user.image = this.identity.image;
                        window.location.href = "/user-edit";

                    },
                    error => {
                        this.errorMessage = <any>error;
                        if(this.errorMessage != null){
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                );
            },
            (error) => {
                console.log(error);
            }
        );
    }

    resetBarProgress() {
        document.getElementById('status').innerHTML = "";
        document.getElementById('upload-progress-bar').setAttribute("value", "0");
        document.getElementById('upload-progress-bar').style.width = "0%";
    }

}
