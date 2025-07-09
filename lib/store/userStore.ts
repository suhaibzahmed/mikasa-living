import { create } from 'zustand'

type UserState = {
  step: number
  phone: string
  firebaseUid: string
  idToken: string
}

type UserActions = {
  setStep: (step: number) => void
  setPhone: (phone: string) => void
  setFirebaseUid: (uid: string) => void
  setIdToken: (token: string) => void
  reset: () => void
}

const initialState: UserState = {
  step: 1,
  phone: '',
  firebaseUid: '',
  idToken: '',
}

export const useUserStore = create<UserState & UserActions>()((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setPhone: (phone) => set({ phone }),
  setFirebaseUid: (firebaseUid) => set({ firebaseUid }),
  setIdToken: (idToken) => set({ idToken }),
  reset: () => set(initialState),
}))
