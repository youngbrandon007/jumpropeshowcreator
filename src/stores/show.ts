import {defineStore} from "pinia";
import type {ProcessedEntry} from "@/stores/entries";
import {ref, watch} from "vue";
import {generateShow} from "@/lib/generator";
import {download, generateCsv, mkConfig} from "export-to-csv";


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

    show.value = generatedShow.result
  }

  function downloadCsv() {
    const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "show" });

    const csv = generateCsv(csvConfig)(show.value.map<{}>(e => {return {
      title: e.title,
      event: e.entry.event,
      people: e.entry.people.reduce((s, person) => {
        return (s.length > 0) ? s + ", " + person : person
      }, ""),
    }}));

    download(csvConfig)(csv);
  }

  return {show, reset, generate, downloadCsv}
})