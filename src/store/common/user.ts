import { create } from "zustand";

interface UserInfo {
  id: string;
  nickname: string;
}

interface UserState {
  user?: UserInfo;
  setUser: (payload?: UserInfo) => void;
}

export const useUserStore = create<UserState>()(set => ({
  user: undefined,
  setUser: p => set(() => ({ user: p })),
}));
