import React from 'react';

import { Button } from '../ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import UserAvatar from './UserAvatar';

type AuthorType = {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl: string;
};

export default function PopupInformationForUser(
    props: React.PropsWithChildren<AuthorType>,
) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{props.children}</TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    className="rounded-2xl shadow-white/20"
                >
                    <div className="w-[18.75rem] space-y-2 p-2">
                        <div className="flex justify-between">
                            <div className="space-y-1.5 leading-tight">
                                <UserAvatar
                                    src={props.avatarUrl}
                                    className="h-14 w-14"
                                />
                                <h1>{props.fullName}</h1>
                                <small className="text-sm text-muted-foreground">
                                    @{props.username}
                                </small>
                            </div>

                            <div>
                                <Button className="rounded-full" size={'sm'}>
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm">
                                Menfess bot for sharing about rl things
                                ✨┆Follow first & Use Tanyarl or 💚 for autopost
                                • Pengaduan : @cptanyarl , Operated by @suvpen ⸻
                                More info check link👇
                            </p>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
