import {defineStore} from "pinia";
import type {Entry, ProcessedEntry} from "@/stores/entries";
import {ref, watch} from "vue";
import {generateShow} from "@/lib/generator";


export type ShowEntry = {
  title: string;
  entry: ProcessedEntry;
}





export const useShowStore = defineStore('show', () => {

  let savedValue: ShowEntry[] = []
  try{
    savedValue = JSON.parse(localStorage.getItem("show") ?? "[]") as ShowEntry[]
  }catch(e) {
    console.error(e)
  }

  const show = ref<ShowEntry[]>(savedValue);

  watch(show, (newValue) => {
    localStorage.setItem("show", JSON.stringify(newValue));
  })

  function reset(entries: ProcessedEntry[]) {
    show.value = entries.map((entry) => {
      return {
        title: (entry.name !== "") ? entry.name : entry.event + " - " + entry.people.join(", "),
        entry
      }
    })
  }

  function generate() {
    const generatedShow = generateShow(show.value)

    console.log(generatedShow)
  }

  return {show, reset, generate}
})