'use client';

import UserAvatar from '@/common/components/elements/UserAvatar';
import { useAuthStore } from '@chirp/zustand';
import { MoreHorizontal } from 'lucide-react';

export default function UserWizard() {
    const user = useAuthStore((state) => state.user);
    return (
        <>
            {user ? (
                <div className="hover flex cursor-pointer items-center  justify-between rounded-full hover:bg-neutral-900 sm:p-4">
                    <div className="flex items-center gap-4">
                        <UserAvatar src={user.avatarUrl} fallback="..." />
                        <div className="hidden leading-tight xl:block">
                            <h1>{user.fullName}</h1>
                            <h2 className="text-muted-foreground">
                                @{user.username}
                            </h2>
                        </div>
                    </div>
                    <MoreHorizontal className="hidden xl:block" />
                </div>
            ) : null}
        </>
    );
}
