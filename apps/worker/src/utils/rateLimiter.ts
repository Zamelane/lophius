export class RateLimiter {
  private callCount = 0 // Количество вызовов
  private lastResetTime: number = Date.now() // Время последнего сброса счетчика

  public constructor(
    private readonly maxCallCount: number, // Максимальное количество вызовов
    private readonly resetTime: number // Время сброса (в миллисекундах)
  ) {}

  // Метод для вызова callback с ограничением
  async callWithRateLimit<T>(callback: () => Promise<T> | T): Promise<T> {
    const now = Date.now()

    // Если прошло время сброса, обнуляем счетчик
    if (now - this.lastResetTime >= this.resetTime) {
      this.callCount = 0
      this.lastResetTime = now
    }

    // Если количество вызовов превышает лимит, ждем до сброса
    if (this.callCount >= this.maxCallCount) {
      await new Promise((resolve) => setTimeout(resolve, this.resetTime))

      // После ожидания сбрасываем счетчик
      this.callCount = 0
      this.lastResetTime = Date.now()
    }

    // Увеличиваем счетчик вызовов
    this.callCount++

    // Вызываем callback и возвращаем его результат
    return callback()
  }
}
