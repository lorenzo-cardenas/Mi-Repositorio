import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent  implements OnInit{

  constructor(private pokemonService: PokemonService){}
  @ViewChild('tarjetas') tarjetasElement!: ElementRef;
  
  listaPokemon:Resultado[]=[];
  pagina:number = 1;
  cargando:boolean=false;
  pokemonSeleccionado:Pokemon | undefined;
  detalle:boolean=false;

  ngOnInit(): void {
    this.cargarLista();
    this.pokemonService.getById("1");
  }

  async cargarLista(){
    this.cargando=true;
    this.listaPokemon = [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)];
    this.cargando=false;
    this.pagina++;
  }

  onScroll(e:any){
    if(this.cargando)return;
    

    if(
        Math.round(
          this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
        ) === e.srcElement.scrollHeight){
          this.cargarLista();
      }
  }

  async tarjetaClickeada(id:string){
    this.pokemonSeleccionado =  await this.pokemonService.getById(id);
  }

  cambiarEstadoDetalle(){
    if(this.pokemonSeleccionado) this.detalle=!this.detalle;
    console.log(this.detalle)
  }

}
