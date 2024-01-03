'use client';
import {
    Dispatch,
    type ElementRef,
    FC,
    PropsWithChildren,
    SetStateAction,
} from 'react';
import React from 'react';

export type FormPostContextOptions = {
    filesInputState: (File | Blob | MediaSource)[];
    setFilesInputState: Dispatch<SetStateAction<(File | Blob | MediaSource)[]>>;
    filesURL: string[];
    setFilesURL: Dispatch<SetStateAction<string[]>>;
    contentState: string;
    setContentState: Dispatch<SetStateAction<string>>;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

const FormPostContext = React.createContext<FormPostContextOptions | null>(
    null
);

export const FormPostProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [filesInputState, setFilesInputState] = React.useState<
        (File | Blob | MediaSource)[]
    >([]);

    const [filesURL, setFilesURL] = React.useState<string[]>([]);

    const [contentState, setContentState] = React.useState<string>('');

    const textAreaRef = React.useRef<ElementRef<'textarea'>>(null);

    return (
        <FormPostContext.Provider
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
        </FormPostContext.Provider>
    );
};

export const useFormPost = () => {
    const context = React.useContext(FormPostContext);

    if (!context)
        throw new Error('useFormPost must be used within FormPostProvider');
    return context;
};
