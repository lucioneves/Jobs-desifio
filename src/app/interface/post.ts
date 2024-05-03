import { Comentario } from "./comentario";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string; 
  comments?: Comentario[]; 
}
