'use client';

import { cn } from '@/common/lib/utils';
import { ChangeEvent, ComponentProps, RefObject, useEffect } from 'react';

type GrowingTextAreaProps = Omit<ComponentProps<'textarea'>, 'className'> & {
    state: string;
    setState: (value: string) => void;
    classNames?: string;
    textAreaRef: RefObject<HTMLTextAreaElement>;
};
const GrowingTextArea: React.FC<GrowingTextAreaProps> = (props) => {
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.setState(e.target.value);
    };

    useEffect(() => {
        if (props.textAreaRef.current) {
            props.textAreaRef.current.style.minHeight = '2.75rem';
            props.textAreaRef.current.style.height = 'auto';
            props.textAreaRef.current.style.height =
                props.textAreaRef.current.scrollHeight + 'px';
        }
    }, [props.state, props.textAreaRef]);

    return (
        <textarea
            ref={props.textAreaRef}
            className={cn(
                'w-full resize-none bg-transparent py-2 outline-none',
                props.classNames,
            )}
            rows={1}
            maxLength={280}
            name="content"
            id="content"
            value={props.state}
            onChange={handleTextAreaChange}
            placeholder={props.placeholder}
            {...props}
        />
    );
};
export default GrowingTextArea;
