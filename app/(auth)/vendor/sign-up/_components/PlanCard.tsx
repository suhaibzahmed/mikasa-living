import { Plan } from '@prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const planStyles: { [key: string]: { bg: string; ring: string } } = {
  GOLD: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/40',
    ring: 'ring-yellow-400 dark:ring-yellow-500',
  },
  SILVER: {
    bg: 'bg-gray-200 dark:bg-gray-800/40',
    ring: 'ring-gray-400 dark:ring-gray-500',
  },
  BRONZE: {
    bg: 'bg-orange-200 dark:bg-orange-900/40',
    ring: 'ring-orange-400 dark:ring-orange-500',
  },
  PLATINUM: {
    bg: 'bg-indigo-100 dark:bg-indigo-900/40',
    ring: 'ring-indigo-400 dark:ring-indigo-500',
  },
}

type PlanCardProps = {
  plan: Plan
  selectedPlanId: string
  onSelect: (id: string) => void
}

const PlanCard = ({ plan, selectedPlanId, onSelect }: PlanCardProps) => {
  return (
    <Card
      key={plan.id}
      onClick={() => onSelect(plan.id)}
      className={cn(
        'cursor-pointer transition-all border-0',
        planStyles[plan.type]?.bg || 'bg-gray-100 dark:bg-gray-800/40',
        {
          'ring-2 ring-offset-2': selectedPlanId === plan.id,
          [planStyles[plan.type]?.ring || 'ring-blue-500']:
            selectedPlanId === plan.id,
        }
      )}
    >
      <CardHeader>
        <CardTitle className="dark:text-gray-50">{plan.type}</CardTitle>
        <CardDescription className="dark:text-gray-300">
          <span className="text-3xl font-bold dark:text-gray-100">
            &#8377;{plan.monthly}
          </span>
          /month
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {plan.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-x-2 dark:text-gray-200"
            >
              <Check className="h-5 w-5 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default PlanCard
