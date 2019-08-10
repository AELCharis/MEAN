import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';  //kano import to map operator , mporo na kano
// transorm kathe element tou array se ena neo element k na ta apothikefso se ena neo array

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"  //stelno ena get request sto api
      )
      .pipe(map((postData) => {   //xrisimopio to map pou exo kani import, 1. to map perimeni ena argument k ena function pou tha gini execute se kathe data
          return postData.posts.map(post => {
            return { //epistrefo to kathe post pou exi title k content
              title:   post.title,
              content: post.content,
              id: post._id
            };
          });   //epistrefo to array me ta post , kano access ta PostData
      }))
      .subscribe(transformedPosts => {  //afti i fucntion energopite kathe fora pou perno response (transformedPosts ine to result to return postData)
        this.posts = transformedPosts;  //perno ta post apo to http pou erxonte apo to server k ta apothikevo sto this
        this.postsUpdated.next([...this.posts]); //enimerono olo to application mou gia afto to update pou egine
      });
  }


deletePost(postId: string) {
  this.http.delete("http://localhost:3000/api/posts/" + postId)    //stelno to request gia na gini delete to id tou Post
.subscribe(() => {    //kano subscribe gia na paro piso ean exi gini delete
    const updatedPosts = this.posts.filter(post => post.id !== postId);
    this.posts = updatedPosts; //enimerono kano update ta post
    this.postsUpdated.next([... this.posts]);  //k meta stelno ena copy apo ta post kano update sto front end
});
}


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
