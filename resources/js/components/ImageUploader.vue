<template>
    <file-pond
        ref="pond"
        class="file-pond"
        @addfile="convertToBase64"
        label-idle="Drop files here..."
        accepted-file-types="image/jpeg, image/png"
        :allow-multiple="false"/>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import vueFilePond from 'vue-filepond';
    import * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import * as FilePondPluginImagePreview from 'filepond-plugin-image-preview';
    import * as FilePondPluginFileEncode from 'filepond-plugin-file-encode';

    const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginFileEncode);

    interface UploadedFile {
        getFileEncodeBase64String: () => Promise<string>
    }

    interface FilePondUploader {
        getFiles: () => Promise<UploadedFile[]>
    }

    @Component({components: {FilePond}})
    export default class TweetFeed extends Vue {
        public async convertToBase64() {
            const uploadedImage: UploadedFile = await this.filePond.getFiles()[0];
            const base64Image: string = await uploadedImage.getFileEncodeBase64String();
            this.$emit('image-uploaded', base64Image);
        }

        private get filePond(): FilePondUploader {
            return this.$refs.pond as unknown as FilePondUploader;
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../node_modules/filepond/dist/filepond.min.css';
    @import '../../../node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
</style>
