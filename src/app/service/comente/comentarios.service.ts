import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../../interface/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) { }

  getCommentsByPost(postId: number): Observable<Comentario[]>{
    const url = `${this.apiUrl}?postId=${postId}`;
    return this.http.get<Comentario[]>(url);
  }

  addCometario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl,comentario);
  }

  updateComentario(comentarioId: number, comentario: Comentario): Observable<Comentario> {
    const url = `${this.apiUrl}/${comentarioId}`;
    return this.http.put<Comentario>(url, comentario)
  }

  deleteComentario(id: number): Observable<any> {
    const url =`${this.apiUrl}/${id}`;
    return this.http.delete(url)
  }
}
