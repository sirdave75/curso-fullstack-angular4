import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UploadService} from '../../services/upload.service';
import {LoginService} from '../../services/login/login.service';
import {VideoService} from '../../services/videos/video.service';
import {User} from '../../model/usuario/user';
import {Video} from '../../model/videos/video';

@Component({
    selector: 'video-new',
    templateUrl: '../../view/video/video-new.html',
    providers: [LoginService,UploadService,VideoService]
})

export  class VideoNewComponent implements OnInit{

    public titulo : string = "Crear un nuevo vídeo";
    public video;
    public errorMessage;
    public status;
    public uploadedImage;

    constructor(
        private _loginService: LoginService,
        private _uploadService: UploadService,
        private _videoService: VideoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.uploadedImage = false;
    }

    ngOnInit(): void {
            this.video = new Video(1,'','','public',null,null,null,null);


    }

    onSubmit(){

        let token = this._loginService.getToken();
        this._videoService.create(token,this.video).subscribe(
          response =>{
              this.status = response.status;
              if(this.status != 'success'){
                  this.status = 'error';
              }
              else{
                  this.video = response.data;
                  console.log(this.video);
              }
          } ,
          error => {
              this.errorMessage = <any> error;
              if (this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert("Error en la petición");
              }
          }
        );
    }

    callVideoStatus(value){
        this.video.status = value;
    }

    public filesToUpload: Array<File>;
    public resultUpload;
    fileChangeEventImage(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;

        let token = this._loginService.getToken();
        let url = "http://localhost/curso-fullstack/symfony/web/app_dev.php/video/upload-image/"+this.video.id;

        this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(
            (result) => {
                this.resultUpload = result;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    nextUploadVideo(){
        this.uploadedImage = true;
    }


    fileChangeEventVideo(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;

        let token = this._loginService.getToken();
        let url = "http://localhost/curso-fullstack/symfony/web/app_dev.php/video/upload-video/"+this.video.id;

        this._uploadService.makeFileRequest(token, url, ['video'], this.filesToUpload).then(
            (result) => {
                this.resultUpload = result;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    redirectToVideo(){
        this._router.navigate(['/index']);
    }
}
