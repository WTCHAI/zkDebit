import { create } from 'zustand'

type LoaderStoreState = {
  isOpen: boolean
}

type LoaderStoreAction = {
  open: () => void
  close: () => void
}

type LoaderStore = LoaderStoreState & LoaderStoreAction

export const useLoaderStore = create<LoaderStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
