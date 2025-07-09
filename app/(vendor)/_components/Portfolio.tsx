import { Photo } from '@prisma/client'

type PortfolioProps = {
  vendorPhotos: { photos: Photo[] } | null
}

const Portfolio = ({ vendorPhotos }: PortfolioProps) => {
  return <div>Portfolio</div>
}
export default Portfolio
