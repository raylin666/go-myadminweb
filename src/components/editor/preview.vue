<template>
  <MdPreview
      :showCodeRowNumber="true"
      v-model="text" 
      theme="light"
      previewTheme="default" 
      codeTheme="qtcreator"
    />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { MdPreview } from 'md-editor-v3';
  import 'md-editor-v3/lib/preview.css';

  const text = ref('');
</script>
