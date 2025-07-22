import { create } from 'zustand'

type UserState = {
  step: number
}

type UserActions = {
  setStep: (step: number) => void
}

const initialState: UserState = {
  step: 1,
}

export const useUserStore = create<UserState & UserActions>()((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
}))
