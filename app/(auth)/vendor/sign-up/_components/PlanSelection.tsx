import { getPlans } from '@/actions/vendor/fetch.actions'
import { Plan } from '@prisma/client'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const PlanSelection = async () => {
  const plans: Plan[] = await getPlans()
  //   const { planData, setPlanData, nextStep, prevStep } = useVendorRegistration()

  return (
    <div className="grid grid-cols-4 gap-4">
      {plans.length < 1 ? (
        <div>No Plans Available</div>
      ) : (
        plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.type}</CardTitle>
              <CardDescription>
                {plan.features.map((feature) => (
                  <ul key={feature}>
                    <li>{feature}</li>
                  </ul>
                ))}
              </CardDescription>
              <CardAction>Rs. {plan.monthly}/month</CardAction>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}

export default PlanSelection
