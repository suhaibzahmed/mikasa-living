'use client'

import { useVendorStore } from '@/lib/store/vendorStore'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Plan } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { getPlanById } from '@/actions/vendor/actions'
import { useAuth } from '@/components/AuthProvider'
import { setCustomClaims } from '@/lib/auth'

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-md font-semibold">{value || '-'}</p>
  </div>
)

const Confirmation = () => {
  const { vendorData } = useVendorStore()
  const { user } = useAuth()
  const router = useRouter()
  const [plan, setPlan] = useState<Plan | null>(null)

  useEffect(() => {
    const fetchPlan = async () => {
      if (vendorData.planId) {
        try {
          const result = await getPlanById(vendorData.planId)
          if (result.success && result.data) {
            setPlan(result.data)
          }
        } catch (error) {
          console.error('Failed to fetch plan details:', error)
        }
      }
    }
    fetchPlan()
  }, [vendorData.planId])

  async function handleCompleteOnboarding() {
    await setCustomClaims(user?.uid, 'VENDOR')
    const newIdToken = await user?.getIdToken(true)
    await fetch('/api/login', {
      headers: {
        Authorization: `Bearer ${newIdToken}`,
      },
    })
    router.push('/vendor/dashboard')
    router.refresh()
  }

  return (
    <div className="mx-auto p-4 sm:p-6 lg:p-8 space-y-8 ">
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-x-4">
          <CheckCircle2 className=" size-12 text-green-500" />
          <h3 className=" font-extrabold tracking-tight">
            Thank You for Registering!
          </h3>
        </div>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Your vendor account is ready. We are excited to have you onboard. Here
          is a summary of your registration details.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            <h5>Registration Summary</h5>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h6 className=" mb-4 border-b pb-2 text-muted-foreground">
              Vendor Details
            </h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <DetailItem
                label="Business Name"
                value={vendorData.companyName}
              />
              <DetailItem label="Email Address" value={vendorData.email} />
              <DetailItem label="Phone Number" value={vendorData.phone} />
            </div>
          </div>

          <div>
            <h6 className=" mb-4 border-b pb-2 text-muted-foreground">
              Subscription Details
            </h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <DetailItem
                label="Selected Plan"
                value={plan?.type || 'Loading...'}
              />
              <DetailItem
                label="Billing Cycle"
                value={
                  vendorData.billingCycle
                    ? vendorData.billingCycle.charAt(0) +
                      vendorData.billingCycle.slice(1).toLowerCase()
                    : '-'
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="w-full flex justify-center pt-4">
        <Button onClick={handleCompleteOnboarding}>Go to Your Dashboard</Button>
      </div>
    </div>
  )
}

export default Confirmation
