<template>
  <q-page class="page-index nunito-font column items-center justify-start">
    <q-input
      class="content-inputer"
      stack-label
      v-model="text"
      label="搜索内容"
      autofocus
      :active="false"
      filled
      clearable
      clear-icon="close"
    />

    <q-card class="links-card">
      <q-card-section>
        <q-chip
          v-for="link in linksList"
          :key="link.name"
          clickable
          color="primary"
          text-color="white"
          @click="onLinkClick(link.template)"
        >
          <q-avatar color="red" text-color="white" icon="directions" />
          {{ link.name }}

          <q-tooltip
            v-if="link.desc && link.desc.length > 0"
            transition-show="scale"
            transition-hide="scale"
            max-width="160px"
          >
            {{ link.desc }}
          </q-tooltip>
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
import { defineComponent } from '@vue/composition-api';
import { ISearchZenLink } from '../utils/search-zen-link';
import {
  readSettings,
  SettingsObjectType
} from 'src/utils/read-write-settings';
import initWindow from 'src/utils/init-window';

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      text: '',
      focusInput: false,
      pasteConfirmDialogShow: false,
      selectedLink: undefined,
      linksList: [] as ISearchZenLink[]
    };
  },
  mounted() {
    const electronInstance = this.$q.electron;
    initWindow(electronInstance, 400, 440);

    electronInstance.ipcRenderer.on('hotkeyPressed', () => {
      const gotFromClipboard = electronInstance.clipboard.readText();
      if (gotFromClipboard.length) {
        if (!this.pasteConfirmDialogShow) {
          this.pasteConfirmDialogShow = true;
        }
      }
    });

    readSettings(electronInstance, data => {
      this.linksList = (JSON.parse(
        String(data)
      ) as SettingsObjectType).templates;
    });
  },
  methods: {
    onLinkClick(link: string) {
      const url = link.replace('{%s}', this.text);
      void this.$q.electron.shell
        .openExternal(url)
        .then(() => this.$q.electron.clipboard.clear());
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
