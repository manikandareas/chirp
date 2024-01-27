export const comments = [
    {
        id: '1',
        message: 'Comment level 1',
        parentId: null,
        createdAt: '2024-01-18T08:00:00.000Z',
        updatedAt: '2024-01-18T08:00:00.000Z',
        author: {
            id: 'user1',
            username: 'user1',
            avatarUrl: 'https://ui-avatars.com/api/?name=User 1',
        },
        replies: [
            {
                id: '2',
                message:
                    'This is most commonly used to remove a border radius that was applied at a smaller breakpoint.',
                parentId: '1',
                createdAt: '2024-01-18T08:05:00.000Z',
                updatedAt: '2024-01-18T08:05:00.000Z',
                author: {
                    id: 'user2',
                    username: 'user2',
                    avatarUrl: 'https://ui-avatars.com/api/?name=User 2',
                },
                replies: [
                    {
                        id: '3',
                        message: 'Reply level 3',
                        parentId: '2',
                        createdAt: '2024-01-18T08:10:00.000Z',
                        updatedAt: '2024-01-18T08:10:00.000Z',
                        author: {
                            id: 'user3',
                            username: 'user3',
                            avatarUrl:
                                'https://ui-avatars.com/api/?name=User 3',
                        },
                        replies: [],
                    },
                ],
            },
            {
                id: '4',
                message:
                    'Use utilities like rounded-sm, rounded, or rounded-lg to apply different border radius sizes to an element.',
                parentId: '1',
                createdAt: '2024-01-18T08:15:00.000Z',
                updatedAt: '2024-01-18T08:15:00.000Z',
                author: {
                    id: 'user4',
                    username: 'user4',
                    avatarUrl: 'https://ui-avatars.com/api/?name=User 4',
                },
                replies: [],
            },
        ],
    },
    {
        id: '5',
        message: 'Comment level 1',
        parentId: null,
        createdAt: '2024-01-18T08:20:00.000Z',
        updatedAt: '2024-01-18T08:20:00.000Z',
        author: {
            id: 'user5',
            username: 'user5',
            avatarUrl: 'https://ui-avatars.com/api/?name=User 5',
        },
        replies: [
            {
                id: '6',
                message: 'Reply level 2',
                parentId: '5',
                createdAt: '2024-01-18T08:25:00.000Z',
                updatedAt: '2024-01-18T08:25:00.000Z',
                author: {
                    id: 'user6',
                    username: 'user6',
                    avatarUrl: 'https://ui-avatars.com/api/?name=User 6',
                },
                replies: [],
            },
            {
                id: '7',
                message: 'Reply level 2',
                parentId: '5',
                createdAt: '2024-01-18T08:30:00.000Z',
                updatedAt: '2024-01-18T08:30:00.000Z',
                author: {
                    id: 'user7',
                    username: 'user7',
                    avatarUrl: 'https://ui-avatars.com/api/?name=User 7',
                },
                replies: [
                    {
                        id: '8',
                        message: 'Reply level 3',
                        parentId: '7',
                        createdAt: '2024-01-18T08:35:00.000Z',
                        updatedAt: '2024-01-18T08:35:00.000Z',
                        author: {
                            id: 'user8',
                            username: 'user8',
                            avatarUrl:
                                'https://ui-avatars.com/api/?name=User 8',
                        },
                        replies: [],
                    },
                ],
            },
        ],
    },
];

export type TComments = typeof comments;
