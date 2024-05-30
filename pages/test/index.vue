<script setup lang="ts">
import { getAuthToken } from '~/utils/getAuthToken'

const supabase = useSupabaseClient()

async function Test() {
  // await getAuthToken()
  const { data, error } = await supabase.from('podcast').select('*')
  console.log(data)
}
async function Add() {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const { data, error } = await supabase.from('podcast').insert([
    {
      pid: '123',
      title: 'test',
      description: 'test',
      picUrl: 'test',
    },
  ])
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
