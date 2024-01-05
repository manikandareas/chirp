import { InferSelectModel } from '@chirp/db/drizzle-orm';
import * as schema from '@chirp/db';

type RawUser = InferSelectModel<typeof schema.users>;

export type User = Omit<RawUser, 'password'>;
