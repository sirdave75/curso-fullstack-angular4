import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {VideoService} from '../../services/videos/video.service';
import {User} from '../../model/usuario/user';
import {Video} from '../../model/videos/video';

@Component({
    selector: 'video-detail',
    templateUrl: '../../view/video/video-detail.html',
    providers: [LoginService, VideoService]
})

export  class VideoDetailComponent implements OnInit {
    public errorMessage;
    public video;
    public status;
    public loading;
    public lastsVideos;
    public statusLastsVideos;

    constructor(
        private _loginService: LoginService,
        private _videoService: VideoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.loading = 'show';
    }

    ngOnInit(): void {
            this._route.params.subscribe(params => {
                let id = +params["id"];

                this._videoService.getVideo(id).subscribe(
                    response => {
                        this.video = response.data;
                        this.status = response.status;
                        if(this.status != 'success'){
                            this._router.navigate(['/index']);
                        }
                        else{
                            this._videoService.getLastsVideos().subscribe(
                                response => {
                                    this.lastsVideos = response.data;
                                    this.statusLastsVideos = response.status;
                                    if(this.statusLastsVideos != 'success'){
                                        this._router.navigate(['/index']);
                                    }
                                    this.loading = 'hide';

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
                    },
                    error => {
                        this.errorMessage = <any> error;
                        if (this.errorMessage != null){
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                );
            });



    }

}