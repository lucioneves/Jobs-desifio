import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComentariosService } from '../../service/comente/comentarios.service';
import { Comentario } from '../../interface/comentario';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-comentario-lista',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule],
  templateUrl: './comentario-lista.component.html',
  styleUrl: './comentario-lista.component.css'
})
export class ComentarioListaComponent {
  
  @Input() postId: number = 0
  comentarios: Comentario[] = []

  @Input() displayOpenModal: boolean = false; 
  noComments: any;


  constructor(private comentariosService: ComentariosService) { } 
  
  getComentarios() {
    this.comentariosService.getCommentsByPost(this.postId).subscribe(
      (comentarios: Comentario[]) => {
        this.comentarios = comentarios;
        console.log('Comentários obtidos:', this.comentarios);
      },
      error => {
        console.error('Erro ao obter comentários:', error);
      }
    );
  }
}
