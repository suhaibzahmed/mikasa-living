'use client'

import { create } from 'zustand'
import { VendorRegistrationData } from '@/schemas/vendor.schema'

interface VendorStore {
  step: number
  vendorData: Partial<VendorRegistrationData> & {
    firebaseUid?: string
    idToken?: string
  }
  setStep: (step: number) => void
  setVendorData: (
    data: Partial<VendorRegistrationData> & {
      firebaseUid?: string
      idToken?: string
    }
  ) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

export const useVendorStore = create<VendorStore>((set, get) => ({
  step: 1,
  vendorData: {},
  setStep: (step) => set({ step }),
  setVendorData: (data) =>
    set((state) => ({
      vendorData: { ...state.vendorData, ...data },
    })),
  nextStep: () => {
    console.log('current vendor data', get().vendorData)
    set((state) => ({ step: state.step + 1 }))
  },
  prevStep: () => {
    console.log('current vendor data', get().vendorData)
    set((state) => ({ step: Math.max(1, state.step - 1) }))
  },
  reset: () => set({ step: 1, vendorData: {} }),
}))
