import { h, FunctionalComponent } from '@stencil/core';

export interface FormControlProps {
  /** The input id, used to map the input to the label */
  inputId: string;

  /** The size of the form control */
  size: 'small' | 'medium' | 'large';

  /** The label id, used to map the label to the input */
  labelId?: string;

  /** The label text (if the label slot isn't used) */
  label?: string;

  /** Whether or not a label slot has been provided. */
  hasLabelSlot?: boolean;

  /** The help text id, used to map the input to the help text */
  helpTextId?: string;

  /** The help text (if the help-text slot isn't used) */
  helpText?: string;

  /** Whether or not a help text slot has been provided. */
  hasHelpTextSlot?: boolean;

  /** The invalid text id, used to map the input to the invalid text */
  invalidTextId?: string;

  /** The invalid text (if the invalid-text slot isn't used) */
  invalidText?: string;

  /** Whether or not a invalid text slot has been provided. */
  hasInvalidTextSlot?: boolean;

  /** Whether or not the invalid text should be shown instead of the help text */
  invalid?: boolean;

  /** Whether or not to display a required indicator should be shown (asterisk) */
  requiredIndicator?: boolean;

  /** A function that gets called when the label is clicked. */
  onLabelClick?: (event: MouseEvent) => void;
}

const FormControl: FunctionalComponent<FormControlProps> = (props, children) => {
  const hasLabel = props.label ? true : props.hasLabelSlot;
  const hasHelpText = props.helpText ? true : props.hasHelpTextSlot;
  const hasInvalidText = props.invalidText ? true : props.hasInvalidTextSlot;
  const showHelpText = props.invalid ? false : true;
  const showInvalidText = props.invalid ? true : false;

  return (
    <div
      class={{
        'form-control': true,
        [`form-control-${props.size}`]: true,
        'form-control-has-label': hasLabel,
        'form-control-has-help-text': hasHelpText,
        'form-control-has-invalid-text': hasInvalidText,
      }}
    >
      <label
        id={props.labelId}
        class="form-control-label"
        htmlFor={props.inputId}
        aria-hidden={hasLabel ? 'false' : 'true'}
        onClick={props.onLabelClick}
      >
        <slot name="label">{props.label}</slot>
        {props.requiredIndicator && (
          <div class="asterisk">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path
                fill="currentColor"
                d="M 17.699219 17 L 23.898438 25.398438 L 21.5 27 L 16 18.300781 L 10.5 27 L 8.199219 25.398438 L 14.398438 17 L 5.101563 14.601563 L 6 12 L 15.101563 15.199219 L 14.5 5 L 17.5 5 L 17 15.199219 L 26 12 L 26.800781 14.699219 Z"
              />
            </svg>
          </div>
        )}
      </label>

      <div class="form-control-input">{children}</div>

      {showHelpText && (
        <div id={props.helpTextId} class="form-control-help-text" aria-hidden={hasHelpText ? 'false' : 'true'}>
          <slot name="help-text">{props.helpText}</slot>
        </div>
      )}

      {showInvalidText && (
        <div id={props.invalidTextId} class="form-control-invalid-text" aria-hidden={hasInvalidText ? 'false' : 'true'}>
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <title>Alert Circle</title>
              <path
                d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm0,319.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Zm21.72-201.15-5.74,122a16,16,0,0,1-32,0l-5.74-121.94v-.05a21.74,21.74,0,1,1,43.44,0Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="text">
            <slot name="invalid-text">{props.invalidText}</slot>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormControl;
