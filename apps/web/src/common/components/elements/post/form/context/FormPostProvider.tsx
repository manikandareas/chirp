'use client';

import React, {
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    type ElementRef,
} from 'react';

export type TFormPostContext = {
    filesInputState: (File | Blob | MediaSource)[];
    setFilesInputState: Dispatch<SetStateAction<(File | Blob | MediaSource)[]>>;
    filesURL: string[];
    setFilesURL: Dispatch<SetStateAction<string[]>>;
    contentState: string;
    setContentState: Dispatch<SetStateAction<string>>;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

const FormPostContext = React.createContext<TFormPostContext | null>(null);

export const FormPostProvider: FC<PropsWithChildren> = ({ children }) => {
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

export const useFormPostContext = () => {
    const context = React.useContext(FormPostContext);

    if (!context)
        throw new Error(
            'useFormPostContext must be used within FormPostProvider',
        );
    return context;
};
