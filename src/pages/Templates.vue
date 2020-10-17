<template>
  <q-page class="page-templates nunito-font column items-center justify-start">
    <q-table
      class="templates-table"
      :data="linksList"
      :columns="columns"
      row-key="name"
      rows-per-page-label="每页项数："
    >
      <template v-slot:top>
        <div class="col q-table__title">已保存的链接模板</div>
        <div class="col-8 text-right text-primary none-select">
          点击表项弹出编辑框，敲击回车确认保存
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="colName in ['name', 'template', 'desc']"
            :key="colName"
            :props="props"
          >
            {{ props.row[colName] }}
            <q-popup-edit
              v-model="props.row[colName]"
              title="编辑搜索项名称"
              @save="onItemSave"
            >
              <q-input v-model="props.row[colName]" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-btn
            flat
            class="delete-btn"
            color="primary"
            icon="delete"
            @click="onItemDelete(props.row)"
          />
        </q-tr>
      </template>

      <template v-slot:no-data>
        <q-btn flat dense color="primary" icon="refresh" @click="reload"
          >读取本地模板配置文件出错啦！点击重试</q-btn
        >
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import initWindow from 'src/utils/init-window';
import {
  readSettings,
  rewriteSettings,
} from 'src/utils/read-write-settings';
import { ISearchZenLink } from 'src/utils/search-zen-link';

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
      selected: [] as ISearchZenLink[],
      linksList: [] as ISearchZenLink[],
      columns
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    reload() {
      initWindow(this.$q.electron, 900, 460);
      readSettings(this.$q.electron, data => {
        this.linksList = data.templates;
      });
    },
    // eslint-disable-next-line
    onItemSave(value: any, initialValue: any) {
      this.$rlogger.info('Rewrite from pop-up editing');
      rewriteSettings(this.$q.electron, this.linksList);
    },
    onItemDelete(target: ISearchZenLink) {
      this.$rlogger.info(JSON.stringify(target));
      this.linksList.forEach((item, i) => {
        if (item.name === target.name) {
          this.linksList.splice(i, 1);
        }
      });
      rewriteSettings(this.$q.electron, this.linksList);
    }
  }
});
</script>

<style lang="scss" scoped>
.templates-table {
  width: 90vw;
  margin: 30px auto;
}
.delete-btn {
  height: 48px;
}
</style>
