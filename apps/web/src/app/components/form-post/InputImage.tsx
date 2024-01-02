'use client';
import { ImageIcon } from 'lucide-react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';

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
                URL.createObjectURL(file)
            );
            props.setFilesURL(filesURL);
        }
    }, [props.filesInputState]);
    return (
        <div className="p-2 rounded-full group/inputFiles hover:bg-sky-500/10">
            <label
                htmlFor="filesInput"
                className="cursor-pointer group-hover/inputFiles:"
            >
                <ImageIcon size={20} className="text-sky-500" />
            </label>
            <input
                onChange={handleInputFileChange}
                type="file"
                id="filesInput"
                name="filesInput"
                accept="image/*"
                className="sr-only"
            />
        </div>
    );
}
