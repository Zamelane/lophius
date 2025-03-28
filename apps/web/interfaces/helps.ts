// Вспомогательный тип для разделения пути на части
export type SplitPath<T extends string> =
  T extends `${infer Head}.${infer Tail}` ? [Head, ...SplitPath<Tail>] : [T];

// Основной тип для получения типа свойства
export type GetPropertyType<T, Path extends string> =
  Path extends keyof T
    ? T[Path] // Если путь — это ключ объекта, возвращаем тип свойства
    : Path extends `${infer Head}.${infer Tail}` // Если путь содержит точку
    ? Head extends keyof T // Проверяем, существует ли Head в объекте
      ? GetPropertyType<T[Head], Tail> // Рекурсивно вызываем для вложенного объекта
      : never // Если Head не существует, возвращаем never
    : never; // Если путь не соответствует ни одному из условий

export type ArrayElementType<T> = T extends Array<infer U> ? U : never;

export type NoUndefinedFields<T> = {
  [K in keyof T]-?: T[K] extends undefined ? never : T[K];
};

export function allFieldsDefined<T extends object>(obj: T): obj is NoUndefinedFields<T> {
  return Object.values(obj).every((value) => value !== undefined);
}

export function compareObjects<T extends object, K extends keyof T>(
  obj1: T,
  obj2: T,
  excludeFields: K[]
): boolean {
  const keys = Object.keys(obj1) as Array<keyof T>;

  return keys.every(key => {
    // Пропускаем исключённые поля
    if (excludeFields.includes(key as K)) {
      return true;
    }
    
    // Сравниваем значения
    return obj1[key] === obj2[key];
  });
}