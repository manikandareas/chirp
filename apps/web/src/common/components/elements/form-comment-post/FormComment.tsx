'use client';

import React, { FormEvent, useState } from 'react';

import Form from './Form';

type FormCommentProps = {};

const FormComment: React.FC<FormCommentProps> = () => {
    const [isPending, setIsPending] = useState<boolean>(false);

    const onFormCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        new Promise((resolve) => {
            setTimeout(resolve, 3000);
        }).then(() => setIsPending(false));
    };

    return (
        <Form
            isPending={isPending}
            onSubmit={onFormCommentSubmit}
            type="comment"
        />
    );
};

export default FormComment;
