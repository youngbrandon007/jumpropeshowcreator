import {defineStore} from "pinia";
import type {ProcessedEntry} from "@/stores/entries";
import {download, generateCsv, mkConfig} from "export-to-csv";
import {randomID} from "@/lib/helper";
import {DEFAULT_EVALUATOR, type EvaluatorSettings} from "@/lib/evaluator";
import {DEFAULT_GENERATOR, generateShow, type GeneratorSettings} from "@/lib/generators";
import {savedRef} from "@/lib/savedRef";


export type ShowEntry = {
  title: string;
  id: string;
  entry: ProcessedEntry;
}


export const useShowStore = defineStore('show', () => {


  let show = savedRef<ShowEntry[]>("show", [])


  // let initValueShow: Entry[] = JSON.parse(localStorage.getItem("show") ?? "null") ?? [] as ShowEntry[]
  //
  // const show = ref<ShowEntry[]>(initValueShow);
  //
  // watch(show, (newValue) => {
  //   localStorage.setItem("show", JSON.stringify(newValue));
  // })

  const generatorSettings = savedRef<GeneratorSettings>("generatorSettings", DEFAULT_GENERATOR);
  const evaluatorSettings = savedRef<EvaluatorSettings>("evaluatorSettings", DEFAULT_EVALUATOR);

  function reset(entries: ProcessedEntry[]) {
    show.value = entries.map((entry) => {
      return {
        id: randomID(),
        title: (entry.name !== "") ? entry.name : entry.event + " - " + entry.people.join(", "),
        entry
      }
    })
  }

  function generate() {
    const generatedShow = generateShow(show.value, generatorSettings.value, evaluatorSettings.value)

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

  return {show, generatorSettings, evaluatorSettings, reset, generate, downloadCsv}
})