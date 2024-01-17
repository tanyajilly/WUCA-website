import Comment from "./comment";
import { Comments, ArticleData } from '@/app/lib/definitions';
import CommentForm from "./comment-form";

interface CommentsProps {
    comments: Comments;
    articleData: ArticleData;
}

export default function Comments({ comments, articleData }: CommentsProps) {
    const commentsList = comments.data;

    return (
        <section>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">Comments</h2>
            <CommentForm articleData={articleData} />
            <ul>
              {commentsList.length === 0 && (
                <span>No reviews yet</span>
              )}
              {commentsList &&
                commentsList.map((comment) => {
                  return (
                    <Comment key={comment.id} comment={comment.attributes} />
                  );
                })}
            </ul> 
          </section>
    )
}