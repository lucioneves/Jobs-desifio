import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../interface/post'
import { DialogService} from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComentarioListaComponent } from '../component/comentario-lista/comentario-lista.component';
import { CommonModule } from '@angular/common';
import { ComentariosService } from '../service/comente/comentarios.service';
import { Comentario } from '../interface/comentario';


@Component({
    selector: 'app-desafio',
    standalone: true,
    templateUrl: './desafio.component.html',
    styleUrl: './desafio.component.css',
    imports: [TableModule, ButtonModule, DialogModule, CommonModule, FormsModule, ComentarioListaComponent]
})
export class DesafioComponent implements OnInit{
@Input() comentarios: Comentario[] = []

  displayOpenModal: boolean = false
  displayModal: boolean = false;
  displayDeleteMdal: boolean = false


  posts!: Post[];
  modalRef!: any;
 
  post: Post = {
    title: '', body: '',
    userId: 0,
    id: 0
  };
  
  dialogRef: DynamicDialogRef | undefined; 
  displayDeleteModal: boolean = false;
  selectedPost = 1;
  
 

  constructor(private postService: PostService, private dialogService: DialogService, private comentariosService: ComentariosService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  createPost(postData: Post) {
    this.postService.createPost(postData).subscribe((post: Post) => {
      this.posts.push(post);
    });
  }

  updatePost(postData: Post) {
    this.postService.updatePost(postData).subscribe(
      (updatedPost: Post) => {
        const index = this.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        console.log('Post atualizado:', updatedPost);
      },
      (error) => {
        console.error('Erro ao atualizar o post:', error);
      }
    );
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  openEditModal(post: Post) {
    this.post = post;
    this.displayModal = true;
  }

  fecharModal(){
    this.displayModal = false
  }

  save() {
    this.updatePost(this.post);
    this.displayModal = false
  }

  openDeleteConfirmation(postId: number) {
    this.post.id = postId;
    this.displayDeleteModal = true;
  }

  cancelDelete() {
    this.displayDeleteModal = false;
  }

  confirmDelete() {
    this.deletePost(this.post.id);
    this.displayDeleteModal = false;

    console.log('Post deletado com sucesso!')
  }

  openModalPost(postID: number) {
    this.displayOpenModal = true
    this.selectedPost = postID
  }

  
}
