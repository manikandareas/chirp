import * as schema from '@chirp/db';
import { InferSelectModel } from '@chirp/db/drizzle-orm';

type RawUser = InferSelectModel<typeof schema.users>;

export type User = Omit<RawUser, 'password'>;
