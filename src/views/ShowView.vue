<script setup lang="ts">
import {useEntryStore} from "@/stores/entries";
import {useShowStore} from "@/stores/show";
import TabReference from "@/components/TabReference.vue";
import ButtonSolid from "@/components/ButtonSolid.vue";
import draggable from 'vuedraggable'

const entries = useEntryStore()
const show = useShowStore()
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
                </tr>
              </template>
            </draggable>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>