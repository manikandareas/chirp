import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import * as schema from '@chirp/db';
import { CreateUserDto, UpdateUserDto } from '@chirp/dto';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { combinerName, nullishObjectChecker } from 'src/lib/utils';

@Injectable()
export class UserService {
    constructor(private readonly drizzle: DrizzleService) {}

    private readonly db: NeonHttpDatabase<typeof schema> = this.drizzle.getDb();
    /**
     * Registers a new user.
     *
     * @param {CreateUserDto} createUserDto - The data for creating a new user.
     * @return {Promise<object>} The created user without the password.
     */
    async registerUser(createUserDto: CreateUserDto) {
        const user = await this.findByEmail(createUserDto.email);

        if (user) throw new ConflictException('email already exist');
        // Combine first and last_name for name
        const fullName = combinerName(
            user,
            createUserDto.firstName,
            createUserDto.lastName
        );
        console.log({ createUserDto });
        const createdUsers = await this.db
            .insert(schema.users)
            .values({
                ...createUserDto,
                avatarUrl: `https://ui-avatars.com/api/?name=${fullName}`,
                fullName,
                password: await hash(createUserDto.password, 10),
            })
            .returning();

        // Extract created user without password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...createdUser } = createdUsers[0];

        return createdUser;
    }

    /**
     * Checks the availability of a username and/or email.
     *
     * @param {string} username - The username to check.
     * @param {string} email - The email to check.
     * @return {Object} - Returns an object with a message indicating availability.
     */
    async checkAvailability(username?: string, email?: string) {
        if (username) {
            const usernameCheck = await this.findByUsername(username);
            if (usernameCheck)
                throw new ConflictException('Username already exist');
        }
        if (email) {
            const emailCheck = await this.findByEmail(email);
            if (emailCheck) throw new ConflictException('Email already exist');
        }
        return {
            message: 'Available',
        };
    }

    /**
     * Finds a user by username.
     *
     * @param {string} username - The username of the user to find.
     * @return {Promise<User | null>} - A promise that resolves to the found user or null if not found.
     */
    async findByUsername(username: string) {
        return await this.db.query.users.findFirst({
            where: (user, { eq }) => eq(user.username, username),
        });
    }

    /**
     * Finds a user by their email.
     *
     * @param {string} email - The email of the user.
     * @return {Promise<User | null>} - A promise that resolves to the user object if found, otherwise null.
     */
    async findByEmail(email: string) {
        return await this.db.query.users.findFirst({
            where: (user, { eq }) => eq(user.email, email),
        });
    }

    /**
     * Find a user by their ID.
     *
     * @param {string} id - The ID of the user to find.
     * @return {Promise<User | null>} - A promise that resolves with the found user or null if not found.
     */
    async findById(id: string) {
        return await this.db.query.users.findFirst({
            where: (user, { eq }) => eq(user.id, id),
        });
    }

    /**
     * Updates a user with the given ID using the provided data.
     *
     * @param {string} id - The ID of the user to update.
     * @param {UpdateUserDto} updateUserDto - The data to update the user with.
     * @return {Promise<User>} - The updated user.
     */
    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findById(id);

        // Throwing if user with email already exist
        if (!user) throw new NotFoundException();
        // Throwing if updateUserDto is not contain ant attibute to be update
        if (!nullishObjectChecker(updateUserDto))
            throw new BadRequestException();
        // Combine first and last_name for name
        const fullName = combinerName(
            user,
            updateUserDto.firstName,
            updateUserDto.lastName
        );

        const updatedUsers = await this.db
            .update(schema.users)
            .set({
                ...user,
                ...updateUserDto,
                fullName: fullName ? fullName : user.fullName,
            })
            .where(eq(schema.users.id, id))
            .returning();

        // Extract created user without password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...updatedUser } = updatedUsers[0];
        return updatedUser;
    }

    /**
     * Deletes a user from the database based on the provided user ID.
     *
     * This method first attempts to locate the user using the specified ID. If the user is found,
     * their information is removed from the database. If the user is not found, a NotFoundException is thrown.
     *
     * @param {string} id - The unique identifier (ID) of the user to be deleted.
     * @throws {NotFoundException} - Thrown if the user with the specified ID is not found.
     * @returns {Promise<void>} - Resolves with no data upon successful deletion.
     */
    async deleteUser(id: string) {
        const user = await this.findById(id);

        // Throw exception if user not found by id
        if (!user) throw new NotFoundException();

        await this.db.delete(schema.users).where(eq(schema.users.id, user.id));
        return;
    }
}
