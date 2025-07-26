import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AboutVendor = ({ description }: { description: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Us</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {description || 'No description provided.'}
        </p>
      </CardContent>
    </Card>
  )
}
export default AboutVendor
