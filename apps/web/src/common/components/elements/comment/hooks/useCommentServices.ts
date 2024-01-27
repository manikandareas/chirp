import { ElementRef, useRef, useState } from 'react';

export const useCommentService = () => {
    const [content, setContent] = useState<string>('');
    const textAreaRef = useRef<ElementRef<'textarea'>>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return {
        content,
        setContent,
        textAreaRef,
        isModalOpen,
        setIsModalOpen,
    };
};
