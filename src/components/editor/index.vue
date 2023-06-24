<template>
  <MdEditor v-model="text" theme="light" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const text = ref('');
</script>
