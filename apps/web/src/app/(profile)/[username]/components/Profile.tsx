'use client';
import UserAvatar from '@/common/components/elements/UserAvatar';
import Image from 'next/image';
import React from 'react';
import { useProfileUserContext } from '../context/ProfileProvider';
import { Button } from '@/common/components/ui/button';
import { Mail, MoreHorizontal } from 'lucide-react';
import ProfileLoading from './ProfileLoading';

type ProfileProps = object;

const Profile: React.FC<ProfileProps> = () => {
    const { data: user } = useProfileUserContext();

    if (!user?.data) return <ProfileLoading />;
    return (
        <div className="relative min-h-[25rem]">
            {/* Cover Image */}
            <div className="relative aspect-[16/5] max-h-[12.5rem] w-full">
                <Image
                    src={
                        'https://images.unsplash.com/photo-1705091688078-553b715e1c83?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                    layout="fill"
                    alt="Profile Cover Image"
                    objectFit="cover"
                />
                {/* Avatar */}
                <div className="absolute bottom-0 left-4  aspect-square w-28 translate-y-1/2 rounded-full border-[3px] border-background sm:w-32">
                    <UserAvatar
                        src={user?.data.avatarUrl}
                        className="h-full w-full"
                    />
                </div>
            </div>
            {/* User Profile */}
            <div className="w-full space-y-4 px-4 py-3">
                {/* Button Action */}
                <div className="flex justify-end gap-x-2">
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="rounded-full border"
                    >
                        <MoreHorizontal size={18} />
                    </Button>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="rounded-full border"
                    >
                        <Mail size={18} />
                    </Button>
                    <Button
                        size={'sm'}
                        className="rounded-full bg-white text-black hover:bg-white/90"
                    >
                        Follow
                    </Button>
                </div>
                {/* Detail User */}
                <div className="space-y-2">
                    <div className="leading-tight">
                        <h1 className="text-xl font-semibold">
                            {user?.data.fullName}
                        </h1>
                        <small className="text-muted-foreground">
                            @{user.data.username}
                        </small>
                    </div>
                    <p className="text-sm font-normal text-neutral-200">
                        Sub Tanyarl ✦ Menfess bot for sharing rl things ⸻ Follow
                        first and use Tanyarl or 💚 for automenfess ✦ Pengaduan
                        : @cptanyarl ┆Panduan menfess klik link 👇🏻
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
