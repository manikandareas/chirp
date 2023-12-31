'use client';
import { useFormPost } from '@/app/context/FormPostProvider';
import { ChangeEvent, useEffect } from 'react';

export default function TextArea() {
    const { contentState, setContentState, textAreaRef } = useFormPost();
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContentState(e.target.value);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.minHeight = '2.75rem';
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height =
                textAreaRef.current.scrollHeight + 'px';
        }
    }, [contentState]);

    return (
        <textarea
            ref={textAreaRef}
            className="w-full bg-transparent resize-none outline-none py-2"
            rows={1}
            maxLength={280}
            name="content"
            id="content"
            value={contentState}
            onChange={handleTextAreaChange}
            placeholder="What's on your mind?"
        />
    );
}
