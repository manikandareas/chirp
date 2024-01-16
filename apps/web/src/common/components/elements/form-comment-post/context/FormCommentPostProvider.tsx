'use client';

import React, {
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    type ElementRef,
} from 'react';

export type TFormCommentPostContext = {
    filesInputState: (File | Blob | MediaSource)[];
    setFilesInputState: Dispatch<SetStateAction<(File | Blob | MediaSource)[]>>;
    filesURL: string[];
    setFilesURL: Dispatch<SetStateAction<string[]>>;
    contentState: string;
    setContentState: Dispatch<SetStateAction<string>>;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

const FormCommentPostContext =
    React.createContext<TFormCommentPostContext | null>(null);

export const FormCommentPostProvider: FC<PropsWithChildren<{}>> = ({
    children,
}) => {
    const [filesInputState, setFilesInputState] = React.useState<
        (File | Blob | MediaSource)[]
    >([]);

    const [filesURL, setFilesURL] = React.useState<string[]>([]);

    const [contentState, setContentState] = React.useState<string>('');

    const textAreaRef = React.useRef<ElementRef<'textarea'>>(null);

    return (
        <FormCommentPostContext.Provider
            value={{
                filesInputState,
                setFilesInputState,
                filesURL,
                setFilesURL,
                contentState,
                setContentState,
                textAreaRef,
            }}
        >
            {children}
        </FormCommentPostContext.Provider>
    );
};

export const useFormCommentPostContext = () => {
    const context = React.useContext(FormCommentPostContext);

    if (!context)
        throw new Error(
            'useFormCommentPostContext must be used within FormCommentPostProvider',
        );
    return context;
};
