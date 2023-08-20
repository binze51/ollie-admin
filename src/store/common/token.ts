import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TokenState {
  token: string | null;
  setToken: (t: string | null) => void;
}

export const useTokenStore = create<TokenState>()(
  devtools(
    persist(
      set => ({
        token: null,
        setToken: t => set(() => ({ token: t })),
      }),
      {
        name: "token",
      }
    )
  )
);
