import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //importar
import { Product } from './models/product.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'miProyectoAngular';
  http = inject(HttpClient); //injectar el servicio http cliente y crear solo 1 instancia para toda la app
  products:Product[]=[];

  changeTitle(){
    this.title = 'Cambiado!';
  }

  ngOnInit(){//se ejecuta cuando el componene esta renderizado
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe((data) => {
        this.products=data;
    });
  }

}
