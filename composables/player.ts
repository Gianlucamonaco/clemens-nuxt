const player = ref(process.client ? new Audio : {} as any);
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

export const useIsAudioLoaded = (src: string) => {
  return audioFiles.value.indexOf(src) >= 0;
}

export const setIsAudioLoaded = (src: string) => {
  audioFiles.value.push(src);
}

export const useIsAudioAllowed = () => useState<boolean>('isAudioAllowed', () => false)

export const setIsAudioAllowed = (isAllowed: boolean) => {
  useIsAudioAllowed().value = isAllowed;
}

export const useLoadAudio = (files: string[]) => {
  if (!files?.length || process.server) return { then: (callback: () => void) => callback()};

  files?.forEach(src => {
    const loadPlayer = new Audio();

    if (loadPlayer) {
      loadPlayer.addEventListener('canplaythrough', () => onAudioLoaded(src), false);
      loadPlayer.src = src;
    }
  })

  return {
    then: (callback: () => void) => { callback() }
  }
}

const onAudioLoaded = (src: string) => {
  if (!useIsAudioLoaded(src)){
    setIsAudioLoaded(src);
  }
}

export const useAudioPlayer = () => {
  if (process.server) return {
    play: () => {},
    pause: () => {},
    isPlaying: false,
  };

  addEventListener("blur", () => pause());
  addEventListener("mouseout", () => pause());

  const play = (src: string, title?: string | undefined, options?: { loop: boolean }) => {
    setAudioTrack(src);
    setAudioTitle(title);

    if (player && !isPlaying() && useIsAudioAllowed().value && useIsAudioLoaded(src)) {
      player.value.loop = options?.loop ?? false;
      player.value?.play();
    }

    return {
      then: (callback: () => void) => {
        player.value?.addEventListener('ended', () => callback());        
      }
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