<script setup lang="ts">
import {useEntryStore} from "@/stores/entries";
import InputText from "@/components/InputText.vue";
import {
  TrashIcon
} from '@heroicons/vue/24/outline'
import DeleteDialog from "@/components/DialogDelete.vue";
import {onMounted, ref} from "vue";
import TabReference from "@/components/TabReference.vue";
import ButtonSolid from "@/components/ButtonSolid.vue";
import InputFile from "@/components/InputFile.vue";
import draggable from 'vuedraggable'

const entries = useEntryStore()

const showingDeleteShow = ref(false)

const showingDelete = ref(false)
const deleteDialogRow = ref<number>(0)

const tableRef = ref<HTMLDivElement>()

onMounted(() => {
})
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Entries</h1>
        <p class="mt-2 text-sm text-gray-700">Enter all the entries in your show including their title, event type, and people. These can be in any order. Show Sequence Creator does not save anything for you! Download your entries to get them back later. When you are done adding your entries go to the <TabReference to="/show">Show</TabReference> tab to generate an order that spaces out items in your show.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex flex-row gap-2">
        <InputFile @change="entries.uploadCsv">Upload csv file</InputFile>
        <ButtonSolid type="button" @click="entries.downloadCsv()">Download</ButtonSolid>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full divide-y divide-gray-300" ref="tableRef">
            <thead>
            <tr>
              <th scope="col"><span class="sr-only">Number</span></th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Name <span class="text-gray-500 text.sm">(optional)</span></th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Event Type</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">People <span class="text-gray-500 text-sm">(Seperated by comma)</span></th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Lock Location Percent <span class="text-gray-500 text-sm">(optional)</span></th>


              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                <span class="sr-only">Remove</span>
              </th>
            </tr>
            </thead>
            <draggable class="divide-y divide-gray-200 bg-white" :list="entries.entries" item-key="id" tag="tbody" handle=".handle">
              <template #item="{element, index}">
                <tr>
                  <td class="handle">{{index+1}}</td>
                  <td class="whitespace-nowrap py-2 lg:pl-4 lg:pr-3 text-sm font-medium text-gray-900">
                    <InputText placeholder="name" :value="element.name" @change="(newValue) => entries.updateName(index, newValue)"></InputText>
                  </td>
                  <td class="whitespace-nowrap lg:px-3 py-2 text-sm text-gray-500">
                    <InputText placeholder="event" :value="element.event" @change="(newValue) => entries.updateEvent(index, newValue)"></InputText>
                  </td>
                  <td class="whitespace-nowrap lg:px-3 py-2 text-sm text-gray-500">
                    <InputText placeholder="person, person" :value="element.people" @change="(newValue) => entries.updatePeople(index, newValue)"></InputText>
                  </td>
                  <td class="whitespace-nowrap lg:px-3 py-2 text-sm text-gray-500">
                    <InputText placeholder="100" :value="element.percentage" @change="(newValue) => entries.updatePercentage(index, newValue)"></InputText>
                  </td>
                  <td class="relative whitespace-nowrap lg:pl-3 lg:pr-4 text-right text-sm font-medium">
                    <button @click="() => {deleteDialogRow = index; showingDelete = true } " tabindex="-1" class="text-red-500 hover:text-red-900"
                    >
                      <TrashIcon class="w-6 h-6"></TrashIcon>
                      <span class="sr-only">Remove, {{ element.name }}</span></button>
                  </td>
                </tr>
              </template>
            </draggable>
          </table>
          <div class="flex flex-row justify-center mt-4">
            <div class="grow"></div>
            <ButtonSolid @click="entries.addEntry">Add entry</ButtonSolid>
            <div class="grow flex flex-row justify-end">
              <button @click="() => {showingDeleteShow = true } " tabindex="-1" class="text-red-500 hover:text-red-900 flex flex-row gap-2 border border-red-500 hover:border-red-900 rounded p-2">
                Delete Show<TrashIcon class="w-6 h-6"></TrashIcon></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DeleteDialog v-model:showing="showingDelete" @delete="() => entries.removeEntry(deleteDialogRow)"></DeleteDialog>
  <DeleteDialog v-model:showing="showingDeleteShow" @delete="() => entries.clear()"></DeleteDialog>
</template>