import { Component, h, Element, Prop, Watch, Event, EventEmitter, State, Method } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { hasSlot } from '../../utils/slot';
import { debounceEvent, inheritAttributes, renderHiddenInput } from '../../utils/helpers';

let id = 0;

/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot icon-only - Should be used on an icon in a button that has no text.
 * @slot start - Content is placed to the left of the button text (will be to the right when we support right-to-left direction)
 * @slot end - Content is placed to the right of the button text (will be to the left when we support right-to-left direction)
 */
@Component({
  tag: 'gr-file-upload',
  styleUrl: 'file-upload.scss',
  shadow: true,
})
export class FileUpload {
  private fileUpload: HTMLElement;
  private dragAndDropWrapper: HTMLElement;
  private dropZone: HTMLElement;

  private inputId = `input-${++id}`;
  private labelId = `input-label-${id}`;
  private helpTextId = `input-help-text-${id}`;
  private invalidTextId = `input-invalid-text-${id}`;
  private inheritedAttributes: { [k: string]: any } = {};

  @Element() el!: HTMLGrFileUploadElement;

  @State() hasFocus = false;
  @State() hasHelpTextSlot = false;
  @State() hasInvalidTextSlot = false;
  @State() hasLabelSlot = false;
  @State() isPasswordVisible = false;

  /** The file upload's value attribute. */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /** Set the allowed upload size */
  @Prop() maxUploadSize = 1024;

  /** Set the allowed file types */
  @Prop() allowedFileTypes = '';

  /** Set to true to disable the file upload control. */
  @Prop() disabled = false;

  /** The file uploads's name. */
  @Prop({ reflect: true }) name = '';

  /** The file uploads's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

    /** The file upload's label. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** Set to true to display a required indicator, adds an asterisk to label */
  @Prop() requiredIndicator = false;

  /** The file upload's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

  /** The file upload's invalid text. Alternatively, you can use the invalid-text slot. */
  @Prop() invalidText = '';

  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  @Prop({ reflect: true }) invalid = false;

  /** If `true`, the user cannot modify the files. */
  @Prop({ reflect: true }) readonly = false;

  /** Set to true to enable multiple uploads. */
  @Prop() multiple = false;

  /** Set to true to enable upload previews. */
  @Prop() preview = false;

  @Prop({ reflect: true }) blockUpload = false;
  
  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `gr-change` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0;

  showFiles = false
  
  @Watch('debounce')
  protected debounceChanged() {
    this.grChange = debounceEvent(this.grChange, this.debounce);
  }

  @Watch('helpText')
  @Watch('invalidText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  /** Emitted when the control's value changes. */
  @Event({ eventName: 'gr-change' }) grChange: EventEmitter<void>;

  /** Emitted when the clear button is activated. */
  @Event({ eventName: 'gr-clear' }) grClear: EventEmitter<void>;

  /** Emitted when the control receives input. */
  @Event({ eventName: 'gr-input' }) grInput: EventEmitter<void>;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'gr-focus' }) grFocus: EventEmitter<void>;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'gr-blur' }) grBlur: EventEmitter<void>;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'gr-error' }) grError: EventEmitter<void>;
  
  windowDragEnterEvent = () => {
    this.showDropZone()
  }

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleAllowDrag = this.handleAllowDrag.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
    this.el.shadowRoot.addEventListener('dragenter', this.windowDragEnterEvent);

    this.debounceChanged();
  }

  componentWillLoad() {
    this.handleSlotChange();
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
  }

  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Sets focus on the fileUpload. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.fileUpload.focus(options);
  }

  /** Removes focus from the fileUpload. */
  @Method()
  async removeFocus() {
    this.fileUpload.blur();
  }

  @Method()
  async calculateFileWrapperHeight() {
    await customElements.whenDefined('gr-file-upload');

    const flowWrapper = document.getElementById('flow-wrapper')
    if (!flowWrapper) {
      return
    }
    const dragAndDropWrapper = this.dragAndDropWrapper
    const wrapperHeight = dragAndDropWrapper.clientHeight
    const extraPadding = 80
    flowWrapper!.style.paddingBottom = `${wrapperHeight + extraPadding}px`
  }

  validFileType(file) {
    return this.allowedFileTypes.includes(file.type);
  }

  returnFileSize(number) {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }

  showDropZone() {
    this.dropZone.style.display = 'flex'
  }


  hideDropZone() {
    this.dropZone.style.display = 'none'
  }

  handleChange($event: Event) {
    const files = []
    const target = $event.target as HTMLInputElement
    if (target && target.files) {
      for (let i = 0; i < target.files.length; i++) {
        files.push(target.files[i])
      }
    }

    console.log(target.files);
    
    this.grChange.emit();
    this.showFiles = true
    this.calculateFileWrapperHeight()
    this.grChange.emit();
  }

  toggleFileVisibility() {
    this.showFiles = !this.showFiles
  }

  handleBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
  }

  handleLabelClick() {
    this.fileUpload.focus();
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
  }

  handleAllowDrag($event: DragEvent) {
    $event.preventDefault()

    if ($event.dataTransfer) {
      $event.dataTransfer.dropEffect = 'copy'
    }
  }

  handleDrop($event: DragEvent) {
    $event.preventDefault()

    const files = []
    if (this.blockUpload) {
      this.preview = true
      this.calculateFileWrapperHeight()
      this.hideDropZone()
      return
    }
    if ($event.dataTransfer && $event.dataTransfer.items) {
      for (let i = 0; i < $event.dataTransfer.items.length; i++) {
        if ($event.dataTransfer.items[i].kind === 'file') {
          const file = $event.dataTransfer.items[i].getAsFile()

          files.push(file)
        }
      }
    } else if ($event.dataTransfer && $event.dataTransfer.files) {
      for (let i = 0; i < $event.dataTransfer.files.length; i++) {
        files.push($event.dataTransfer.files[i])
      }
    }
    if (!this.multiple && files.length > 1) {
      this.grError.emit()
      this.hideDropZone()
      return
    }
    this.grChange.emit();
    this.showFiles = true
    this.calculateFileWrapperHeight()
    this.hideDropZone()
  }

  handleDragLeave = () => {
    this.hideDropZone()
  }

  render() {
    renderHiddenInput(this.el, this.name, '', this.disabled);

    return (
      <div ref={dragAndDropWrapper => (this.dragAndDropWrapper = dragAndDropWrapper)}>
      <FormControl
        inputId={this.inputId}
        label={this.label}
        labelId={this.labelId}
        hasLabelSlot={this.hasLabelSlot}
        helpTextId={this.helpTextId}
        helpText={this.helpText}
        hasHelpTextSlot={this.hasHelpTextSlot}
        invalidTextId={this.invalidTextId}
        invalidText={this.invalidText}
        invalid={this.invalid}
        hasInvalidTextSlot={this.hasInvalidTextSlot}
        size={this.size}
        onLabelClick={this.handleLabelClick}
        requiredIndicator={this.requiredIndicator}
      >
        <div 
          class={{
            [`input-${this.size}`]: true,
          }}
        >
          <input
            ref={el => (this.fileUpload = el)}
            id={this.name}
            name={this.name}
            type="file"
            disabled={this.disabled}
            readonly={this.readonly}
            value={this.value}
            accept={this.allowedFileTypes}
            multiple={this.multiple}
            aria-labelledby={this.labelId}
            aria-describedby={this.invalid ? this.invalidTextId : this.helpTextId}
            aria-invalid={this.invalid ? 'true' : 'false'}
            aria-required={this.requiredIndicator ? 'true' : 'false'}
            onChange={this.handleChange}
            class="input-control"
            {...this.inheritedAttributes}
          />

          {/* {this.preview && (
            <div 
              ref={previewWindow => (this.previewWindow = previewWindow)}
              class="input-preview"
            >
              <span>No files currently selected for upload</span>
            </div>
          )} */}
        </div>
      </FormControl>

      <div
        ref={dropZone => (this.dropZone = dropZone)}
        class="dropzone"
        onDragEnter={this.handleAllowDrag}
        onDragOver={this.handleAllowDrag}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        <div class="mt-4 pointer-events-none">
          Drop your file(s)
        </div>
      </div>
      </div>
    )
  }
}
