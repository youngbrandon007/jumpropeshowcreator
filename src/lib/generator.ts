import type {ShowEntry} from "@/stores/show";
import {type ProcessedShowEntry, showEntriesToNumerical} from "@/lib/helper";
import {evaluateScoreDistance, evaluateSingleEntry} from "@/lib/evaluator";


function l<T>(msg: any, val: T): T {
  console.log(msg, val)
  return val
}



function bestLimitedDepth(depthLeft: number, lastEventUse: number[], lastPersonUse: number[], entriesLeft: ProcessedShowEntry[], setEntries: (ProcessedShowEntry | null)[], currentIndex: number): [ProcessedShowEntry[], number] {
  if(depthLeft == 0){
    let eventCount: {[event: number]: number} = {}
    let peopleCount: {[person: number]: number} = {}

    let totalEntriesLeft = 0

    entriesLeft.forEach(entry => {
      if(eventCount.hasOwnProperty(entry[1])) {
        eventCount[entry[1]] += 1
      }else{
        eventCount[entry[1]] = 1;
      }
      for(let i = 3; i < entry.length; i++) {
        if(peopleCount.hasOwnProperty(entry[i])) {
          peopleCount[entry[i]] += 1
        }else{
          peopleCount[entry[i]] = 1;
        }
      }
      totalEntriesLeft += 1
    })

    for(let i = currentIndex; i<setEntries.length; i++){
      if(setEntries[i] !== null){
        const entry = setEntries[i]!

        if(eventCount.hasOwnProperty(entry[1])) {
          eventCount[entry[1]] += 1
        }else{
          eventCount[entry[1]] = 1;
        }
        for(let i = 3; i < entry.length; i++) {
          if(peopleCount.hasOwnProperty(entry[i])) {
            peopleCount[entry[i]] += 1
          }else{
            peopleCount[entry[i]] = 1;
          }
        }
      }
      totalEntriesLeft += 1
    }

    let score = 0
    for(let event in eventCount) {
      const lastUsePos = lastEventUse[event]
      const count = eventCount[event]
      if(lastUsePos !== -1) {
        const spacingFromLastUsed: number = setEntries.length - lastUsePos
        const intervalFromLastUsed: number = (spacingFromLastUsed - 1) / count
        if(lastUsePos + intervalFromLastUsed >= currentIndex){
          score += l("event: " + event, evaluateScoreDistance(intervalFromLastUsed) * count)
        }else{
          // const normalInterval = (eventCount[event] > 1) ? (totalEntriesLeft - 1) / (eventCount[event] - 1) : intervalFromLastUsed
          const normalInterval = (totalEntriesLeft - 1) / (count- 1)
          score += l("event: " + event, evaluateScoreDistance(currentIndex - lastUsePos) + evaluateScoreDistance(normalInterval) * (count - 1))
        }
      }else if(count > 1) {
        const normalInterval = (totalEntriesLeft - 1) / (count - 1)
        score += l("event: " + event, evaluateScoreDistance(normalInterval) * (count - 1))
      }
    }
    for(let person in peopleCount) {
      const lastUsePos = lastPersonUse[person]
      const count = peopleCount[person]
      if(lastUsePos !== -1) {
        const spacingFromLastUsed: number = setEntries.length - lastUsePos
        const intervalFromLastUsed: number = (spacingFromLastUsed - 1) / count
        if(lastUsePos + intervalFromLastUsed >= currentIndex){
          score += l("person: " + person, evaluateScoreDistance(intervalFromLastUsed) * count)
        }else{
          // const normalInterval = (eventCount[event] > 1) ? (totalEntriesLeft - 1) / (eventCount[event] - 1) : intervalFromLastUsed
          const normalInterval = (totalEntriesLeft - 1) / (count- 1)
          score += l("person: " + person, evaluateScoreDistance(currentIndex - lastUsePos) + evaluateScoreDistance(normalInterval) * (count - 1))
        }
      }else if(count > 1) {
        const normalInterval = (totalEntriesLeft - 1) / (count - 1)
        score += l("person: " + person, evaluateScoreDistance(normalInterval) * (count - 1))
      }
    }

    console.log("Evaluated", entriesLeft, score)

    return [[], score]
  }
  if(currentIndex >= setEntries.length){
    return [[], 0]
  }

  let bestScore = 0;
  let bestSequence: ProcessedShowEntry[] = []

  for(let i = -1; i < entriesLeft.length; i++) {

    let newEntry: ProcessedShowEntry = []
    let newEntriesLeft: ProcessedShowEntry[] = []
    if(i === -1) {
      if(setEntries[currentIndex] === null) continue;

      newEntry = setEntries[currentIndex]!
      newEntriesLeft = entriesLeft
    }else {
      if(setEntries[currentIndex] !== null) break;

      newEntry = entriesLeft[i]
      newEntriesLeft = entriesLeft.slice(0, i).concat(entriesLeft.slice(i + 1));
    }

    const newScore = evaluateSingleEntry(newEntry, lastEventUse, lastPersonUse, currentIndex)

    const prevEventUse = lastEventUse[newEntry[2]]
    lastEventUse[newEntry[2]] = currentIndex
    let prevPeopleUse: number[] = []
    for(let j = 3; j < newEntry.length; j++) {
      prevPeopleUse.push(lastPersonUse[newEntry[j]])
      lastPersonUse[newEntry[j]] = currentIndex
    }

    const [newSeq, newSeqScore] = bestLimitedDepth(depthLeft - 1, lastEventUse, lastPersonUse, newEntriesLeft, setEntries, currentIndex + 1)

    lastEventUse[newEntry[2]] = prevEventUse
    for(let j = 3; j < newEntry.length; j++) {
      lastPersonUse[newEntry[j]] = prevPeopleUse[j-3]
    }

    if(newSeqScore + newScore > bestScore) {
      bestSequence = [newEntry].concat(newSeq)
      bestScore = newSeqScore + newScore
    }
  }

  return [bestSequence, bestScore]
}



export function generateShow(entries: ShowEntry[]) {

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

  const startTime = performance.now()

  const lastEventUsed = Array(allEvents.size).fill(-1)
  const lastPersonUsed = Array(allPeople.size).fill(-1)

  const output = []

  const DEPTH = 1
  for(let showIndex = 0; showIndex <= show.length - DEPTH; showIndex++){
    const [resultShow, resultScore] = bestLimitedDepth(DEPTH, lastEventUsed, lastPersonUsed, preparedEntries, show, showIndex)
    console.log(showIndex, resultShow, resultScore)

    output.push(resultShow[0])
    lastEventUsed[resultShow[0][0]] = showIndex
    for(let i = 3; i < resultShow[0].length; i++) {
      lastPersonUsed[resultShow[0][i]] = showIndex
    }
    preparedEntries.splice(preparedEntries.indexOf(resultShow[0]), 1)

    if(showIndex == show.length - DEPTH) {
      show[showIndex] = resultShow[0]
    }
  }


  const duration = performance.now() - startTime

  console.log(duration)
  console.log(output)


  return {
    allPeople, personToIndex, indexToPerson,
    allEvents, eventToIndex, indexToEvent,
  }
}
