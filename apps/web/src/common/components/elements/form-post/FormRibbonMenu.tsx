import { useFormPost } from './context/FormPostProvider';
import InputEmoji from '@/common/components/elements/InputEmoji';

import InputImage from './InputImage';

export default function FormRibbonMenu() {
    const {
        filesInputState,
        setFilesInputState,
        filesURL,
        setFilesURL,
        setContentState,
        contentState,
    } = useFormPost();

    const handelInputEmoji = (e: string) => {
        setContentState(contentState + e);
    };
    return (
        <div className="relative flex items-center space-x-2">
            <InputImage
                filesInputState={filesInputState}
                setFilesInputState={setFilesInputState}
                filesURL={filesURL}
                setFilesURL={setFilesURL}
            />
            <InputEmoji onSelect={handelInputEmoji} />
        </div>
    );
}
