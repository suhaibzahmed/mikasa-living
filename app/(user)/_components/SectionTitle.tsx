const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-x-4 my-8">
      <p className="uppercase text-primary font-bold text-sm">{title}</p>
      <div className="h-[2px] flex-1 bg-muted-foreground/30 rounded"></div>
    </div>
  )
}
export default SectionTitle
