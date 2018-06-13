ClientSideValidations.callbacks.element.fail = function(element, message, addError, eventData) {
  var form, $form, $label;
  form = element[0].form;
  // if confirmation field is invalid only show error under confirmation field
  if (message == 'skip'){
    return form.ClientSideValidations.removeError(element);
  } else {
    $form = $(form);
    // force rendering of any other errors under field that requires confirmation
    if ($form.find("label.message[for='" + (element.attr('id')) + "']")[0] == null) {
      element.data('valid', true);
    }
    return addError();
  }
}

ClientSideValidations.validators.local.confirmation = function(element, options) {
  var form, $confirmationField;
  form = element[0].form;
  $confirmationField = $(`#${element.attr('id')}_confirmation`);
  // render error under confirmation field if confirmation field has been blurred
  if ($confirmationField.data("blurredOnce") && (element.val() !== $confirmationField.val())) {
    if ($confirmationField.data('validConfirmation') !== false) {
      $confirmationField.data('validConfirmation',false);
      form.ClientSideValidations.addError($confirmationField, options.message);
      $confirmationField.focus();
    }
    // do not render an error under password field
    return 'skip';
  } else if ($confirmationField.data('validConfirmation') === false ){
    $confirmationField.data('validConfirmation',true);
    // remove error under confirmation field
    form.ClientSideValidations.removeError($confirmationField);
    $confirmationField.focus();
 }
};

var handleBlur = function() {
  var $confirmationField, $element;
  $confirmationField = $(this);
  $element = $("#" + this.id.replace('_confirmation',''));
  $confirmationField.data("blurredOnce", true);
  $element.data("changed", true);
  return $element.isValid($element[0].form.ClientSideValidations.settings.validators);
}

var attachBlurEventListenersToConfirmations = function() {
  var $forms = $(ClientSideValidations.selectors.forms);
  var $inputs = $forms.find(ClientSideValidations.selectors.inputs);
  var $confirmations = $inputs.filter('[id$=_confirmation]');
  $confirmations.each(function() {
    $(this).on("blur",handleBlur);
  });
}

// attach blur event listeners to confirmation fields
if ((window.Turbolinks != null) && window.Turbolinks.supported) {
  var initializeOnEvent = window.Turbolinks.EVENTS != null ? 'page:change' : 'turbolinks:load';
  $(document).on(initializeOnEvent, function() {
    attachBlurEventListenersToConfirmations();
  });
} else {
  $(function() {
    attachBlurEventListenersToConfirmations();
  });
}