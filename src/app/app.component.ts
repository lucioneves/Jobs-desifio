import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {TableModule } from 'primeng/table';
import { PostService } from './service/post.service';
import { DesafioComponent } from "./desafio/desafio.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComentarioListaComponent } from "./component/comentario-lista/comentario-lista.component";
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ComentariosService } from './service/comente/comentarios.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [PostService, DialogService, DynamicDialogRef, ComentariosService],
    imports: [RouterOutlet, HttpClientModule, DialogModule, NgIf, CommonModule, FormsModule, TableModule, DesafioComponent, ComentarioListaComponent]
})
export class AppComponent {
  title = 'desafio';
}
