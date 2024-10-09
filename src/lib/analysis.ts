import type {ShowEntry} from "@/stores/show";
import {showEntriesToNumerical} from "@/lib/helper";


export type DistanceAnalysisEntry = { index: number, distanceToNext: number , nextIndex: number }
export type DistanceAnalysis = { [key: string]: DistanceAnalysisEntry[] }



export function getItemDistance(showEntries: ShowEntry[]): { distanceByPerson: DistanceAnalysis, distanceByEvent: DistanceAnalysis } {
  const prepared = showEntriesToNumerical(showEntries);

  const entryIndicesByEvent = getEntryIndexByEvent(prepared);
  const entryIndicesByPerson = getEntryIndexByPerson(prepared);

  const distanceByEvent: DistanceAnalysis = {}

  prepared.allEvents.forEach((event) => {
    distanceByEvent[event] = []
  })

  for(let i = 0; i < entryIndicesByEvent.length; i++) {
    const eventName: string = prepared.indexToEvent.get(i)!

    for(let j = 0; j < entryIndicesByEvent[i].length; j++) {
      if(j + 1 < entryIndicesByEvent[i].length) {
        distanceByEvent[eventName].push({
          index: entryIndicesByEvent[i][j],
          distanceToNext: entryIndicesByEvent[i][j+1] - entryIndicesByEvent[i][j],
          nextIndex: entryIndicesByEvent[i][j+1]
        })
      }
    }
  }

  const distanceByPerson: DistanceAnalysis = {}

  prepared.allPeople.forEach((person) => {
    distanceByPerson[person] = []
  })

  for(let i = 0; i < entryIndicesByPerson.length; i++) {
    const personName: string = prepared.indexToPerson.get(i)!

    for(let j = 0; j < entryIndicesByPerson[i].length; j++) {
      distanceByPerson[personName].push({
        index: entryIndicesByPerson[i][j],
        distanceToNext: entryIndicesByPerson[i][j+1] - entryIndicesByPerson[i][j],
        nextIndex: entryIndicesByPerson[i][j+1]
      })
    }
  }

  return { distanceByPerson: distanceByPerson, distanceByEvent: distanceByEvent }
}



export function getEntryIndexByEvent({ processedEntries, allEvents }: { processedEntries: number[][], allEvents: Set<string> }) {
  const entryByEvent: number[][] = Array(allEvents.size).fill(0).map(() => Array())

  for(let i = 0; i < processedEntries.length; i++) {
    const entry = processedEntries[i];

    entryByEvent[entry[1]].push(i)
  }

  return entryByEvent
}

export function getEntryIndexByPerson({ processedEntries, allPeople }: { processedEntries: number[][], allPeople: Set<string> }) {
  const entryByPerson: number[][] = Array(allPeople.size).fill(0).map(() => Array())

  for(let i = 0; i < processedEntries.length; i++) {
    const entry = processedEntries[i];

    for(let j = 3; j < processedEntries[i].length; j++) {
      entryByPerson[entry[j]].push(i)
    }
  }

  return entryByPerson
}