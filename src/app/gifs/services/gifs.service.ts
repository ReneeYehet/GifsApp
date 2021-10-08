import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' // PERMITE DE QUE LOS SERVICIOS ESTEN DEFINIDOS EN EL MOMENTO QUE SE CONSTRUYE. ESTE SERVICIO SERA UNICO. ANGULAS LO ELEVA A UN NIVEL GLOBAL
})
export class GifsService {

  private apiKey : string = "NM6HiMjMWWLf0gvUbIabJfggdpv5PzZR";
  private servicioUrl: string = "http://api.giphy.com/v1/gifs";
  private _historial: string[] = [];

  //TODO: Cambiar ANY por su tipo
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]; //romper la referencia usando [...]
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('lastResultado')!) || [];
    /* if ( localStorage.getItem('historial')) {
      this._historial = JSON.parse( localStorage.getItem('historial')!);
    } */
  }

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query ); //unshift: insertar al inicio
      this._historial = this._historial.splice(0,10); //se corta y vuelve a cargarlo hasta 10

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
    }

    const params = new HttpParams().set('api_key', this.apiKey)
                                   .set('limit', '10')
                                   .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
        .subscribe( ( resp ) => {
          this.resultados = resp.data;
          localStorage.setItem( 'lastResultado', JSON.stringify( this.resultados ) );
        });

  }
}
