# README

Ruby version: 2.4.2

## Set up

- install Ruby and SQLite3
- gem install rails
- bundle install
- yarn install
- rails db:migrate
- rails s

## Concept

The basic idea of simple client side validations is to reuse the model validations defined on backend and not ro replicate validation rules on frontend but to reuse existing validation rules.

Frontend validation implemented in such way works by following this flow:
- backend generates validation JSON based on validation rules defined on the model and application localization rules. For example,

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, presence: true, uniqueness: true
  validates :password, confirmation: true, presence: true, length: { minimum: 8, maximum: 128 }

  attr_accessor :terms_of_service
  validates :terms_of_service, acceptance: true

end
```

and validation messages defined in localization files

```yaml
en:
  activerecord:
    errors:
      format: "%{message}"
      messages:
        model_invalid: "Validation failed: %{errors}"
        inclusion: "%{attribute} is not included in the list"
        exclusion: "%{attribute} is reserved"
        invalid: "%{attribute} is invalid"
        confirmation: "Doesn't match %{attribute}"
        accepted: "You must agree before submitting."
        empty: "%{attribute} can't be empty"
        blank: "%{attribute} can't be blank"
        present: "%{attribute} must be blank"
        too_long:
          one: "%{attribute} is too long (maximum is 1 character)"
          other: "%{attribute} is too long (maximum is %{count} characters)"
        too_short:
          one: "%{attribute} is too short (minimum is 1 character)"
          other: "%{attribute} is too short (minimum is %{count} characters)"
        wrong_length:
          one: "%{attribute} is the wrong length (should be 1 character)"
          other: "%{attribute} is the wrong length (should be %{count} characters)"
        not_a_number: "%{attribute} is not a number"
        not_an_integer: "%{attribute} must be an integer"
        greater_than: "%{attribute} must be greater than %{count}"
        greater_than_or_equal_to: "%{attribute} must be greater than or equal to %{count}"
        equal_to: "%{attribute} must be equal to %{count}"
        less_than: "%{attribute} must be less than %{count}"
        less_than_or_equal_to: "%{attribute} must be less than or equal to %{count}"
        other_than: "%{attribute} must be other than %{count}"
        odd: "%{attribute} must be odd"
        even: "%{attribute} must be even"
```

is transpiled to

```json
{
  "html_settings": {
    "type": "ActionView::Helpers::FormBuilder",
    "input_tag": "<div class=\"field_with_errors\"><span id=\"input_tag\" /><label for=\"\" class=\"message\"></label></div>",
    "label_tag": "<div class=\"field_with_errors\"><label id=\"label_tag\" /></div>"
  },
  "number_format": {
    "separator": ".",
    "delimiter": ","
  },
  "validators": {
    "user[email]": {
      "uniqueness": [
        {
          "message": "has already been taken",
          "case_sensitive": true,
          "allow_blank": true
        },
        {
          "message": "has already been taken",
          "case_sensitive": true
        }
      ],
      "format": [
        {
          "message": "Email is invalid",
          "with": {
            "source": "^[^@\\s]+@[^@\\s]+$",
            "options": "g"
          },
          "allow_blank": true
        }
      ],
      "presence": [
        {
          "message": "Email can&#39;t be blank"
        }
      ]
    },
    "user[password]": {
      "length": [
        {
          "messages": {
            "minimum": "Password is too short (minimum is 6 characters)",
            "maximum": "Password is too long (maximum is 128 characters)"
          },
          "allow_blank": true,
          "minimum": 6,
          "maximum": 128
        },
        {
          "messages": {
            "minimum": "Password is too short (minimum is 8 characters)",
            "maximum": "Password is too long (maximum is 128 characters)"
          },
          "minimum": 8,
          "maximum": 128
        }
      ],
      "confirmation": [
        {
          "message": "Doesn&#39;t match Password",
          "case_sensitive": true
        }
      ],
      "presence": [
        {
          "message": "Password can&#39;t be blank"
        }
      ]
    },
    "user[terms_of_service]": {
      "acceptance": [
        {
          "message": "You must agree before submitting.",
          "accept": [
            "1",
            true
          ]
        }
      ]
    }
  }
}
```

- frontend validation library takes this JSON and uses those rules to apply validation rules to input fields. For example, check out the following snippet:

```javascript
absence: function(element, options) {
  if (!/^\s*$/.test(element.val() || '')) {
    return options.message;
  }
},
presence: function(element, options) {
  if (/^\s*$/.test(element.val() || '')) {
    return options.message;
  }
},
acceptance: function(element, options) {
  var ref;
  switch (element.attr('type')) {
    case 'checkbox':
      if (!element.prop('checked')) {
        return options.message;
      }
      break;
    case 'text':
      if (element.val() !== (((ref = options.accept) != null ? ref.toString() : void 0) || '1')) {
        return options.message;
      }
  }
},
format: function(element, options) {
  var message;
  message = this.presence(element, options);
  if (message) {
    if (options.allow_blank === true) {
      return;
    }
    return message;
  }
  if (options["with"] && !new RegExp(options["with"].source, options["with"].options).test(element.val())) {
    return options.message;
  }
  if (options.without && new RegExp(options.without.source, options.without.options).test(element.val())) {
    return options.message;
  }
}
```
- when backend validation is required (for instance to check uniqueness of email) input fields are sent to backend which returns which fields failed validation.

## Implementation details

This specific implementation uses `gem "client_side_validations"`, which provides generation of JSON from validation rules and JavaScript implementation of client side validation in `rails.validations.js`.

I have extented this JavaScript library with my extension `rails.validations.extension.js`, which puts confirmation errors, e.g. password confirmation errors, under confirmation field instead of field to be confirmed. This is due to the fact that Rails validation rules are attached to original field and not the cofirmation field, therefore generated JSON does not have confirmation rules attached to confirmation field but the field to be confirmed.

Once the gem is installed, `rails.validation.js` and `rails.validations.extension.js` are included in asset pipeline, validation is added to any form by simply adding `validate: true` to any form:

```ruby
<%= form_for(resource, as: resource_name, validate: true, url: registration_path(resource_name), :html => { novalidate: true}) do |f| %>
```

Markup for rendered errors can be modified in `client_side_validation.rb` config file.

```ruby
ActionView::Base.field_error_proc = proc do |html_tag, instance|
  if html_tag =~ /^<label/
    %(<div class="field_with_errors">#{html_tag}</div>).html_safe
  else
    %(<div class="field_with_errors">#{html_tag}<label for="#{instance.send(:tag_id)}" class="message">#{instance.error_message.first}</label></div>).html_safe
  end
end
```