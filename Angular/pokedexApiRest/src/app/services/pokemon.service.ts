import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(page:number, limit: number=40):Promise<Resultado[]>{
    if(page>6)return [];

    const offset = limit*(page-1);
    const result = await fetch('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset);
    const resultadoJson = await result.json();
    if(resultadoJson.results.length>0) return resultadoJson.results;
    return [];
  }

  async getById(id:string):Promise<Pokemon>{
    const result = await fetch("https://pokeapi.co/api/v2/pokemon/"+id);
    return await result.json();
  }
 
  async getDescripcion(id:string):Promise<string>{
    const result = await fetch("https://pokeapi.co/api/v2/pokemon-species/"+id);
    const respuesta = await result.json();
    const texto = respuesta.flavor_text_entries.find((texto:any) => texto.language.name === "es")
    return texto.flavor_text;
  }

}
