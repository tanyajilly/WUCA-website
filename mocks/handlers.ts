import { HttpResponse, http } from 'msw'

export const handlers = [
    http.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?populate=image&pagination[page]=1&pagination[pageSize]=2`, () => {
        return HttpResponse.json({
            "data": [
                {
                    "id": 1,
                    "attributes": {
                        "heading": "Test title",
                        "content": [
                            {
                                "type": "paragraph",
                                "children": [
                                    {
                                        "type": "text",
                                        "text": "Test content"
                                    }
                                ]
                            }
                        ],
                        "createdAt": "2024-01-10T23:04:45.072Z",
                        "updatedAt": "2024-01-11T21:35:14.631Z",
                        "publishedAt": "2024-01-10T23:05:35.067Z",
                        "slug": "test-article-1",
                        "image": {
                            "data": {
                                "attributes": {
                                    "width": 100,
                                    "height": 100,
                                    "url": 'test-image.jpg'
                                }
                            }
                        },
                    }
                },
                {
                    "id": 3,
                    "attributes": {
                        "heading": "Christmas",
                        "content": [
                            {
                                "type": "paragraph",
                                "children": [
                                    {
                                        "type": "text",
                                        "text": "Christmas in Winchester"
                                    }
                                ]
                            }
                        ],
                        "createdAt": "2024-01-11T11:08:45.380Z",
                        "updatedAt": "2024-01-18T21:15:21.615Z",
                        "publishedAt": "2024-01-11T11:08:47.230Z",
                        "slug": "christmas-1"
                    }
                },
            ],
            "meta": {
                "pagination": {
                    "page": 1,
                    "pageSize": 25,
                    "pageCount": 1,
                    "total": 5
                }
            }
        }
    )
    }),
    // http.post('/todos', async (req, res, ctx) => {
    //     const { title } = await req.json()

    //     return res(
    //         ctx.status(201),
    //         ctx.json(
    //             {
    //                 "userId": 1,
    //                 "title": title,
    //                 "completed": false,
    //                 "id": 5
    //             }),
    //     )
    // }),
    // rest.put('/todos/:id', async (req, res, ctx) => {
    //     const { id, userId, title, completed } = await req.json()

    //     return res(
    //         ctx.status(200),
    //         ctx.json(
    //             {
    //                 userId,
    //                 title,
    //                 completed,
    //                 id
    //             }),
    //     )
    // }),
    // rest.delete('/todos/:id', (req, res, ctx) => {
    //     const { id } = req.params

    //     return res(
    //         ctx.status(200),
    //         ctx.json(
    //             {
    //                 id: Number(id)
    //             }),
    //     )
    // }),
]