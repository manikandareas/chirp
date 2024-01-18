import { CreateCommentDto, UpdateCommentDto } from '@chirp/dto';
import { Injectable } from '@nestjs/common';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { desc, eq, and, isNull } from 'drizzle-orm';
import * as schema from '@chirp/db';
import { DrizzleService } from '~/drizzle/drizzle.service';

@Injectable()
export class CommentsService {
    private readonly db: NeonHttpDatabase<typeof schema>;
    constructor(private readonly drizzle: DrizzleService) {
        this.db = this.drizzle.getDb();
    }

    async createComment(
        idPost: string,
        createCommentDto: CreateCommentDto,
        reqUserId: any
    ) {
        return await this.db
            .insert(schema.comments)
            .values({
                ...createCommentDto,
                postId: idPost,
                authorId: reqUserId,
            })
            .returning();
    }

    async update(
        postId: string,
        updateCommentDto: UpdateCommentDto,
        commentId
    ) {
        return 'bro';
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }

    async isOwnerComment(id: string, user): Promise<boolean> {
        const requestedPostId = await this.db.query.comments.findFirst({
            where: and(
                eq(schema.comments.id, id),
                eq(schema.comments.authorId, user.id)
            ),
            columns: {
                authorId: true,
            },
        });
        console.log(requestedPostId);
        return requestedPostId.authorId === user.id;
    }
}
