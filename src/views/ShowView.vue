<script setup lang="ts">
import {useEntryStore} from "@/stores/entries";
import {useShowStore} from "@/stores/show";
import TabReference from "@/components/TabReference.vue";
import ButtonSolid from "@/components/ButtonSolid.vue";
import draggable from 'vuedraggable'
import CustomDialog from "@/components/CustomDialog.vue";
import {computed, ref, watch} from "vue";
import InputSlider from "@/components/InputSlider.vue";
import {type DistanceAnalysis, getItemDistance} from "@/lib/analysis";
import {
  ArrowRightIcon
} from '@heroicons/vue/24/outline'
import {DEFAULT_GENERATOR} from "@/lib/generators";
import {DEFAULT_EVALUATOR, type EvaluatorSettings} from "@/lib/evaluator";
import type {RandomGeneratorSettings} from "@/lib/generatorRandom";

const entries = useEntryStore()
const show = useShowStore()

const generatorSettingsOpen = ref<boolean>(false)

watch(show.show, (show) => {
  getItemDistance(show)
})

const distances = computed(() => {
  return getItemDistance(show.show)
})

const closeEventDistance = ref(1)
const closePersonDistance = ref(2)

const closeEvent = computed(() => {
  const byEvent = distances.value.distanceByEvent

  const results: DistanceAnalysis = {}

  Object.entries(byEvent).forEach(([event, analysisEntries]) => {
    const filteredAnalysisEntries = analysisEntries.filter((entry) => {
      return entry.distanceToNext <= closeEventDistance.value + 1
    })

    if(filteredAnalysisEntries.length > 0){
      results[event] = filteredAnalysisEntries
    }
  })

  return results
})

const closePerson = computed(() => {
  const byPerson = distances.value.distanceByPerson

  const results: DistanceAnalysis = {}

  Object.entries(byPerson).forEach(([person, analysisEntries]) => {
    const filteredAnalysisEntries = analysisEntries.filter((entry) => {
      return entry.distanceToNext <= closePersonDistance.value + 1
    })

    if(filteredAnalysisEntries.length > 0){
      results[person] = filteredAnalysisEntries
    }
  })

  return results
})

const closeEventIndexes = computed(() => {
  const indexes: { [key: number]: number } = {}

  Object.entries(closeEvent.value).forEach(([_, analysis]) => {
    analysis.forEach((analysisEntry) => {
      indexes[analysisEntry.index] = analysisEntry.distanceToNext
    })
  })

  return indexes
})

const closePersonIndexes = computed(() => {
  const indexes: { [key: number]: number[] } = {}

  Object.entries(closePerson.value).forEach(([_, analysis]) => {
    analysis.forEach((analysisEntry) => {
      if(!indexes.hasOwnProperty(analysisEntry.index)) {
        indexes[analysisEntry.index] = []
      }
      indexes[analysisEntry.index].push(analysisEntry.distanceToNext)
    })
  })

  return indexes
})
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Show</h1>
        <p class="mt-2 text-sm text-gray-700">First go to the <TabReference to="/entries">Entries</TabReference> tab and add the entries to your show. Then click 'Import Entries and Reset Show' to load in your entries from the other tab. Then click 'Generate' to create an order where like event types and people are spaced out.</p>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">

          <div class="flex flex-row flex-wrap p-2 gap-2">
            <ButtonSolid @click="show.reset(entries.getProcessedValue())">Import Entries and Reset Show</ButtonSolid>
            <ButtonSolid @click="show.generate()">Generate</ButtonSolid>
            <ButtonSolid @click="generatorSettingsOpen = true">Generator Settings</ButtonSolid>
            <div class="grow"></div>
            <ButtonSolid @click="show.downloadCsv()">Download</ButtonSolid>

          </div>
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col"><span class="sr-only">Number</span></th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Title</th>
            </tr>
            </thead>
            <draggable class="divide-y divide-gray-200 bg-white" :list="show.show" item-key="id" tag="tbody" handle=".handle">
              <template #item="{element, index}">
                <tr>
                  <td class="handle">{{index+1}}</td>
                  <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {{element.title}}
                  </td>
                  <td class="w-20">
                    <div v-if="closeEventIndexes.hasOwnProperty(index)" class="w-10 h-0 overflow-visible">
                      <div class="relative z-50 border-r-8 border-r-amber-500 w-16" :style="{ height: (38*closeEventIndexes[index]).toFixed(2)+'px', borderRadius: '50%', borderColor: 'rgb(79 70 229)'} "></div>
                    </div>
                  </td>
                  <td class="w-20">
                    <div v-if="closePersonIndexes.hasOwnProperty(index)" class="w-10 h-0 overflow-visible">
                      <div v-for="jump in closePersonIndexes[index]" class="absolute z-50 border-r-8 border-r-amber-500 w-16" :style="{ height: (38*jump).toFixed(2)+'px', borderRadius: '50%', borderColor: 'rgb(79 70 229)'} "></div>
                    </div>
                  </td>
                </tr>
              </template>
            </draggable>
          </table>
        </div>
      </div>
      <div class="flex flex-col gap-6 mt-10">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Analysis</h1>
        <div>
          <div class="flex flex-row items-center gap-2">
            <h1 class="text-base leading-6 text-gray-900">Close Repeated Events </h1>
            <div class="grow"></div>
            <div class="w-40">
              <InputSlider :min="0" :max="10" :value="closeEventDistance.toFixed()" @update:value="(newValue) => { closeEventDistance = Number(newValue)}"></InputSlider>
            </div>
            <p class="w-4 text-right">≤{{closeEventDistance}}</p>
          </div>
          <div class="flex flex-col gap-2">
            <div v-for="(analysis, event) in closeEvent">
              <p class="mt-2 text-sm text-gray-700">{{event}}</p>
              <div class="border-gray-400 border-t py-1 px-1.5">
                <p v-for="(analysisEntry) in analysis" class="flex flex-row gap-2 items-center">
                  {{analysisEntry.index+1}}<span class="border-gray-400 border-2 rounded-md py-1 px-1.5">{{show.show[analysisEntry.index].title}}</span>
                  <ArrowRightIcon class="w-12 h-6"></ArrowRightIcon>
                  {{analysisEntry.nextIndex+1}}<span class="border-gray-400 border-2 rounded-md py-1 px-1.5">{{show.show[analysisEntry.nextIndex].title}}</span>
                  <span class="w-6"></span>Entries In-between: <span class="font-bold">{{analysisEntry.distanceToNext-1}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex flex-row items-center gap-2">
            <h1 class="text-base leading-6 text-gray-900">Close Repeated People </h1>
            <div class="grow"></div>
            <div class="w-40">
              <InputSlider :min="0" :max="10" :value="closePersonDistance.toFixed()" @update:value="(newValue) => { closePersonDistance = Number(newValue)}"></InputSlider>
            </div>
            <p class="w-4 text-right">≤{{closePersonDistance}}</p>
          </div>
          <div class="flex flex-col gap-2">
            <div v-for="(analysis, event) in closePerson">
              <p class="mt-2 text-sm text-gray-700">{{event}}</p>
              <div class="border-gray-400 border-t py-1 px-1.5">
                <p v-for="(analysisEntry) in analysis" class="flex flex-row gap-2 items-center">
                  {{analysisEntry.index+1}}<span class="border-gray-400 border-2 rounded-md py-1 px-1.5">{{show.show[analysisEntry.index].title}}</span>
                  <ArrowRightIcon class="w-12 h-6"></ArrowRightIcon>
                  {{analysisEntry.nextIndex+1}}<span class="border-gray-400 border-2 rounded-md py-1 px-1.5">{{show.show[analysisEntry.nextIndex].title}}</span>
                  <span class="w-6"></span>Entries In-between: <span class="font-bold">{{analysisEntry.distanceToNext-1}}</span>
                </p>
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <CustomDialog v-model:open="generatorSettingsOpen">
    <div class="flex flex-col gap-8">


      <div class="flex flex-col gap-4">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Generator Settings</h1>

        <ButtonSolid @click="show.generatorSettings = DEFAULT_GENERATOR; show.evaluatorSettings = DEFAULT_EVALUATOR">Reset All Settings</ButtonSolid>

        <div>
          <label for="iterations" class="block text-sm font-medium leading-6 text-gray-900">Iterations </label>
          <small class="block text-xs text-gray-500 font-medium leading-6">(higher may take longer to run but will get a better result)</small>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="iterations" min="10" max="40" :value="(Math.log10(show.generatorSettings.iterations) * 10).toFixed()" @update:value="(value) => show.generatorSettings = { ...(show.generatorSettings), iterations: 10 ** (Number(value)/10) } as RandomGeneratorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.generatorSettings.iterations)}}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Generator Event Settings</h1>


        <div>
          <label for="event_priority" class="block text-sm font-medium leading-6 text-gray-900">Event Spacing Priority</label>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="event_priority" min="0" max="10" :value="show.evaluatorSettings.eventSpacingMultiplier.toFixed(0)" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), eventSpacingMultiplier: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{ Math.round(show.evaluatorSettings.eventSpacingMultiplier) }}</p>
          </div>
        </div>

        <div>
          <label for="event_min_spacing" class="block text-sm font-medium leading-6 text-gray-900">Event Minimum Spacing </label>
          <small class="block text-xs text-gray-500 font-medium leading-6">(will not guarantee this spacing but will encourage the algorithm)</small>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="event_min_spacing" min="0" max="10" :value="show.evaluatorSettings.encourageEventMinimumSpacing.toFixed(0)" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), encourageEventMinimumSpacing: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.evaluatorSettings.encourageEventMinimumSpacing)}}</p>
          </div>
        </div>

        <div>
          <label for="event_min_spacing_strength" class="block text-sm font-medium leading-6 text-gray-900">Event Minimum Spacing Priority</label>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="event_min_spacing_strength" min="0" max="10" :value="show.evaluatorSettings.encourageEventMinimumSpacingStrength.toFixed(0)" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), encourageEventMinimumSpacingStrength: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.evaluatorSettings.encourageEventMinimumSpacingStrength)}}</p>
          </div>
        </div>
      </div>


      <div class="flex flex-col gap-4">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Person Event Settings</h1>

        <div>
          <label for="person_priority" class="block text-sm font-medium leading-6 text-gray-900">Person Spacing Priority</label>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="person_priority" min="0" max="10" :value="show.evaluatorSettings.personSpacingMultiplier.toFixed(0)" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), personSpacingMultiplier: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{ Math.round(show.evaluatorSettings.personSpacingMultiplier) }}</p>
          </div>
        </div>

        <div>
          <label for="person_min_spacing" class="block text-sm font-medium leading-6 text-gray-900">Person Minimum Spacing </label>
          <small class="block text-xs text-gray-500 font-medium leading-6">(will not guarantee this spacing but will encourage the algorithm)</small>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="person_min_spacing" min="0" max="10" :value="show.evaluatorSettings.encouragePersonMinimumSpacing.toFixed(0)" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), encouragePersonMinimumSpacing: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.evaluatorSettings.encouragePersonMinimumSpacing)}}</p>
          </div>
        </div>

        <div>
          <label for="person_min_spacing_strength" class="block text-sm font-medium leading-6 text-gray-900">Person Minimum Spacing Priority</label>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="person_min_spacing_strength" min="0" max="10" :value="show.evaluatorSettings.encouragePersonMinimumSpacingStrength.toFixed(0)" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), encouragePersonMinimumSpacingStrength: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.evaluatorSettings.encouragePersonMinimumSpacingStrength)}}</p>
          </div>
        </div>
      </div>

      <ButtonSolid @click="generatorSettingsOpen = false">Done</ButtonSolid>

    </div>
  </CustomDialog>
</template>