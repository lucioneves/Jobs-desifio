import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interface/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private posts: Post[] = []


  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl)
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post)
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<Post>(url, post);
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
  }

  //Metodo para obter posts locais
  getLocalPosts(): Post[] {
    return this.posts;
  }

  //Metodo para adicionar
  addLocalPost(post: Post): void{
    this.posts.push(post);
  }

  //Metodo de Atualizar
  updateLocalPost(updatedPost: Post): void{
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
    }
  }

  //Metodo de deletar
  deleteLocalPost(id: number): void {
    this.posts = this.posts.filter(post =>post.id !== id)
  }
}