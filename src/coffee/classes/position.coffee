###*
#
# @class Position
#
###

class Position

  ###*
  #
  # @method getPlacement
  # @static
  # @param {Object} pos
  # @param {String} placement
  # @return {String}
  #
  ###
  @getPlacement: (pos, placement)->
    de = document.documentElement
    db = document.body
    clientWidth = window.innerWidth or screen.width
    clientHeight = window.innerHeight or screen.height
    scrollTop = Math.max(db.scrollTop, de.scrollTop)
    scrollLeft = Math.max(db.scrollLeft, de.scrollLeft)
    pageX = Math.max(0, pos.left - scrollLeft)
    pageY = Math.max(0, pos.top - scrollTop)
    
    
    isH = placement == 'horizontal'
    isV = placement == 'vertical'
    
    
    detect = placement == 'auto' || isH || isV
    
    
    if detect 
      if pageX < clientWidth / 3
          if pageY < clientHeight / 3
            placement = if isH then 'right-bottom' else 'bottom-right'
          else if pageY < clientHeight * 2 / 3
            if isV
              placement = if pageY <= clientHeight / 2 then 'bottom-right' else 'top-right'
            else
              placement = 'right'
            
          else
            placement = if isH then 'right-top' else 'top-right'
          
      else if pageX < clientWidth * 2 / 3
        if pageY < clientHeight / 3
            if isH
              placement = if pageX <= clientWidth / 2 then 'right-bottom' else 'left-bottom'
            else
              placement = 'bottom'
            
        else if pageY < clientHeight * 2 / 3
          if isH
            placement = if pageX <= clientWidth / 2 then 'right' else 'left'
          else
            placement = if pageY <= clientHeight / 2 then 'bottom' else 'top'
          
        else
          if isH
              placement = if pageX <= clientWidth / 2 then 'right-top' else 'left-top'
          else
            placement = 'top'

      else

        if pageY < clientHeight / 3
          placement = if isH then 'left-bottom' else 'bottom-left'
        else if pageY < clientHeight * 2 / 3
          if isV
            placement = if pageY <= clientHeight / 2 then 'bottom-left' else 'top-left'
          else
            placement = 'left'
          
        else 
          placement = if isH then 'left-top' else 'top-left'
        
    
    else if placement == 'auto-top'
      if pageX < clientWidth / 3
        placement = 'top-right'
      else if pageX < clientWidth * 2 / 3
        placement = 'top';
      else
        placement = 'top-left';

    else if placement == 'auto-bottom'
      if pageX < clientWidth / 3
        placement = 'bottom-right'
      else if pageX < clientWidth * 2 / 3
        placement = 'bottom';
      else
        placement = 'bottom-left'

    else if placement == 'auto-left'
      if pageY < clientHeight / 3
        placement = 'left-top'
      else if pageY < clientHeight * 2 / 3
        placement = 'left';
      else
        placement = 'left-bottom'

    else if placement == 'auto-right'
      if pageY < clientHeight / 3
        placement = 'right-top'
      else if pageY < clientHeight * 2 / 3
        placement = 'right'
      else
        placement = 'right-bottom'

    return placement
    
  
  
  ###*
  #
  # @method getPopoverPosition
  # @param {Object} elementPos
  # @param {String} placement
  # @param {Integer} popoverWidth
  # @param {Integer} popoverHeight
  # @param {Object} that - context
  # @return {Object}
  # returns position and arrowOffset objects
  #
  ###
  @getPopoverPosition: (elementPos, placement, popoverWidth, popoverHeight, that) ->
    pos = elementPos
    de = document.documentElement
    db = document.body
    clientWidth = window.innerWidth or screen.width
    clientHeight = window.innerHeight or screen.height
    elementW = that.$element.outerWidth()
    elementH = that.$element.outerHeight()
    scrollTop = Math.max(db.scrollTop, de.scrollTop)
    scrollLeft = Math.max(db.scrollLeft, de.scrollLeft)
    position = {}
    arrowOffset = null
    arrowSize = that.options.arrow ? 20 : 0
    padding = 10
    fixedW = if elementW < arrowSize + padding then arrowSize else 0
    fixedH = if elementH < arrowSize + padding then arrowSize else 0
    refix = 0
    pageH = clientHeight + scrollTop
    pageW = clientWidth + scrollLeft
    
    
    validLeft = pos.left + pos.width / 2 - fixedW > 0
    validRight = pos.left + pos.width / 2 + fixedW < pageW
    validTop = pos.top + pos.height / 2 - fixedH > 0
    validBottom = pos.top + pos.height / 2 + fixedH < pageH
    
    
    switch placement
      when 'bottom'
        position =
          top: pos.top + pos.height
          left: pos.left + pos.width / 2 - (popoverWidth / 2)
      when 'top'
        position =
          top: pos.top - popoverHeight
          left: pos.left + pos.width / 2 - (popoverWidth / 2)
      when 'left'
        position =
          top: pos.top + pos.height / 2 - (popoverHeight / 2)
          left: pos.left - popoverWidth
          
      when 'right'
        position =
          top: pos.top + pos.height / 2 - popoverHeight / 2
          left: pos.left + pos.width

      when 'top-right'
        position =
          top: pos.top - popoverHeight
          left: if validLeft then pos.left - fixedW else padding

        arrowOffset =
          left: if validLeft then Math.min(elementW, popoverWidth) / 2 + fixedW else -2000

      when 'top-left'
          refix = if validRight then fixedW else -padding
          position =
            top: pos.top - popoverHeight
            left: pos.left - popoverWidth + pos.width + refix

          arrowOffset =
            left: if validRight then popoverWidth - (Math.min(elementW, popoverWidth) / 2) - fixedW else -2000


      when 'bottom-right'
        position =
          top: pos.top + pos.height
          left: if validLeft then pos.left - fixedW else padding
          
        arrowOffset = left: if validLeft then Math.min(elementW, popoverWidth) / 2 + fixedW else -2000
          
      when 'bottom-left'
        refix = if validRight then fixedW else -padding
        position =
          top: pos.top + pos.height
          left: pos.left - popoverWidth + pos.width + refix
        arrowOffset = left: if validRight then popoverWidth - (Math.min(elementW, popoverWidth) / 2) - fixedW else -2000

      when 'right-top'
        refix = if validBottom then fixedH else -padding
        position =
          top: pos.top - popoverHeight + pos.height + refix
          left: pos.left + pos.width
        arrowOffset = top: if validBottom then popoverHeight - (Math.min(elementH, popoverHeight) / 2) - fixedH else -2000



      when 'right-bottom'
        position =
          top: if validTop then pos.top - fixedH else padding
          left: pos.left + pos.width
        arrowOffset = top: if validTop then Math.min(elementH, popoverHeight) / 2 + fixedH else -2000



      when 'left-top'
        refix = if validBottom then fixedH else -padding
        position =
          top: pos.top - popoverHeight + pos.height + refix
          left: pos.left - popoverWidth
        arrowOffset = top: if validBottom then popoverHeight - (Math.min(elementH, popoverHeight) / 2) - fixedH else -2000


          
      when 'left-bottom'
        position =
          top: if validTop then pos.top - fixedH else padding
          left: pos.left - popoverWidth
        arrowOffset = top: if validTop then Math.min(elementH, popoverHeight) / 2 + fixedH else -2000

    position.top += that.options.offset.top
    position.left += that.options.offset.left

    return {
      position: position,
      arrowOffset: arrowOffset
      }

