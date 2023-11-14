import { useTranslation } from 'next-i18next';
import { FiMoreHorizontal } from 'react-icons/fi';

type CommentDropDownPropsType = {
  commentLevel: 'parent' | 'child';
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  deleteComment: () => void;
  pinComment: () => void;
  unpinComment: () => void;
  isChannelOwner?: boolean;
  isCommentWriter?: boolean;
};

export default function CommentDropDown({
  commentLevel,
  isEditing,
  setIsEditing,
  deleteComment,
  pinComment,
  unpinComment,
  isChannelOwner,
  isCommentWriter,
}: CommentDropDownPropsType) {
  const { t } = useTranslation('videoDetail');

  // dropdown : isEdit==False일때만 보인다.
  // 영상 주인인 경우: 고정
  // 본인이 쓴 댓글일 경우: 수정, 삭제

  if (isEditing) return null;
  if (!isChannelOwner && !isCommentWriter) return null;

  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} className='btn btn-xs btn-ghost rounded-full m-1'>
        <FiMoreHorizontal className='w-4 h-4' />
      </label>
      <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow rounded-box w-32  bg-base-200'>
        {isCommentWriter && (
          <>
            <li>
              <div className='pr-3 text-blue-600 text-sm font-bold' onClick={() => setIsEditing(true)}>
                {t('modify')}
              </div>
            </li>
            <li>
              <div className='text-red-600 text-sm font-bold' onClick={deleteComment}>
                {t('delete')}
              </div>
            </li>
          </>
        )}
        {/* 부모댓글일때만, 채널 주인일때만 고정이 가능하다. */}
        {isChannelOwner && commentLevel === 'parent' && (
          <>
            <li>
              <div className='text-sm font-bold' onClick={pinComment}>
                {t('comment.pin')}
              </div>
            </li>
            <li>
              <div className='text-sm font-bold' onClick={unpinComment}>
                {t('comment.unpin')}
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

CommentDropDown.defaultProps = {
  isChannelOwner: false,
  isCommentWriter: false,
};
