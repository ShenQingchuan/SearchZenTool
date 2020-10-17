<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="none-select q-electron-drag">
      <q-toolbar class="q-electron-drag">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="header-title">
          Search-Zen 极速搜索
        </q-toolbar-title>

        <q-btn
          v-if="$route.path === '/templates'"
          flat
          color="white"
          dense
          @click="$router.push('/settings')"
          icon="control_point"
        >
          <span style="margin-left: 4px;">添加新模板</span>
        </q-btn>
        <div v-if="$route.path === '/'">Quasar v{{ $q.version }}</div>
        <q-btn
          v-else
          flat
          color="white"
          dense
          @click="$router.go(-1)"
          icon="keyboard_arrow_left"
          >返回</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          菜单栏
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const sidebarLinksData = [
  {
    title: '新增搜索项',
    caption: '在此添加网址模板',
    icon: 'control_point',
    link: '/#/settings'
  },
  {
    title: '模板列表',
    caption: '查看已保存的模板',
    icon: 'table_view',
    link: '/#/templates'
  }
];

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(sidebarLinksData);

    return { leftDrawerOpen, essentialLinks };
  }
});
</script>
