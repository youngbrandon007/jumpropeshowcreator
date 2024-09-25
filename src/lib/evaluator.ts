import type {ShowEntry} from "@/stores/show";
import {createIndexes, normalizeString, type ProcessedShowEntry, showEntriesToNumerical} from "./helper"



export function evaluateEntries(entries: ShowEntry[]) {
  const { processedEntries, allEvents, allPeople } = showEntriesToNumerical(entries)

  return evaluateProcessedEntries(processedEntries, Array(allEvents.size).fill(-1), Array(allPeople.size).fill(-1))
}



export function evaluateProcessedEntries(processedEntries : ProcessedShowEntry[], lastEventUse: number[], lastPersonUse: number[], startingIndex: number = 0) {
  let score = 0
  processedEntries.forEach((entry, arrayIndex) => {
    const entryIndex = arrayIndex + startingIndex

    score += evaluateSingleEntry(entry, lastEventUse, lastPersonUse, startingIndex)

    const eventIndex = entry[1]
    lastEventUse[eventIndex] = entryIndex

    for(let i = 3; i < entry.length; i++) {
      const personIndex = entry[i]
      lastPersonUse[personIndex] = entryIndex
    }
  })

  return score
}

export function evaluateSingleEntry(processedEntry: ProcessedShowEntry, lastEventUse: number[], lastPersonUse: number[], index: number) {
  let score = 0

  const eventIndex = processedEntry[1]
  if(lastEventUse[eventIndex] !== -1) {
    score += evaluateScoreDistance(lastEventUse[eventIndex] - index)
  }

  for(let i = 3; i < processedEntry.length; i++) {
    const personIndex = processedEntry[i]
    if(lastPersonUse[personIndex] !== -1) {
      score += evaluateScoreDistance(lastPersonUse[personIndex] - index)
    }
  }

  return score
}

// Must work for fractional values
export function evaluateScoreDistance(dis: number) {
  return Math.sqrt(Math.abs(dis))
}


