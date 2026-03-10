import { create } from 'zustand';

interface StealthMode {
  enabled: boolean;
  hideProjectNames: boolean;
  hideTaskNames: boolean;
  useEmojis: boolean;
  useCodedScores: boolean;
  toggleStealthMode: () => void;
  toggleHideProjectNames: () => void;
  toggleHideTaskNames: () => void;
  toggleEmojis: () => void;
  toggleCodedScores: () => void;
}

export const useStealthMode = create<StealthMode>((set) => ({
  enabled: false,
  hideProjectNames: false,
  hideTaskNames: false,
  useEmojis: true,
  useCodedScores: false,
  toggleStealthMode: () => set((state) => ({ enabled: !state.enabled })),
  toggleHideProjectNames: () =>
    set((state) => ({ hideProjectNames: !state.hideProjectNames })),
  toggleHideTaskNames: () =>
    set((state) => ({ hideTaskNames: !state.hideTaskNames })),
  toggleEmojis: () => set((state) => ({ useEmojis: !state.useEmojis })),
  toggleCodedScores: () =>
    set((state) => ({ useCodedScores: !state.useCodedScores })),
}));
