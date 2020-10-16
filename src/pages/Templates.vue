<template>
  <q-page class="page-templates nunito-font column items-center justify-start">
    <q-table
      class="templates-table"
      :data="linksList"
      :columns="columns"
      title="已保存的链接模板"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" title="编辑搜索项名称">
              <q-input v-model="props.row.name" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="template" :props="props">
            {{ props.row.template }}
            <q-popup-edit v-model="props.row.template" title="编辑模板">
              <q-input v-model="props.row.template" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="desc" :props="props">
            {{ props.row.desc }}
            <q-popup-edit v-model="props.row.desc" title="编辑描述">
              <q-input v-model="props.row.desc" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import fs from 'fs';
import path from 'path';
import { defineComponent } from '@vue/composition-api';
import { defaultTemplates } from '../utils/search-zen-link';
import initWindow from 'src/utils/init-window';
import { readSettings } from 'src/utils/read-write-settings';

const columns = [
  {
    name: 'name',
    label: '搜索项',
    field: 'name',
    align: 'left'
  },
  {
    name: 'template',
    label: '网址模板',
    field: 'template',
    align: 'left'
  },
  {
    name: 'desc',
    label: '描述',
    field: 'desc',
    align: 'left'
  }
];

export default defineComponent({
  data() {
    return {
      linksList: [],
      columns
    };
  },
  mounted() {
    const electronInstance = initWindow(this, 900, 460);
    readSettings(electronInstance, data => {
      this.linksList = JSON.parse(String(data)).templates;
    });
  }
});
</script>

<style lang="scss" scoped>
.templates-table {
  width: 90vw;
  margin: 30px auto;
}
</style>
