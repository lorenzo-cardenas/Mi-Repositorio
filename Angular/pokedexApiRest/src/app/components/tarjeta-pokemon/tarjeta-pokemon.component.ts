import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Resultado } from '../../interfaces/pokeapi';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-tarjeta-pokemon',
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrl: './tarjeta-pokemon.component.css'
})

export class TarjetaPokemonComponent implements OnChanges{

constructor(private pokemonService: PokemonService){}

  ngOnChanges(): void {
    this.extraerInformacion();
  }

  @Input() data?:Resultado;
  @Input() seleccionado:boolean=false;
  @Input() fulldata?:Pokemon;
  @Output() clickeado = new EventEmitter<string>();

  id:string = "0";
  img:string = "";

  extraerInformacion(){
    if(this.data && this.data.url!==""){
      this.id= this.data.url.substring(34, this.data.url.length-1)
      //this.img= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.id+".png"
      return
    }

    if(this.fulldata ){
      this.id= this.fulldata.species.url.substring(42, this.fulldata.species.url.length-1)
      
      this.data = {
        name:this.fulldata.species.name,
        url:""
      }
    }
  }


}
