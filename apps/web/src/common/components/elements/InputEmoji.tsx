'use client';

import { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile } from 'lucide-react';
import { useTheme } from 'next-themes';

type InputEmojiProps<T> = {
    onSelect: (props: T) => void;
};
const InputEmoji = ({ onSelect }: InputEmojiProps<string>) => {
    const { theme } = useTheme();
    const [showInputEmoji, setShowInputEmoji] = useState<boolean>(false);

    const handelInputEmoji = (e: any) => {
        // const sym = e.unified.split('_');
        // const codeArray: any = [];
        // sym.forEach((el: any) => codeArray.push('0x' + el));

        // let emoji = String.fromCodePoint(...codeArray);
        onSelect(e.native);
    };
    return (
        <>
            <button
                type="button"
                onClick={() => setShowInputEmoji(!showInputEmoji)}
                className="rounded-full p-2 hover:bg-sky-500/10"
                title="Emoji"
            >
                <Smile size={20} className="text-sky-500" />
            </button>
            {showInputEmoji ? (
                <div className="absolute left-1/2 top-full z-50">
                    <Picker
                        autoFocus
                        data={data}
                        theme={theme}
                        showPreview={false}
                        showSkinTones={false}
                        emojiSize={20}
                        emojiButtonSize={28}
                        onEmojiSelect={handelInputEmoji}
                    />
                </div>
            ) : null}
        </>
    );
};

export default InputEmoji;
