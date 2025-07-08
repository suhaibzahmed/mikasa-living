import { BillingCycle as BillingCycleEnum, Plan } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type BillingCycleCardProps = {
  cycle: BillingCycleEnum
  plan: Plan | null
  selectedBillingCycle: BillingCycleEnum
  onSelect: (cycle: BillingCycleEnum) => void
}

const BillingCycleCard = ({
  cycle,
  plan,
  selectedBillingCycle,
  onSelect,
}: BillingCycleCardProps) => {
  const getPrice = (cycle: BillingCycleEnum) => {
    if (!plan) return ''
    switch (cycle) {
      case 'MONTHLY':
        return `₹${plan.monthly.toLocaleString()}/month`
      case 'QUARTERLY':
        return `₹${plan.quarterly.toLocaleString()}/quarter`
      case 'YEARLY':
        return `₹${plan.yearly.toLocaleString()}/year`
      default:
        return ''
    }
  }

  const priceString = getPrice(cycle)
  const [price, period] = priceString ? priceString.split('/') : ['', '']

  return (
    <Card
      onClick={() => onSelect(cycle)}
      className={cn('cursor-pointer transition-all text-center  ', {
        'ring-2 ring-offset-2 ring-primary': selectedBillingCycle === cycle,
      })}
    >
      <CardHeader>
        <CardTitle className="capitalize">{cycle.toLowerCase()}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-4xl font-bold text-primary">{price}</span>
        {period && <p className="text-sm text-muted-foreground">/ {period}</p>}
      </CardContent>
    </Card>
  )
}

export default BillingCycleCard
