import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { SelectableComponentProps } from '@/common/lib/emoji-picker';
import { useTheme } from 'next-themes';
import { Smile } from 'lucide-react';
import { useState } from 'react';

const InputEmoji = ({ onSelect }: SelectableComponentProps<string>) => {
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
                className="hover:bg-sky-500/10 p-2 rounded-full"
                title="Emoji"
            >
                <Smile size={20} className="text-sky-500" />
            </button>
            {showInputEmoji ? (
                <div className="absolute top-full left-1/2 z-50">
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
