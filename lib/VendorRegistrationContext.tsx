// contexts/VendorRegistrationContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import {
  VendorPaymentData,
  VendorPlanSelectionData,
  VendorRegisterData,
} from '@/schemas/vendor.schema'

interface VendorRegistrationContextType {
  step: number
  setStep: (step: number) => void
  vendorData: VendorRegisterData | null
  setVendorData: (data: VendorRegisterData) => void
  planData: VendorPlanSelectionData | null
  setPlanData: (data: VendorPlanSelectionData) => void
  paymentData: VendorPaymentData | null
  setPaymentData: (data: VendorPaymentData) => void
  nextStep: () => void
  prevStep: () => void
}

const VendorRegistrationContext = createContext<
  VendorRegistrationContextType | undefined
>(undefined)

export function VendorRegistrationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [step, setStep] = useState(2)
  const [vendorData, setVendorData] = useState<VendorRegisterData | null>(null)
  const [planData, setPlanData] = useState<VendorPlanSelectionData | null>(null)
  const [paymentData, setPaymentData] = useState<VendorPaymentData | null>(null)

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <VendorRegistrationContext.Provider
      value={{
        step,
        setStep,
        vendorData,
        setVendorData,
        planData,
        setPlanData,
        paymentData,
        setPaymentData,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </VendorRegistrationContext.Provider>
  )
}

export function useVendorRegistration() {
  const context = useContext(VendorRegistrationContext)
  if (context === undefined) {
    throw new Error(
      'useVendorRegistration must be used within a VendorRegistrationProvider'
    )
  }
  return context
}
