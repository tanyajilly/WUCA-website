import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Post from "@/app/ui/post";
import { Article } from "@/app/lib/definitions";
import { ClassAttributes, ImgHTMLAttributes } from "react";

jest.mock('next/image', () => ({
    __esModule: true,
    default: (
        props: JSX.IntrinsicAttributes
            & ClassAttributes<HTMLImageElement>
            & ImgHTMLAttributes<HTMLImageElement>,
    ) => <img {...props} />
}));

const articleMock: Article = {
    id: 1,
    attributes: {
        heading: 'Test Heading',
        content: [],
        createdAt: '2022-01-01',
        updatedAt: '2022-01-01',
        publishedAt: '2022-01-01',
        slug: 'test-post',
        categories: {
            data: []
        },
        author: {
            data: null
        },
        image: {
            data: null
        }
    }
};

describe('Post Component', () => {

    // Renders the article image if it exists
    it('should render the article image when it exists', () => {
        // Arrange
        const article: Article = {
            id: 1,
            attributes: {
                heading: 'Test Heading',
                content: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "text",
                                text: "Test Content",
                            },
                        ],
                    },
                ],
                categories: {
                    data: []
                },
                author: {
                    data: null
                },
                image: {
                    data: {
                        attributes: {
                            width: 100,
                            height: 100,
                            url: 'test-image.jpg'
                        }
                    }
                },
                createdAt: '2022-01-01',
                updatedAt: '2022-01-01',
                publishedAt: '2022-01-01',
                slug: 'test-post'
            }
        };

        // Act
        render(<Post article={article} />);

        // Assert
        expect(screen.getByAltText('Test Heading')).toBeInTheDocument();
    });

    // Renders the article heading
    it('should render the article heading and publication date', () => {

        // Act
        render(<Post article={articleMock} />);

        // Assert
        expect(screen.getByText('Test Heading')).toBeInTheDocument();
        expect(screen.getByText('Jan 1, 2022')).toBeInTheDocument();
    });


    // Renders the article without an image if it doesn't exist
    it('should render the article without an image when it doesn`t exist', () => {

        // Act
        render(<Post article={articleMock} />);

        // Assert
        expect(screen.queryByAltText('Test Heading')).not.toBeInTheDocument();
    });

    // Renders the article without categories if they don't exist
    it('should render the article without categories when they don`t exist', () => {
        // Act
        render(<Post article={articleMock} />);
        screen.debug();
        // Assert
        expect(screen.queryByText('Categories:')).not.toBeInTheDocument();
    });

});
