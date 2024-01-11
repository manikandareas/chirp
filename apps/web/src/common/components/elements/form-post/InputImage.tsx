'use client';

import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { cn } from '@/common/lib/utils';
import { ImageIcon } from 'lucide-react';

type InputImageProps = {
    filesInputState: (File | Blob | MediaSource)[];
    setFilesInputState: Dispatch<SetStateAction<(File | Blob | MediaSource)[]>>;
    filesURL: string[];
    setFilesURL: Dispatch<SetStateAction<string[]>>;
};
export default function InputImage(props: InputImageProps) {
    const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        if (!props.filesInputState) {
            const files = [e.target.files[0]];
            props.setFilesInputState(files);
        } else {
            const files = [...props.filesInputState, e.target.files[0]];
            props.setFilesInputState(files);
        }
    };

    useEffect(() => {
        if (props.filesInputState) {
            const filesURL = props.filesInputState.map((file) =>
                URL.createObjectURL(file),
            );
            props.setFilesURL(filesURL);
        }
    }, [props.filesInputState]);
    return (
        <div className="group/inputFiles grid place-items-center">
            <label
                htmlFor="filesInput"
                title="Media"
                className={cn(
                    'cursor-pointer rounded-full p-2 group-hover/inputFiles:bg-primary/10',
                    {
                        'cursor-not-allowed group-hover/inputFiles:bg-neutral-400/10':
                            props.filesInputState.length === 4,
                    },
                )}
                aria-disabled={props.filesInputState.length === 4}
            >
                <ImageIcon
                    size={20}
                    className={cn('text-primary', {
                        'text-neutral-400': props.filesInputState.length === 4,
                    })}
                />
                <input
                    onChange={handleInputFileChange}
                    type="file"
                    id="filesInput"
                    name="filesInput"
                    accept="image/*"
                    className="sr-only"
                    disabled={props.filesInputState.length === 4}
                />
            </label>
        </div>
    );
}
