import {defineStore} from "pinia";
import {ref, watch} from "vue";
import { mkConfig, generateCsv, download } from "export-to-csv";
import * as Papa from "papaparse"
import {randomID} from "@/lib/helper";




export type Entry = {
  id: string
  name: string;
  event: string;
  people: string;
  percentage: string;
}

export type ProcessedEntry = {
  name: string;
  event: string;
  people: string[];
  percentage: number | null;
}

const DEFAULT_ENTRIES: Entry[] = [
  {
    id: randomID(),
    name: "Bob's Part",
    event: "jumprope",
    people: "Bob",
    percentage: "",
  },
  {
    id: randomID(),
    name: "",
    event: "yoyo",
    people: "Joe, John",
    percentage: "",
  },
  {
    id: randomID(),
    name: "",
    event: "dance",
    people: "Joe",
    percentage: "100",
  },
  {
    id: randomID(),
    name: "",
    event: "dance",
    people: "Billy, John",
    percentage: "",
  },
  {
    id: randomID(),
    name: "",
    event: "singing",
    people: "Amy",
    percentage: "",
  }
]


export const useEntryStore = defineStore('entries', () => {

  let initValue: Entry[] = JSON.parse(localStorage.getItem("entries") ?? "null") ?? DEFAULT_ENTRIES as Entry[]

  const entries = ref<Entry[]>(initValue)

  watch(entries, (newValue) => {
    localStorage.setItem("entries", JSON.stringify(newValue));
  })

  function clear() {
    entries.value = []
  }

  function addEntry() {
    entries.value = entries.value.concat([{name: "", event: "", people: "",percentage:"",id: randomID()}]);
  }

  function removeEntry(index: number) {
    entries.value = entries.value.slice(0, index).concat(entries.value.slice(index + 1));
  }

  function updateName(index: number, newValue: string) {
    entries.value = entries.value.map((value, i) => {
      if(index === i) {
        return {...value, name: newValue};
      }
      return {...value}
    })
  }

  function updateEvent(index: number, newValue: string) {
    entries.value = entries.value.map((value, i) => {
      if(index === i) {
        return {...value, event: newValue};
      }
      return {...value}
    })
  }

  function updatePeople(index: number, newValue: string) {
    entries.value = entries.value.map((value, i) => {
      if(index === i) {
        return {...value, people: newValue};
      }
      return {...value}
    })
  }

  function updatePercentage(index: number, newValue: string) {
    entries.value = entries.value.map((value, i) => {
      if(index === i) {
        return {...value, percentage: newValue};
      }
      return {...value}
    })
  }



  function getProcessedValue(): ProcessedEntry[] {
    return entries.value.map((item) => {
      let percentage: number | null = null
      try{
        percentage = parseFloat(item.percentage);

        if(isNaN(percentage)) {
          percentage = null
        }
      }catch(e) {}

      return {
        name: item.name.trim(),
        event: item.event.trim(),
        people: item.people.split(",").map((person) => {
          return person.trim();
        }),
        percentage: percentage,
      }
    })
  }

  function downloadCsv() {
    const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "entries" });

    const csv = generateCsv(csvConfig)(entries.value);

    download(csvConfig)(csv);
  }

  async function uploadCsv(event: Event) {
    const target = event.target as HTMLInputElement;
    if(target && target.files) {
      const contents = await target.files[0].text()

      const { data, errors } = Papa.parse<Entry>(contents, {header: true, dynamicTyping: true, skipEmptyLines: true})

      if(errors.length > 0) {
        alert("Issue processing CSV!");
        console.error(errors);
      }else{
        entries.value = data.map(entry => {
          return {
            id: randomID(),
            name: entry.name ?? "",
            event: entry.event ?? "",
            people: entry.people ?? "",
            percentage: entry.percentage ?? "",
          }
        })
      }
    }
  }

  return { entries, clear, addEntry, removeEntry, updateName, updateEvent, updatePeople, updatePercentage, getProcessedValue, downloadCsv, uploadCsv };
})
