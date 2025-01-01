type args = {
  title: string
  description: string
}

export default function FormHeader({title, description}: args) {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-balance text-muted-foreground">
        {description}
      </p>
    </div>
  )
}