<script setup lang="ts">
import {useEntryStore} from "@/stores/entries";
import {useShowStore} from "@/stores/show";
import TabReference from "@/components/TabReference.vue";
import ButtonSolid from "@/components/ButtonSolid.vue";
import draggable from 'vuedraggable'
import CustomDialog from "@/components/CustomDialog.vue";
import {ref} from "vue";
import InputSlider from "@/components/InputSlider.vue";
import type {RandomGeneratorSettings} from "@/lib/generatorRandom";
import {DEFAULT_EVALUATOR, type EvaluatorSettings} from "@/lib/evaluator";
import {DEFAULT_GENERATOR} from "@/lib/generators";

const entries = useEntryStore()
const show = useShowStore()

const generatorSettingsOpen = ref<boolean>(false)
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

          <div class="flex flex-row justify-center p-2 gap-2">
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
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                <span class="sr-only">Options</span>
              </th>
            </tr>
            </thead>
            <draggable class="divide-y divide-gray-200 bg-white" :list="show.show" item-key="id" tag="tbody" handle=".handle">
              <template #item="{element, index}">
                <tr>
                  <td class="handle">{{index+1}}</td>
                  <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {{element.title}}
                  </td>
<!--                  <td v-if="[0, 1, 2,3,4,5].includes(index)">-->
<!--                    <div class="w-10 h-0 overflow-visible">-->
<!--                      <div class="relative z-50 border-r-8 border-r-amber-500 w-16" :style="{ height: (38*3).toFixed(2)+'px', borderRadius: '50%', borderColor: 'hsl(' + (1 + (index * 40) % 100).toFixed() + ', 90%, 50%)'} "></div>-->
<!--                    </div>-->
<!--                  </td>-->
                </tr>
              </template>
            </draggable>
          </table>
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
            <InputSlider id="iterations" min="10" max="40" :value="Math.log10(show.generatorSettings.iterations) * 10" @update:value="(value) => show.generatorSettings = { ...(show.generatorSettings), iterations: 10 ** (Number(value)/10) } as RandomGeneratorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.generatorSettings.iterations)}}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Generator Event Settings</h1>


        <div>
          <label for="event_priority" class="block text-sm font-medium leading-6 text-gray-900">Event Spacing Priority</label>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="event_priority" min="0" max="10" :value="show.evaluatorSettings.eventSpacingMultiplier" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), eventSpacingMultiplier: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{ Math.round(show.evaluatorSettings.eventSpacingMultiplier) }}</p>
          </div>
        </div>

        <div>
          <label for="event_min_spacing" class="block text-sm font-medium leading-6 text-gray-900">Event Minimum Spacing </label>
          <small class="block text-xs text-gray-500 font-medium leading-6">(will not guarantee this spacing but will encourage the algorithm)</small>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="event_min_spacing" min="0" max="10" :value="show.evaluatorSettings.encourageEventMinimumSpacing" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), encourageEventMinimumSpacing: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.evaluatorSettings.encourageEventMinimumSpacing)}}</p>
          </div>
        </div>

        <div>
          <label for="event_min_spacing_strength" class="block text-sm font-medium leading-6 text-gray-900">Event Minimum Spacing Priority</label>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="event_min_spacing_strength" min="0" max="10" :value="show.evaluatorSettings.encourageEventMinimumSpacingStrength" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), encourageEventMinimumSpacingStrength: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.evaluatorSettings.encourageEventMinimumSpacingStrength)}}</p>
          </div>
        </div>
      </div>


      <div class="flex flex-col gap-4">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Person Event Settings</h1>

        <div>
          <label for="person_priority" class="block text-sm font-medium leading-6 text-gray-900">Person Spacing Priority</label>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="person_priority" min="0" max="10" :value="show.evaluatorSettings.personSpacingMultiplier" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), personSpacingMultiplier: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{ Math.round(show.evaluatorSettings.personSpacingMultiplier) }}</p>
          </div>
        </div>

        <div>
          <label for="person_min_spacing" class="block text-sm font-medium leading-6 text-gray-900">Person Minimum Spacing </label>
          <small class="block text-xs text-gray-500 font-medium leading-6">(will not guarantee this spacing but will encourage the algorithm)</small>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="person_min_spacing" min="0" max="10" :value="show.evaluatorSettings.encouragePersonMinimumSpacing" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), encouragePersonMinimumSpacing: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.evaluatorSettings.encouragePersonMinimumSpacing)}}</p>
          </div>
        </div>

        <div>
          <label for="person_min_spacing_strength" class="block text-sm font-medium leading-6 text-gray-900">Person Minimum Spacing Priority</label>
          <div class="flex flex-row gap-4 items-center">
            <InputSlider id="person_min_spacing_strength" min="0" max="10" :value="show.evaluatorSettings.encouragePersonMinimumSpacingStrength" @update:value="(value) => show.evaluatorSettings = { ...(show.evaluatorSettings), encouragePersonMinimumSpacingStrength: Number(value) } as EvaluatorSettings"></InputSlider>
            <p class="w-24 text-right">{{Math.round(show.evaluatorSettings.encouragePersonMinimumSpacingStrength)}}</p>
          </div>
        </div>
      </div>

      <ButtonSolid @click="generatorSettingsOpen = false">Done</ButtonSolid>

    </div>
  </CustomDialog>
</template>