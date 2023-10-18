export const useVideo = (videoSrc: string) => {
  let videoId = videoSrc;
  
  if (videoSrc.includes('v=')) {
    videoId = videoSrc.replace(/.+(v=)/g, '');
  }

  if (videoSrc.includes('youtu.be')) {
    videoId = videoSrc.replace(/.+(youtu.be\/)/g, '');
  }

  const embedSrc = `https://www.youtube.com/embed/${videoId}`;
  return embedSrc;
}