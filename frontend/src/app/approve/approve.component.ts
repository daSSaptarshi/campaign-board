import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  posts_data;
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData()
  {
    this.posts_data = this.postService.getPendingPosts()
    .subscribe(data =>
      {
        this.posts_data = data;
      })
  }

}
