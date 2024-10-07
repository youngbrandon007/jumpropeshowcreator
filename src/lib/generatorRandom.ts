import type {ShowEntry} from "@/stores/show";
import {generateRandomShow, type ProcessedShowEntry, showEntriesToNumerical} from "@/lib/helper";
import {type EvaluateFunctions, evaluateProcessedEntries} from "@/lib/evaluator";


function findNextBestIndexRandomly(setEntries: (ProcessedShowEntry | null)[], index: number, entriesLeft: ProcessedShowEntry[], randomCount: number, numberEvents: number, numberPeople: number, evaluateFunction: EvaluateFunctions): number {
  if(setEntries[index] !== null) {
    throw Error("Internal Error in findNextBestIndexRandomly()")
  }

  let bestScore = -1
  let bestIndex = -1

  for(let chooseIndex = 0; chooseIndex < entriesLeft.length; chooseIndex++){
    const newSetEntries = setEntries.map(entry => entry)
    newSetEntries[index] = entriesLeft[chooseIndex]
    const newEntriesLeft = entriesLeft.filter((entry, index) => index !== chooseIndex)

    let totalScore = 0

    for(let i = 0; i < randomCount; i++) {
      const randomShow = generateRandomShow(newSetEntries, newEntriesLeft)

      const score = evaluateProcessedEntries(randomShow, Array(numberEvents).fill(-1), Array(numberPeople).fill(-1), 0, evaluateFunction)

      totalScore += score
    }

    if(totalScore > bestScore) {
      bestScore = totalScore
      bestIndex = chooseIndex
    }
  }

  return bestIndex
}




export type RandomGeneratorSettings = { name: "random", iterations: number}

export function randomGeneratorGenerateShow(entries: ShowEntry[], settings: RandomGeneratorSettings, evaluateFunction: EvaluateFunctions) {

  const { processedEntries, personToIndex, indexToPerson, allPeople, allEvents, eventToIndex, indexToEvent } = showEntriesToNumerical(entries)

  const preparedEntries: ProcessedShowEntry[] = []
  const percentageEntries: ProcessedShowEntry[] = []

  processedEntries.forEach((entry) => {
    if(entry[2] !== -1) {
      percentageEntries.push(entry)
    }else{
      preparedEntries.push(entry)
    }
  })

  percentageEntries.sort((a, b) => a[0] - b[0])

  const show: (ProcessedShowEntry | null)[] = Array(entries.length).fill(null)

  let percentageEntriesIndex = 0
  for(let showIndex = 0; showIndex < show.length; showIndex++){
    const percentageEntriesLeft = percentageEntries.length - percentageEntriesIndex
    if(percentageEntriesLeft === 0) break
    const showLeft = show.length - showIndex
    const showPercentage = 100 * (showIndex) / (show.length - 1) + 10E-3
    if(showLeft <= percentageEntriesLeft || percentageEntries[percentageEntriesIndex][2]! <= showPercentage){
      show[showIndex] = percentageEntries[percentageEntriesIndex]
      percentageEntriesIndex++
    }
  }

  const RANDOM_COUNT = settings.iterations

  const startTime = performance.now()

  for(let i = 0; i < show.length; i++){
    if(show[i] === null) {
      const nextIndex = findNextBestIndexRandomly(show, i, preparedEntries, RANDOM_COUNT, allEvents.size, allPeople.size, evaluateFunction)

      show[i] = preparedEntries.splice(nextIndex, 1)[0]
    }
  }

  const duration = performance.now() - startTime

  console.log("Created show in " + duration.toFixed(3) + " ms.")

  const result = show.map<ShowEntry>(entry => {
    return entries[entry![0]]
  })

  return {
    allPeople, personToIndex, indexToPerson,
    allEvents, eventToIndex, indexToEvent,
    result
  }
}
