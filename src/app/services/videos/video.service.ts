import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VideoService {
    public url = "http://localhost/curso-fullstack/symfony/web/app_dev.php";
    public identity;
    public token;

    constructor(private _http: Http) {

    }

    create(token,video){
        let json = JSON.stringify(video);
        let params = "json="+json+"&authorization="+token;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        return this._http.post(this.url + "/video/new",params, {headers:headers})
            .map(res => res.json());
    }

    getVideo(id){

        return this._http.get(this.url + "/video/detail/" + id ).map(res => res.json());
    }

    getLastsVideos(){

        return this._http.get(this.url + "/video/last-videos" ).map(res => res.json());
    }
}