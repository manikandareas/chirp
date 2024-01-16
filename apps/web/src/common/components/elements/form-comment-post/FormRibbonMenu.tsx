import InputEmoji from '@/common/components/elements/InputEmoji';

import { useFormCommentPostContext } from './context/FormCommentPostProvider';
import FormInputImage from './FormInputImage';

export default function FormRibbonMenu() {
    const {
        filesInputState,
        setFilesInputState,
        filesURL,
        setFilesURL,
        setContentState,
        contentState,
    } = useFormCommentPostContext();

    const handelInputEmoji = (e: string) => {
        setContentState(contentState + e);
    };
    return (
        <div className="relative flex items-center space-x-2">
            <FormInputImage
                filesInputState={filesInputState}
                setFilesInputState={setFilesInputState}
                filesURL={filesURL}
                setFilesURL={setFilesURL}
            />
            <InputEmoji onSelect={handelInputEmoji} />
        </div>
    );
}
