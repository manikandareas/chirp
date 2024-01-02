'use client';
import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import React from 'react';

export type FormPostContextOptions = {
    filesInputState: (File | Blob | MediaSource)[];
    setFilesInputState: Dispatch<SetStateAction<(File | Blob | MediaSource)[]>>;
    filesURL: string[];
    setFilesURL: Dispatch<SetStateAction<string[]>>;
    contentState: string;
    setContentState: Dispatch<SetStateAction<string>>;
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

    return (
        <FormPostContext.Provider
            value={{
                filesInputState,
                setFilesInputState,
                filesURL,
                setFilesURL,
                contentState,
                setContentState,
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
