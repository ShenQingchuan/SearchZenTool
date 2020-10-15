<template>
  <q-page class="page-index column items-center justify-start">
    <q-input
      class="content-inputer"
      standout="bg-primary text-white"
      stack-label
      v-model="text"
      label="搜索内容"
      autofocus
      :active="false"
    />

    <q-card class="links-card">
      <q-card-section>
        <q-chip
          v-for="link in linksConfig"
          :key="link.name"
          clickable
          color="primary"
          text-color="white"
          @click="onLinkClick(link.template)"
        >
          <q-avatar color="red" text-color="white" icon="directions" />
          {{ link.name }}
        </q-chip>
      </q-card-section>
    </q-card>

    <q-dialog
      v-model="pasteConfirmDialogShow"
      position="bottom"
      @keypress.enter="confirmAutoPaste"
    >
      <q-card>
        <q-card>
          <q-card-section class="row items-center">
            <q-icon
              name="content_paste"
              color="primary"
              style="font-size: 18px;"
            />
            <div class="q-ml-sm">
              监测到您的剪贴板上有内容，是否帮您粘贴到输入框？
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="取消（清除剪贴板）"
              color="primary"
              @click="cancelAutoPaste"
            />
            <q-btn
              flat
              label="是的，立即粘贴"
              color="primary"
              @click="confirmAutoPaste"
            />
          </q-card-actions>
        </q-card>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { ISearchZenLink, defaultLinksConfig } from 'boot/search-zen-link';

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      text: '',
      focusInput: false,
      pasteConfirmDialogShow: false,
      selectedLink: undefined,
      linksConfig: [...defaultLinksConfig]
    };
  },
  mounted() {
    const electronInstance = this.$q.electron;

    const gotFromClipboard = electronInstance.clipboard.readText();
    if (gotFromClipboard.length) {
      if (!this.pasteConfirmDialogShow) {
        this.pasteConfirmDialogShow = true;
      }
    }
  },
  methods: {
    onLinkClick(link: string) {
      const url = link.replace('{%s}', this.text);
      this.$q.electron.shell
        .openExternal(url)
        .then(_ => this.$q.electron.clipboard.clear());
    },
    confirmAutoPaste() {
      this.text = this.$q.electron.clipboard.readText();
      this.pasteConfirmDialogShow = false;
    },
    cancelAutoPaste() {
      this.$q.electron.clipboard.clear();
      this.pasteConfirmDialogShow = false;
    }
  }
});
</script>

<style scoped>
.page-index {
  font-family: 'Nunito', sans-serif;
}
</style>
