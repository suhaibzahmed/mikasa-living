// contexts/VendorRegistrationContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import {
  PaymentData,
  PlanSelectionData,
  RegisterData,
} from '@/schemas/vendor.schema'

interface VendorRegistrationContextType {
  step: number
  setStep: (step: number) => void
  vendorData: RegisterData | null
  setVendorData: (data: RegisterData) => void
  planData: PlanSelectionData | null
  setPlanData: (data: PlanSelectionData) => void
  paymentData: PaymentData | null
  setPaymentData: (data: PaymentData) => void
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
  const [vendorData, setVendorData] = useState<RegisterData | null>(null)
  const [planData, setPlanData] = useState<PlanSelectionData | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)

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
