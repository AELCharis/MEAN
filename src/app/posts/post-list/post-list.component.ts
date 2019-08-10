import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;


  constructor(public postsService: PostsService) {}  //mou dini ta stixia ton  post apo to allo component
  //to public dimiourga ena property se afto to component k apothikevi to value se afto to property

  ngOnInit() {
    this.postsService.getPosts();  //perno ola ta post
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;  //to post ine = me to post pou exo paralavi
      });
  }


  onDelete(postId: string) {    //otan gini to click Delete apo to html tha paro edo stin fucntion ena ID string
    this.postsService.deletePost(postId);  //kalo tin deletePost k perno mesa to postId
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
