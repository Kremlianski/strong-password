###
#
# @param {Object} options - custom options
# @return {jQuery Object}
# creates jQuery plugin
# 
###
$.fn.strongPassword = (options) ->
  @.each () ->
    new PopoverCore(@, options)
    return

