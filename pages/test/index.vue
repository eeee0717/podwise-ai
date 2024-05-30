<script setup lang="ts">
import { getAuthToken } from '~/utils/getAuthToken'

const supabase = useSupabaseClient()

async function Test() {
  // await getAuthToken()
  const { data, error } = await supabase.from('podcast').select('*')
  console.log(data)
}
async function Add() {
  const { data, error } = await $fetch('/api/addPodcast', {
    method: 'POST',
    body: JSON.stringify({
      title: 'test',
      description: 'test',
      picUrl: 'test',
      datePublished: '2022-01-01',
      duration: 1000,
    }),
  })
  console.log(data)
}
</script>

<template>
  <div>
    <h1>This is Test page</h1>
    <UButton @click="Test">
      Test
    </UButton>
    <UButton @click="Add">
      Add
    </UButton>
  </div>
</template>
