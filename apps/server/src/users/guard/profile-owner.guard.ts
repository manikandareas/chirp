import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class ProfileOwnerGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}

    /**
     * Check if the requested user is a valid requesting user.
     *
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user is the owner of the user.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requestingUserid = request.user;
        const requestedProfileId = request.params.id;
        const isUserOwner = await this.usersService.isUserOwner(
            requestedProfileId,
            requestingUserid
        );
        if (!isUserOwner) {
            throw new ForbiddenException(
                'You are not the owner of this profile!'
            );
        }
        return isUserOwner;
    }
}
