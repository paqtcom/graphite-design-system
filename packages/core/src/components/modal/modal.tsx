import { Component, h, Element, Prop, Event, EventEmitter, Watch, Method, Host } from '@stencil/core';
import { getNearestTabbableElement } from '../../utils/tabbable';

let id = 0;

@Component({
  tag: 'gr-modal',
  styleUrl: 'modal.scss',
  shadow: true,
})
export class Modal {
  private componentId = `modal-${++id}`;
  private isVisible = false;
  private trigger: HTMLElement;

  @Element() el: HTMLGrModalElement;

  /** Indicates whether or not the modal is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Set to true to disable the select control. */
  @Prop() showCancelButton = false;

/**
   * The different variants.
   * The options are: `"default"`, `"primary"`, `"secondary"`, `"danger"`, and `"plain"`.
   */
  @Prop({ reflect: true }) cancelButtonVariant?: 'default' | 'primary' | 'secondary' | 'danger' | 'plain' = 'default';

  /** Emitted when the modal opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event({ eventName: 'gr-show' }) grShow: EventEmitter<void>;

  /** Emitted after the modal opens and all transitions are complete. */
  @Event({ eventName: 'gr-after-show' }) grAfterShow: EventEmitter<void>;

  /** Emitted when the modal closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event({ eventName: 'gr-hide' }) grHide: EventEmitter<void>;

  /** Emitted after the modal closes and all transitions are complete. */
  @Event({ eventName: 'gr-after-hide' }) grAfterHide: EventEmitter<void>;


  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
    this.updateAccessibleTrigger();
  }

  connectedCallback() {
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
    this.handleTriggerKeyUp = this.handleTriggerKeyUp.bind(this);
  }

  componentDidLoad() {
    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  disconnectedCallback() {
    this.hide();
  }

  /** Shows the modal dialog */
  @Method()
  async show() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (this.isVisible) {
      return;
    }

    const grShow = this.grShow.emit();
    if (grShow.defaultPrevented) {
      this.open = false;
      return;
    }

    document.addEventListener('keydown', this.handleDocumentKeyDown);

    this.isVisible = true;
    this.open = true;
  }


  /** Hides the modal dialog */
  @Method()
  async hide() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.isVisible) {
      return;
    }

    const grHide = this.grHide.emit();
    if (grHide.defaultPrevented) {
      this.open = true;
      return;
    }

    document.addEventListener('keydown', this.handleDocumentKeyDown);

    this.isVisible = false;
    this.open = false;
  }

  /** Sets focus on the trigger. */
  @Method()
  async focusOnTrigger() {
    const slot = this.trigger.querySelector('slot');
    const trigger = slot.assignedElements({ flatten: true })[0] as any;
    if (trigger) {
      if (typeof trigger.setFocus === 'function') {
        trigger.setFocus();
      } else if (typeof trigger.focus === 'function') {
        trigger.focus();
      }
    }
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    // Close when escape is pressed
    if (event.key === 'Escape') {
      this.hide();
      this.focusOnTrigger();
      return;
    }
  }

  handleTriggerClick() {
    this.open ? this.hide() : this.show();
  }

  handleTriggerKeyDown(event: KeyboardEvent) {
    // Close when escape or tab is pressed
    if (event.key === 'Escape') {
      this.focusOnTrigger();
      this.hide();
      return;
    }

     if ([' ', 'Enter'].includes(event.key)) {
      event.preventDefault();
     }
  }

  handleTriggerKeyUp(event: KeyboardEvent) {
    // Prevent space from triggering a click event in Firefox
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

    handleTriggerSlotChange() {
    this.updateAccessibleTrigger();
  }

  //
  // Slotted triggers can be arbitrary content, but we need to link them to the dropdown panel with `aria-haspopup` and
  // `aria-expanded`. These must be applied to the "accessible trigger" (the tabbable portion of the trigger element
  // that gets slotted in) so screen readers will understand them. The accessible trigger could be the slotted element,
  // a child of the slotted element, or an element in the slotted element's shadow root.
  //
  // For example, the accessible trigger of an <gr-button> is a <button> located inside its shadow root.
  //
  // To determine this, we assume the first tabbable element in the trigger slot is the "accessible trigger."
  //
  updateAccessibleTrigger() {
    const slot = this.trigger.querySelector('slot') as HTMLSlotElement;
    const assignedElements = slot.assignedElements({ flatten: true }) as HTMLElement[];
    const accessibleTrigger = assignedElements.map(getNearestTabbableElement)[0];
        
    if (accessibleTrigger) {
      accessibleTrigger.setAttribute('aria-haspopup', 'true');
      accessibleTrigger.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    }
  }

  render() {
    return (
      <Host
        id={this.componentId}
        class={{
            'modal-open': this.open
        }}
      >
        <div 
          class={{
            'modal-visible': this.open,
            'modal-backdrop': true
          }}
          onClick={this.handleTriggerClick}
        />

        <span
          class="modal-trigger"
          ref={el => (this.trigger = el)}
          onClick={this.handleTriggerClick}
          onKeyDown={this.handleTriggerKeyDown}
          onKeyUp={this.handleTriggerKeyUp}
        >
          <slot name="trigger" />
        </span>
        
        <div
          class={{
            'modal-visible': this.open,
            'modal-dialog': true
          }}
          role="dialog"
          aria-hidden={this.open ? 'false' : 'true'}
          aria-labelledby={this.componentId}
          aria-modal="true"
        >
          <slot name="header" />

          <section id="main">
            <slot></slot>
          </section>

          <div class="modal-footer">
            <slot name="footer" />

            {this.showCancelButton && (
              <gr-button variant={ this.cancelButtonVariant } onClick={this.handleTriggerClick}>
                Cancel
              </gr-button>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
