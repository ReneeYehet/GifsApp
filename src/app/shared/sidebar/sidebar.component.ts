import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  get historial() {
    return [...this.gifsService.historial]; //romper la referencia usando [...]
  }

  constructor( private gifsService: GifsService ) { }

  buscar( busqueda: string) {
     this.gifsService.buscarGifs( busqueda );
  }


}
