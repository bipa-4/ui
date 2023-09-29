import { CSSProperties, useRef, useEffect, useState, forwardRef } from 'react';
import useVideo from '@/hooks/useVideoJs';

interface VideoProps {
  sources: any['sources'];
  styles?: CSSProperties;
  videoOptions?: Omit<any, 'sources'>;
}

const Video = forwardRef<HTMLDivElement | null, VideoProps>(({ sources, styles, videoOptions }, refs) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<HTMLDivElement | null>(videoRef.current);
  const { player, playerReset } = useVideo({
    videoTarget: target,
    options: { sources, ...videoOptions },
  });

  useEffect(() => {
    if (player) playerReset();
  }, [sources]);

  useEffect(() => {
    if (videoRef.current) {
      setTarget(videoRef.current);
      playerReset();
    }
  }, [videoRef]);

  return (
    <div ref={refs}>
      <div ref={videoRef} style={styles} />
    </div>
  );
});

Video.displayName = 'Video';

export default Video;

Video.defaultProps = {
  styles: undefined,
  videoOptions: undefined,
};
