type Step<Context> = {
  execute: (ctx: Context) => Promise<Context>
}

export class Pipeline<Context> {
  private steps: Step<Context>[] = []
  private context: Context

  constructor(initialContext: Context) {
    this.context = initialContext
  }

  addStep(step: Step<Context>): this {
    this.steps.push(step)
    return this
  }

  async execute(): Promise<Context> {
    let ctx = this.context
    for (const step of this.steps) {
      ctx = await step.execute(ctx)
    }
    return ctx
  }
}
