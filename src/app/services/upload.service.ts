import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

    constructor(private _http: Http) {}

    //petición ajax que envía el fichero al servidor
    makeFileRequest(token, url: string, params: Array<string>, files: Array<File> ){

        return new Promise((resolve, reject) => {
                var formData: any = new FormData();
                var xhr = new XMLHttpRequest(); //petición ajax clásica enviando un formulario

                var name_file_input = params[0] //nombre del inputfile del formulario
                for (var i=0; i < files.length; i++) {
                    formData.append(name_file_input, files[i], files[i].name);
                }

                formData.append("authorization", token);

                xhr.onreadystatechange = function(){
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(JSON.parse(xhr.response));
                        }
                    }
                }
                //para el progreso de la barra
                xhr.upload.addEventListener("progress",function(event: any){
                    var percent = (event.loaded / event.total) *100;
                    let prc = Math.round(percent).toString(); //para pasar el porcentaje a la barra
                    document.getElementById('upload-progress-bar').setAttribute("value", prc);
                    document.getElementById('upload-progress-bar').style.width = prc + "%";
                    document.getElementById('status').innerHTML = Math.round(percent) + "% subido... por favor espera a que termine";
                },false);

                //para cuando ha terminado de subir el fichero
                xhr.addEventListener("load", function(){
                    document.getElementById('status').innerHTML = "Subida completada";
                    let prc = "100";
                    document.getElementById('upload-progress-bar').setAttribute("value",prc);
                    document.getElementById('upload-progress-bar').setAttribute("aria-valuenow", "0");
                    document.getElementById('upload-progress-bar').style.width = prc + "%";

                },false);

                //si no se sube bien y da un error
                xhr.addEventListener("error", function(){
                    document.getElementById('status').innerHTML = "Error en la subida";


                },false);



                //si  se aborta la subida
                xhr.addEventListener("abort", function(){
                    document.getElementById('status').innerHTML= "Subida abortada";


                }, false);

                //enviamos el formulario por ajax
                xhr.open("POST", url, true);
                xhr.send(formData);
            });
    }
}