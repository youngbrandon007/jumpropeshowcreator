<script setup lang="ts">

import {useEntryStore} from "@/stores/entries";
import InputText from "@/components/InputText.vue";
import {
  TrashIcon
} from '@heroicons/vue/24/outline'
import DeleteDialog from "@/components/DeleteDialog.vue";
import {ref} from "vue";
import TabReference from "@/components/TabReference.vue";

const entries = useEntryStore()

const showingDelete = ref(false)
const deleteDialogRow = ref<number>(0)
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Entries</h1>
        <p class="mt-2 text-sm text-gray-700">Enter all the entries in your show including their title, event, and people. These can be in any order. Show Sequence Creator does not save anything for you! Download your entries to get them back later. When you are done go back to the <TabReference to="/show">Show</TabReference> tab.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex flex-row gap-2">
        <div class="flex justify-center rounded-md border border-dashed border-gray-900/25 px-6 py-2">
          <div class="text-center">
            <div class="flex text-sm leading-6 text-gray-600">
              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Upload csv file</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="entries.uploadCsv" />
              </label>
            </div>
          </div>
        </div>
        <button type="button" @click="entries.downloadCsv()" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Download</button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full divide-y divide-gray-300">
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
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(entry, index) in entries.entries" :key="index">
                <td>{{index+1}}</td>
                <td class="whitespace-nowrap py-2 lg:pl-4 lg:pr-3 text-sm font-medium text-gray-900">
                  <InputText placeholder="name" :value="entry.name" @change="(newValue) => entries.updateName(index, newValue)"></InputText>
                </td>
                <td class="whitespace-nowrap lg:px-3 py-2 text-sm text-gray-500">
                  <InputText placeholder="event" :value="entry.event" @change="(newValue) => entries.updateEvent(index, newValue)"></InputText>
                </td>
                <td class="whitespace-nowrap lg:px-3 py-2 text-sm text-gray-500">
                  <InputText placeholder="person, person" :value="entry.people" @change="(newValue) => entries.updatePeople(index, newValue)"></InputText>
                </td>
                <td class="whitespace-nowrap lg:px-3 py-2 text-sm text-gray-500">
                  <InputText placeholder="100" :value="entry.percentage" @change="(newValue) => entries.updatePercentage(index, newValue)"></InputText>
                </td>
                <td class="relative whitespace-nowrap lg:pl-3 lg:pr-4 text-right text-sm font-medium">
                  <button @click="() => {deleteDialogRow = index; showingDelete = true } " tabindex="-1" class="text-red-500 hover:text-red-900"
                  >
                    <TrashIcon class="w-6 h-6"></TrashIcon>
                    <span class="sr-only">Remove, {{ entry.name }}</span></button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex flex-row justify-center p-2">
            <button type="button" @click="entries.addEntry" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add entry</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DeleteDialog v-model:showing="showingDelete" @delete="() => entries.removeEntry(deleteDialogRow)"></DeleteDialog>
</template>