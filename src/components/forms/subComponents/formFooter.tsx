type args = {
  question: string
  actionText: string
  actionHref: string
}

export default function formFooter({question, actionText, actionHref}: args) {
  return (
    <div className="text-center text-sm">
      {question}{" "}
      <a href={actionHref} className="underline underline-offset-4">
        {actionText}
      </a>
    </div>
  )
}