import type {ShowEntry} from "@/stores/show";
import {type ProcessedShowEntry, showEntriesToNumerical} from "./helper"



export type EvaluateFunctions = {
  person: (dis: number) => number,
  event: (dis: number) => number
}



export function evaluateEntries(entries: ShowEntry[], evaluateFunction: EvaluateFunctions) {
  const { processedEntries, allEvents, allPeople } = showEntriesToNumerical(entries)

  return evaluateProcessedEntries(processedEntries, Array(allEvents.size).fill(-1), Array(allPeople.size).fill(-1), 0, evaluateFunction)
}



export function evaluateProcessedEntries(processedEntries : ProcessedShowEntry[], lastEventUse: number[], lastPersonUse: number[], startingIndex: number, evaluateFunction: EvaluateFunctions) {
  let score = 0
  processedEntries.forEach((entry, arrayIndex) => {
    const entryIndex = arrayIndex + startingIndex

    score += evaluateSingleEntry(entry, lastEventUse, lastPersonUse, entryIndex, evaluateFunction)

    const eventIndex = entry[1]
    lastEventUse[eventIndex] = entryIndex

    for(let i = 3; i < entry.length; i++) {
      const personIndex = entry[i]
      lastPersonUse[personIndex] = entryIndex
    }
  })

  return score
}



export function evaluateSingleEntry(processedEntry: ProcessedShowEntry, lastEventUse: number[], lastPersonUse: number[], index: number, evaluateFunction: EvaluateFunctions) {
  let score = 0

  const eventIndex = processedEntry[1]
  if(lastEventUse[eventIndex] !== -1) {
    score += evaluateFunction.event(lastEventUse[eventIndex] - index)
  }

  for(let i = 3; i < processedEntry.length; i++) {
    const personIndex = processedEntry[i]
    if(lastPersonUse[personIndex] !== -1) {
      score += evaluateFunction.person(lastPersonUse[personIndex] - index)
    }
  }

  return score
}



// Must work for fractional values
// Deprecated
export function evaluateScoreDistance(dis: number) {
  // return Math.sqrt(Math.abs(dis))
  // return Math.log2(Math.abs(dis))
  return (Math.abs(dis) <= 1) ? 0 : (Math.abs(dis) <= 2) ? 10 : 15;
  // return 1-Math.exp(-.25*Math.abs(dis))
}



export type EvaluatorSettings = {
  encourageEventMinimumSpacing: number
  encourageEventMinimumSpacingStrength: number
  encouragePersonMinimumSpacing: number
  encouragePersonMinimumSpacingStrength: number
  personSpacingMultiplier: number
  eventSpacingMultiplier: number
}



export const DEFAULT_EVALUATOR: EvaluatorSettings = {
  encourageEventMinimumSpacing: 2,
  encourageEventMinimumSpacingStrength: 4,
  encouragePersonMinimumSpacing: 2,
  encouragePersonMinimumSpacingStrength: 8,
  personSpacingMultiplier: 10,
  eventSpacingMultiplier: 5,
}



export function generateEvaluator(evaluatorSettings: EvaluatorSettings): EvaluateFunctions {
  return {
    event: (dis: number) => {
      const abs = Math.abs(dis)
      return Math.log(abs+1) * evaluatorSettings.eventSpacingMultiplier + (abs > evaluatorSettings.encourageEventMinimumSpacing ? evaluatorSettings.encourageEventMinimumSpacingStrength : 0)
    },
    person: (dis: number) => {
      const abs = Math.abs(dis)
      return Math.log(abs+1) * evaluatorSettings.personSpacingMultiplier + (abs > evaluatorSettings.encouragePersonMinimumSpacing ? evaluatorSettings.encouragePersonMinimumSpacingStrength : 0)
    }
  }
}


