'use client'

import { create } from 'zustand'
import { VendorDetailsData } from '@/schemas/vendor.schema'

interface VendorStore {
  step: number
  vendorData: Partial<VendorDetailsData & { planId?: string }>
  setStep: (step: number) => void
  setVendorData: (
    data: Partial<VendorDetailsData & { planId?: string }>
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
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  reset: () => set({ step: 1, vendorData: {} }),
}))
