const player = ref(new Audio);
const loadedFiles = ref(0);
const audioFiles = ref([]) as any;

export const useAudioTrack = () => useState<any>('audioTrack', () => null)

export const setAudioTrack = (src: string) => {
  useAudioTrack().value = src;
  player.value.src = src;
}

export const useAudioTitle = () => useState<any>('audioTitle', () => null)

export const setAudioTitle = (title: string | undefined) => {
  useAudioTitle().value = title;
}

export const useIsAudioLoaded = () => useState<boolean>('isAudioLoaded', () => false)

export const setIsAudioLoaded = (isLoaded: boolean) => {
  useIsAudioLoaded().value = isLoaded;
}

export const useIsAudioAllowed = () => useState<boolean>('isAudioAllowed', () => false)

export const setIsAudioAllowed = (isAllowed: boolean) => {
  useIsAudioAllowed().value = isAllowed;
}

export const useLoadAudio = (files: string[]) => {
  if (!files?.length) return;
  // Reset isLoaded to false when new files are being loaded
  setIsAudioLoaded(false);

  files?.forEach(src => {
    const loadPlayer = new Audio();
    loadPlayer.addEventListener('canplaythrough', onAudioLoaded, false);
    loadPlayer.src = src;
    audioFiles.value.push(loadPlayer);
  })
}

const onAudioLoaded = () => {
  loadedFiles.value++;

  if (loadedFiles.value == audioFiles.value.length - 1){
    setIsAudioLoaded(true);
  }
}

export const useAudioPlayer = () => {  
  addEventListener("blur", () => pause());
  
  const play = (src: string, title: string | undefined) => {
    setAudioTrack(src);
    setAudioTitle(title);

    if (!isPlaying() && useIsAudioAllowed().value && useIsAudioLoaded().value) {
      player.value.play();
    }
  }

  const pause = () => {    
    setAudioTitle('');
    if (isPlaying()) player.value.pause();
  }

  const isPlaying = () => {
    return player.value.currentTime > 0
      && !player.value.paused
      && !player.value.ended
      && player.value.readyState > player.value.HAVE_CURRENT_DATA
  }

  return {
    isPlaying,
    play,
    pause,
  }
}