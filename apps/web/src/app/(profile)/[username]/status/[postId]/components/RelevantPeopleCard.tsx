'use client';
import UserAvatar from '@/common/components/elements/UserAvatar';
import { Button } from '@/common/components/ui/button';
import { usePostDetail } from '../context/PostDetailProvider';

export default function RelevantPeopleCard() {
    const { data } = usePostDetail();

    if (!data) return <h1>Not Found</h1>;
    return (
        <aside
            aria-label="Relevant people"
            className="w-[21.875rem] lg:block hidden border rounded-2xl overflow-hidden p-4 space-y-4"
        >
            <div className="flex">
                <h1 className="text-xl font-semibold">Relevant People</h1>
            </div>

            <div className="flex space-x-2">
                <div className="w-fit">
                    <UserAvatar src={data.data.author.avatarUrl} />
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between w-full pt-[2px]">
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
                    <p className="text-sm text-neutral-200 leading-snug">
                        Akun Resmi Radio Elshinta Jakarta 90FM | News and Talk |
                        Telp: 021-5869000 | SMS & WA: 081-180-6543 | Streaming :{' '}
                    </p>
                </div>
            </div>
        </aside>
    );
}
