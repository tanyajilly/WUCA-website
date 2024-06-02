"use client";

import { useState, useEffect } from 'react';
import { Article } from "@/app/lib/definitions";
import PostPreview from "@/app/ui/post-preview";

type PostsProps = {
    articles: Article[];
    // articleType: "articles" | "facts";
    locale: string;
    category: string;
};

export default function Posts({
    articles,
    locale,
}: PostsProps) {
    const [visibleContent, setVisibleContent] = useState<Article[]>([]);
    const [itemsToShow, setItemsToShow] = useState(12); // Number of items to show initially

    useEffect(() => {
        setVisibleContent(articles.slice(0, itemsToShow));
    }, [articles, itemsToShow]);

    const loadMore = () => {
        setItemsToShow(prev => prev + 10); // Increase number of items to show
    };

    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleContent &&
                    visibleContent.map((article: Article) => (
                        <PostPreview
                            key={article.id}
                            article={article}
                            articleType={article.articleType || 'articles'}
                        />
                    ))}
            </section>
            {visibleContent.length < articles.length && (
                <button onClick={loadMore}>Load More</button>
            )}
        </>
    );
}
