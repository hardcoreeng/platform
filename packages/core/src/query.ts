import { Doc } from './classes'
import { createPredicates, isPredicate } from './predicate'
import { SortingQuery } from './storage'

/**
 * @public
 */
export const likeSymbol = '%'

/**
 * @public
 */
export function checkLikeQuery (value: string, query: string): boolean {
  const searchString = query.split(likeSymbol).join('.*')
  const regex = RegExp(`^${searchString}$`)
  return regex.test(value)
}

/**
 * @public
 */
export function findProperty (objects: Doc[], propertyKey: string, value: any): Doc[] {
  if (isPredicate(value)) {
    const preds = createPredicates(value, propertyKey)
    for (const pred of preds) {
      objects = pred(objects)
    }
    return objects
  }
  const result: Doc[] = []
  for (const object of objects) {
    const val = (object as any)[propertyKey]
    if (val === value || nestedDotQueryCheck(propertyKey, object, value)) {
      result.push(object)
    }
  }
  return result
}

function nestedDotQueryCheck (key: string, value: any, pattern: any): boolean {
  // Check dot notation

  // Replace escapting, since memdb is not escape keys
  key = key.split('\\$').join('$')
  const dots = key.split('.')
  if (dots.length > 1) {
    // We have dots, so iterate in depth
    for (const d of dots) {
      value = value?.[d]
    }
    if (value === pattern) {
      return true
    }
  }
  return false
}

/**
 * @public
 */
export function resultSort<T extends Doc> (result: T[], sortOptions: SortingQuery<T>): void {
  const sortFunc = (a: any, b: any): number => {
    for (const key in sortOptions) {
      const result = typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key]
      if (result !== 0) return result * (sortOptions[key] as number)
    }
    return 0
  }
  result.sort(sortFunc)
}
