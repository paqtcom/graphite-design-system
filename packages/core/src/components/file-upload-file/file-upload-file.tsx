import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'gr-file-upload-file',
  styleUrl: 'file-upload-file.scss',
  shadow: true,
})
export class FileUploadFile {
  /**
   * file Id
   */
  @Prop() fileId: number = null;

  /**
   * file name
   */
  @Prop() name = '';

  /**
   * removeFile - event that gets triggered on file removal
   */
  @Event() fwRemoveFile: EventEmitter;

  /**
   * private
   * remove
   */
  remove() {
    this.fwRemoveFile.emit({
      fileId: this.fileId,
    });
  }

  /**
   * render
   * @returns {JSX.Element}
   */
  render() {
    /* eslint-disable-next-line */
    return (
      <div class='files-content'>
        <div class='files-content-icon'>
          icon
        </div>
        <div class='files-content-file'>
          <span class='files-content-file-name'>{this.name}</span>
          <button
            class='files-content-file-remove'
            onClick={() => this.remove()}
          >
            remove
          </button>
        </div>
      </div>
    );
  }
}