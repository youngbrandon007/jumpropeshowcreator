import type {ShowEntry} from "@/stores/show";
import {type EvaluatorSettings, generateEvaluator} from "@/lib/evaluator";
import * as RandomGenerator from "@/lib/generatorRandom"
import type {RandomGeneratorSettings} from "@/lib/generatorRandom";



export type GeneratorSettings = RandomGeneratorSettings;


export const DEFAULT_GENERATOR: GeneratorSettings = { name: "random", iterations: 100 }



export function generateShow(entries: ShowEntry[], generatorSettings: GeneratorSettings, evaluatorSettings: EvaluatorSettings) {

  const evaluator = generateEvaluator(evaluatorSettings);

  switch(generatorSettings.name) {
    case "random":
    default:
      return RandomGenerator.randomGeneratorGenerateShow(entries, generatorSettings, evaluator);
  }
}


