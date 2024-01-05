import { useFormPost } from '@/app/context/FormPostProvider';
import InputImage from './InputImage';
import InputEmoji from './InputEmoji';

export default function RiibbonMenu() {
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
        <div className="flex space-x-2 relative items-center">
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
