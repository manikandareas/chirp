'use client';
import UserAvatar from '@/common/components/elements/UserAvatar';
import { useAuthStore } from '@chirp/zustand';
import { MoreHorizontal } from 'lucide-react';

export default function UserWizard() {
    const user = useAuthStore((state) => state.user);
    return (
        <>
            {user ? (
                <div className="flex justify-between items-center sm:p-4  hover hover:bg-neutral-900 rounded-full cursor-pointer">
                    <div className="flex gap-4 items-center">
                        <UserAvatar src={user.avatarUrl} fallback="..." />
                        <div className="leading-tight hidden xl:block">
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
