<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-electron-drag">
        <q-icon name="settings" />
        <q-toolbar-title class="header-title">
          设置
        </q-toolbar-title>
        <q-btn
          flat
          color="white"
          icon="keyboard_arrow_left"
          @click="$router.push('/#/')"
        >
          返回首页
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="page-settings column items-center justify-start">
        <q-form class="q-gutter-md">
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
            <q-btn label="保存" color="primary" @click="saveNewTemplate" />
            <q-btn color="primary" flat class="q-ml-sm">
              <a href="/#/templates" class="plain-a text-primary"
                >查看所有模板</a
              >
            </q-btn>
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import initWindow from 'src/utils/init-window';
import { appendSettings } from 'src/utils/read-write-settings';

export default defineComponent({
  name: 'PageSettings',
  data() {
    return {
      name: '',
      template: '',
      desc: ''
    };
  },
  mounted() {
    initWindow(this.$q.electron, 400, 460);
  },
  methods: {
    saveNewTemplate() {
      this.$rlogger.info('Starting save new template to local JSON file.');
      appendSettings(
        this.$q.electron,
        {
          name: this.name,
          template: this.template,
          desc: this.desc
        },
        () => {
          this.$q.dialog({
            title: '添加成功',
            message: `已将 ${this.name} 添加到模板列表中！`
          });
          this.clearForm();
        },
        () => {
          this.$q.dialog({
            title: '添加失败',
            message: `${this.name} 同名同网址模板的记录已存在！`
          });
          this.clearForm();
        }
      );
    },
    clearForm() {
      this.name = '';
      this.template = '';
      this.desc = '';
    }
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
.plain-a {
  margin: 0;
  text-decoration: none;
}
</style>
