import type {ShowEntry} from "@/stores/show";


export function normalizeString(x: string) {
  return x.trim().toLowerCase()
}



export function createIndexes<T>(iter: Set<T>): {itemToIndex: Map<T, number>, indexToItem: Map<number, T>} {
  const itemToIndex = new Map<T, number>()
  const indexToItem = new Map<number, T>()

  let index = 0
  iter.forEach(item => {
    itemToIndex.set(item, index)
    indexToItem.set(index, item)
    index += 1
  })

  return {itemToIndex, indexToItem}
}


export type ProcessedShowEntry = number[] // [index, event, percentage | -1, ...people]

export function showEntriesToNumerical(entries: ShowEntry[]) {
  const allPeople = new Set<string>(entries.flatMap(entry => entry.entry.people.map(normalizeString)))
  const {itemToIndex: personToIndex, indexToItem: indexToPerson} = createIndexes(allPeople)

  const allEvents = new Set<string>(entries.map(entry => normalizeString(entry.entry.event)))
  const {itemToIndex: eventToIndex, indexToItem: indexToEvent} = createIndexes(allEvents)

  const processedEntries = entries.map((entry, entryIndex) => {
    return [entryIndex, eventToIndex.get(normalizeString(entry.entry.event))!, entry.entry.percentage ?? -1].concat(entry.entry.people.map(person => {
      return personToIndex.get(normalizeString(person))!
    }))
  })

  return {
    processedEntries,
    allPeople, personToIndex, indexToPerson,
    allEvents, eventToIndex, indexToEvent
  }
}