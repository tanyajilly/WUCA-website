import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Posts from "@/app/ui/posts";
import { ArticlesResponse } from '@/app/lib/definitions';

describe('Posts', () => {

    // Renders a list of post previews based on the data fetched from the API
    it('should render post previews when data is fetched from the API', () => {
      // Mock the useSWR hook to return a mocked data object
      const mockData: ArticlesResponse = {
        data: [
          {
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
          },
          {
            id: 3,
            attributes: {
                heading: "Christmas",
                content: [],
                createdAt: "2024-01-11T11:08:45.380Z",
                updatedAt: "2024-01-18T21:15:21.615Z",
                publishedAt: "2024-01-11T11:08:47.230Z",
                slug: "christmas-1"
            }
        },
        ],
        meta: {
          pagination: {
            pageCount: 1,
            page: 1,
            pageSize: 2,
            total: 2
          }
        }
      };

      // Render the component
      render(<Posts articles={mockData} />);

      // Assert that the post preview is rendered
      expect(screen.getByText('Test Heading')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should not render pagination component when isPagination is true and only one page', () => {
        const mockData: ArticlesResponse = {
            data: [
              {
                id: 1,
                attributes: {
                    heading: 'Test Heading',
                    content: [],
                    createdAt: '2022-01-01',
                    updatedAt: '2022-01-01',
                    publishedAt: '2022-01-01',
                    slug: 'test-post'
                }
              },
            ],
        meta: {
            pagination: {
                pageCount: 1,
                page: 1,
                pageSize: 2,
                total: 1
              }
        }
      };
      // Render the component with isPagination set to true
      render(<Posts articles={mockData} isPagination={true} />);

      // Assert that the pagination component is rendered
      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });
});
