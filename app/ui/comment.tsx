import { CommentAttributes } from "../lib/definitions";
import { formatDateToLocal } from "../lib/utils";

export default function Comment ({comment}: {comment: CommentAttributes}) {
    const { text, author, updatedAt } = comment;
    const date = formatDateToLocal(updatedAt.toString());
    // const date = updatedAt;
    return (
        <li>
            <h3>{author} at {date}:</h3>

            <p>{text}</p>
        </li>
    )
}