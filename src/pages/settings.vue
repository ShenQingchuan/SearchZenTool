<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="settings" />
        <q-toolbar-title class="header-title">
          设置
        </q-toolbar-title>
        <q-btn
          flat
          color="white"
          icon="keyboard_arrow_left"
          @click="$router.go(-1)"
        >
          返回
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="page-settings column items-center justify-start">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="搜索项名称"
            hint="请输入目标网站的名称"
            lazy-rules
            :rules="[val => (val && val.length > 0) || '搜索项名称不能为空！']"
          />
          <q-input
            filled
            v-model="template"
            label="搜索网址模板"
            hint="提示：从 ?q 或 ?keyword 等关键字符处截取"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || '搜索网址模板不能为空！'
            ]"
          />

          <q-input filled v-model="desc" label="搜索项描述" />

          <div>
            <q-btn label="保存" color="primary" @click="saveToLocalJSONFile" />
            <q-btn
              label="查看当前所有模板"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageSettings',
  data() {
    return {
      name: '',
      template: '',
      desc: '',
      linksList: [],
      linksListShow: false
    };
  },
  methods: {
    saveToLocalJSONFile() {}
  }
});
</script>

<style lang="scss" scoped>
.page-settings {
  &,
  & * {
    width: 80vw;
    margin: 6px auto;
  }
}
</style>
