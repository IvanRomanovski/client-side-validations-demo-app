# README

Ruby version: 2.4.2

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









{"html_settings":{"type":"ActionView::Helpers::FormBuilder","input_tag":"\u003cdiv class=\"field_with_errors\"\u003e\u003cspan id=\"input_tag\" /\u003e\u003clabel for=\"\" class=\"message\"\u003e\u003c/label\u003e\u003c/div\u003e","label_tag":"\u003cdiv class=\"field_with_errors\"\u003e\u003clabel id=\"label_tag\" /\u003e\u003c/div\u003e"},"number_format":{"separator":".","delimiter":","},"validators":{"user[email]":{"uniqueness":[{"message":"has already been taken","case_sensitive":true,"allow_blank":true},{"message":"has already been taken","case_sensitive":true}],"format":[{"message":"Email is invalid","with":{"source":"^[^@\\s]+@[^@\\s]+$","options":"g"},"allow_blank":true}],"presence":[{"message":"Email can&#39;t be blank"}]},"user[password]":{"length":[{"messages":{"minimum":"Password is too short (minimum is 6 characters)","maximum":"Password is too long (maximum is 128 characters)"},"allow_blank":true,"minimum":6,"maximum":128},{"messages":{"minimum":"Password is too short (minimum is 8 characters)","maximum":"Password is too long (maximum is 128 characters)"},"minimum":8,"maximum":128}],"confirmation":[{"message":"Doesn&#39;t match Password","case_sensitive":true}],"presence":[{"message":"Password can&#39;t be blank"}]},"user[terms_of_service]":{"acceptance":[{"message":"You must agree before submitting.","accept":["1",true]}]}}}

{
  "html_settings": {
    "type": "ActionView::Helpers::FormBuilder",
    "input_tag": "<div class=\"field_with_errors\"><span id=\"input_tag\" /><label for=\"\" class=\"message\"></label></div>",
    // "label_tag": "<div class=\"field_with_errors\"><label id=\"label_tag\" /></div>"
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