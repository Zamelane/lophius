export type Step<Input extends object, Output extends object> = {
  execute(ctx: Input): Promise<Output>;
  readonly _input?: Input;
  readonly _output?: Output;
};

export class Pipeline<
  InitialContext extends object,
  CurrentContext extends object = InitialContext
> {
  private _steps: Step<any, any>[] = [];

  constructor(private readonly initialContext: InitialContext, private callback?: (ctx: InitialContext) => void) {}

  addStep<
    RequiredInput extends CurrentContext,
    StepOutput extends object
  >(
    step: Step<RequiredInput, StepOutput>
  ): Pipeline<InitialContext, CurrentContext & StepOutput> {
    const newPipeline = new Pipeline<InitialContext, CurrentContext & StepOutput>(this.initialContext, this.callback);
    newPipeline._steps = [...this._steps, step];
    return newPipeline;
  }

  async execute(): Promise<CurrentContext> {
    let currentCtx: any = this.initialContext;
    for (const step of this._steps) {
      const stepOutput = await step.execute(currentCtx);
      currentCtx = { ...currentCtx, ...stepOutput };
      if (this.callback) {
        this.callback(currentCtx);
      }
    }
    return currentCtx as CurrentContext;
  }
}