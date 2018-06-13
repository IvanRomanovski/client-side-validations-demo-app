import 'babel-polyfill'

import $ from 'jquery'
import Rails from 'rails-ujs'
Rails.start()
global.$ = $
global.jQuery = $

import 'bootstrap'
// import 'rails.validations'
// import 'rails.validations.custom'

require.context('../stylesheets/', true, /^\.\/[^_].*\.(css|scss|sass)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg)$/i)