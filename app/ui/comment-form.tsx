'use client';
import { useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { addComment } from "../lib/actions";
import { ArticleData } from '@/app/lib/definitions';

export default function CommentForm({ articleData }: {articleData: ArticleData}) {
    const addCommentWithArticleData = addComment.bind(null, articleData);
    const [ state, dispatch ] = useFormState(addCommentWithArticleData, {});
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formRef.current && state.status === 'success') {
            formRef.current.reset();
        }
    }, [state])

    return (
        <form ref={formRef} action={dispatch}>
            <textarea
                name="comment"
                required
                className="w-full text-sm px-3 py-2 text-gray-700 border border-2 border-teal-400 rounded-lg focus:outline-none"
                rows={4}
                placeholder="Add your review"
            ></textarea>
            <button
                className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                type="submit"
            >
                Add Comment
            </button>
        </form>
    )
}