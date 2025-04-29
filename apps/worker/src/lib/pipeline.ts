type Step<T> = (context: T) => Promise<T> | T

export class Pipeline<T extends object> {
  private steps: Step<T>[] = []
  private context: T

  constructor(initialContext: T) {
    this.context = initialContext
  }

  addStep(step: Step<T>): this {
    this.steps.push(step)
    return this
  }

  async execute(): Promise<T> {
    for (const step of this.steps) {
      this.context = await step(this.context)
    }
    return this.context
  }
}
