'use client';

import UserAvatar from '@/common/components/elements/UserAvatar';
import { Button } from '@/common/components/ui/button';

import { usePostDetailContext } from '../context/PostDetailProvider';

export default function PostDetailRelevantCardPeople() {
    const { data } = usePostDetailContext();

    if (!data) return <h1>Not Found</h1>;
    return (
        <aside
            aria-label="Relevant people"
            className="hidden w-[21.875rem] space-y-4 overflow-hidden rounded-2xl border p-4 lg:block"
        >
            <div className="flex">
                <h1 className="text-xl font-semibold">Relevant People</h1>
            </div>

            <div className="flex space-x-2">
                <div className="w-fit">
                    <UserAvatar src={data.data.author.avatarUrl} />
                </div>

                <div className="space-y-1">
                    <div className="flex w-full justify-between pt-[2px]">
                        <div className="leading-[8px]">
                            <h1 className="text-sm">
                                {data.data.author.fullName}
                            </h1>
                            <small className="text-muted-foreground">
                                @{data.data.author.username}
                            </small>
                        </div>
                        <Button className="rounded-full" size={'sm'}>
                            Follow
                        </Button>
                    </div>
                    <p className="text-sm leading-snug text-neutral-200">
                        Akun Resmi Radio Elshinta Jakarta 90FM | News and Talk |
                        Telp: 021-5869000 | SMS & WA: 081-180-6543 | Streaming :{' '}
                    </p>
                </div>
            </div>
        </aside>
    );
}
