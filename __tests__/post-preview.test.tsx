import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PostPreview from "@/app/ui/post-preview";
import { Article } from "@/app/lib/definitions";
import { ClassAttributes, ImgHTMLAttributes } from "react";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLImageElement> &
            ImgHTMLAttributes<HTMLImageElement>
    ) => <img {...props} />,
}));

describe("PostPreview", () => {
    // Renders article image, heading and content
    it("should render article image, heading and content when all attributes are present", () => {
        const articleMock: Article = {
            id: 1,
            attributes: {
                heading: "Test Heading",
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
                image: {
                    data: {
                        attributes: {
                            formats: {
                                small: {
                                    width: 100,
                                    height: 100,
                                    url: "test-image-url",
                                },
                            },
                        },
                    },
                },
                slug: "test-slug",
                createdAt: "2022-01-01",
                updatedAt: "2022-01-01",
                publishedAt: "2022-01-01",
            },
        };
        render(<PostPreview article={articleMock} />);

        expect(screen.getByAltText("Test Heading")).toBeInTheDocument();
        expect(screen.getByText("Test Heading")).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    // Renders article without image
    it("should render article without image when image attribute is missing", () => {
        const articleMock: Article = {
            id: 1,
            attributes: {
                heading: "Test Heading",
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
                slug: "test-slug",
                createdAt: "2022-01-01",
                updatedAt: "2022-01-01",
                publishedAt: "2022-01-01",
            },
        };

        render(<PostPreview article={articleMock} />);

        expect(screen.queryByAltText("Test Heading")).not.toBeInTheDocument();
    });

    // Renders article with valid link when slug attribute is present
    it("should render article with valid link when slug attribute is present", () => {
        const articleMock: Article = {
            id: 1,
            attributes: {
                heading: "Test Heading",
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
                image: {
                    data: {
                        attributes: {
                            formats: {
                                small: {
                                    width: 100,
                                    height: 100,
                                    url: "test-image-url",
                                },
                            },
                        },
                    },
                },
                slug: "test-slug",
                createdAt: "2022-01-01",
                updatedAt: "2022-01-01",
                publishedAt: "2022-01-01",
            },
        };
        render(<PostPreview article={articleMock} />);

        const linkElement = screen.getAllByRole("link")[0];
        expect(linkElement).toHaveAttribute("href", "/blog/test-slug");
    });
});
