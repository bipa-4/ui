import { useTranslation } from 'next-i18next';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiPushpin2Fill } from 'react-icons/ri';

type CommentDropDownPropsType = {
  commentLevel: 'parent' | 'child';
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isPicked: boolean;
  deleteComment: () => void;
  pinComment: () => void;
  unpinComment: () => void;
  isChannelOwner?: boolean;
  isCommentWriter?: boolean;
  isCommentDropdownOpen: boolean;
  setIsCommentDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CommentDropDown({
  commentLevel,
  isEditing,
  setIsEditing,
  isPicked,
  deleteComment,
  pinComment,
  unpinComment,
  isChannelOwner,
  isCommentWriter,
  isCommentDropdownOpen,
  setIsCommentDropdownOpen,
}: CommentDropDownPropsType) {
  const { t } = useTranslation('videoDetail');

  if (isEditing) return null;
  if (!isChannelOwner && !isCommentWriter) return null;
  if (!isCommentWriter && commentLevel === 'child') return null;

  const handleDropdown = () => {
    setIsCommentDropdownOpen(true);
  };

  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} className='btn btn-xs btn-ghost rounded-full m-1' onClick={handleDropdown}>
        <FiMoreHorizontal className='w-4 h-4' />
      </label>
      {isCommentDropdownOpen && (
        <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow rounded-box w-32  bg-base-200'>
          {isChannelOwner && commentLevel === 'parent' && (
            <li>
              {isPicked ? (
                <div className='text-sm font-bold opacity-80' onClick={unpinComment}>
                  {t('comment.unpin')}
                </div>
              ) : (
                <div className='text-sm font-bold opacity-80' onClick={pinComment}>
                  <RiPushpin2Fill />
                  {t('comment.pin')}
                </div>
              )}
            </li>
          )}
          {isCommentWriter && (
            <>
              <li>
                <div className='pr-3 text-blue-500 text-sm font-bold' onClick={() => setIsEditing(true)}>
                  {t('modify')}
                </div>
              </li>
              <li>
                <div className='text-red-500 text-sm font-bold' onClick={deleteComment}>
                  {t('delete')}
                </div>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

CommentDropDown.defaultProps = {
  isChannelOwner: false,
  isCommentWriter: false,
};
