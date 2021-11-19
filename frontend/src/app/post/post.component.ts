import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post;
  @Input() forApproval;
  showComment = false;
  comments:any = [];
  commentForm = new FormGroup(
    {
      content : new FormControl("", Validators.required)
    }
  )

  constructor(private postService: PostService, private commentService: CommentService) { }

  ngOnInit(): void {
  }

  upvote(postID)
  {
    this.postService.upvotePost(postID)
    .subscribe((data) =>
    {
      this.post.upvote += 1;
    })
  }

  showComments()
  {
    this.showComment = !this.showComment;
    if(this.showComment)
    {
      this.commentService.getComments(this.post._id)
    .subscribe(
      data =>
      {
        // console.log(data['comments'])
        this.post["comments"] = data
        // this.comments = data;
      }
    );
    }
  }

  approvePost()
  {
    this.postService.approvePost(this.post._id)
    .subscribe( data =>
      {
        
      })

      
  }

  onCommentFormSubmit()
  {
    this.commentForm.value["postId"] = this.post._id;
    this.commentForm.value["creater"] = sessionStorage.getItem("userId")
    this.commentService.addComment(this.commentForm.value)
    .subscribe(
      data =>
      {
        this.post.is_approved = true
        console.log(data)
        // this.showComment = !this.showComment;
        this.post["comments"] = data
        this.commentForm.reset()
      }
    )
  }

}
