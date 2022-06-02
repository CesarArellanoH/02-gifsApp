import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'ErvxDSMQu2igUZAeuu0Ug1CyPfJUZRAI';
  private _servicioURL: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  //ToDo cambiar el tipado any por el correspondiente
  public resultado: Gif[] = [];

  get historial(): string[]{
    return [...this._historial];
    }

  constructor( private http: HttpClient ) { 

   this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
   this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarTermino(query: string): void{
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
    .set('api_key', this._apiKey)
    .set('q', query)
    .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this._servicioURL}/search?`,{params}).subscribe (resp => {
      this.resultado = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultado));
    });

//   fetch(`https://api.giphy.com/v1/gifs/search?api_key=ErvxDSMQu2igUZAeuu0Ug1CyPfJUZRAI&q=dragon ball z&limit=10`).then( response => {
//      response.json().then( resp => {
//        console.log(resp);
//        
//      });
//    });
  }
}
