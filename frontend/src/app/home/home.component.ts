import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts_data: any
  createPostForm = new FormGroup(
    {
      title: new FormControl("", Validators.required),
      content: new FormControl("", Validators.required),
      is_advertisement: new FormControl(false, Validators.required)
    }
  )

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        this.posts_data = data;
      })
  }

  onCreatePostFormSubmit() {
    this.createPostForm.value["creater"] = sessionStorage.getItem("userId")
    this.postService.createNewPost(this.createPostForm.value)
      .subscribe(
        (data) => {
          this.createPostForm.reset()
          this.postService.getAllPosts()
            .subscribe(data => {
              this.posts_data = data;
            })
        }
      )
  }

}
