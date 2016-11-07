###*
#
# @class PopoverCore
#
###

class PopoverCore

  ###*
  #
  # @constructor
  # @param {DOMElement} element - input[type=password] element
  # @param {Object} options - custom options
  #
  ###
  constructor: (@element, options)->

      
    @$element = $ @element
    @options = $.extend {}, defaults, options, postsettings
      
    @init()
  
  ###*
  #
  # @method init
  #
  ###
  init: () ->
    that = @
    @$element.off 'mousedown touchstart'
    .one 'mousedown touchstart', @_toggle
    .on 'mousedup touchstart', ->
      
    
    
    
    @_poped = false
    @_inited = true
    @_opened = false
    @_id = Seq.next()
    @$popover ?= @_buildPopover()
    return
  
  ###*
  #
  # @method destroy
  #
  # removes popover and backdrop and event handler for element
  #
  ###
  destroy: ->
    @hide()
    @$element.off('mousedown touchstart')
    @$popover?.remove()
    @$backdrop?.remove()
    
    return
  
  
  ###*
  #
  # @method _toggle
  # @param {Event Object} event
  # shows or hides
  #
  ###
  _toggle: (event) =>
    
    @$element.blur()
    event.preventDefault()
    event.stopPropagation()
    
#    if @_opened then @hide()
#    else @show(event)
    unless @_opened then @show(event)
    
    return
    
  ###*
  #
  # @method show
  # @param {Event Object} event
  # shows the popover
  #
  ###  
  show: (event)->
  
    @$popover.removeClass().addClass(@options.NS)
    @$element.get(0).disabled = on
    if @_opened then return
    
    @$popover.show()
    @$backdrop?.show()
    @_opened = true
    elementPos = @_getElementPosition()
     
    @$popoverContent ?= @$popover.find('.' + @options.NS + '-content')
    popoverWidth = @$popover.get(0).offsetWidth
    popoverHeight = @$popover.get(0).offsetHeight
    
    placement = 'bottom'
    e = $.Event('show.' + @options.eventNS)
    
    @$element.trigger e, [@popover]
    
    if(@options.height?) then @$popoverContent.height @options.height
    if(@options.width?) then @$popoverContent.width @options.width

    if(@options.cssClass) then @$popover.addClass @options.cssClass
    if !@options.arrow
      @$popover.find('.'+@options.prefix+'arrow').remove()
      
    @$popover.detach().css
      top: -2000
      left: -2000
      display: 'block'
      
    if @options.animation?
      @$popover.addClass @options.animation
      
    @$popover.appendTo document.body
    @$backdrop?.appendTo document.body
    
    placement = Position.getPlacement(elementPos, @options.placement)
    
    
    @$element.trigger('added.' + @options.eventNS)

    setTimeout (=>
      $ 'html'
      .on 'mouseup touchstart', (e) =>

        unless $(e.target).parents('#'+@options.prefix+@_id).size() 
          @hide()
          return
    ), 600
    
    
    
    if !@options.padding
      if @options.height != 'auto'
        @$popoverContent.css 'height', @$popoverContent.outerHeight()
      @$popover.addClass @options.prefix+'no-padding'
      
    popoverWidth = @$popover[0].offsetWidth
    popoverHeight = @$popover[0].offsetHeight
    
    postionInfo = Position.getPopoverPosition(elementPos, placement, popoverWidth, popoverHeight, @)

    
    x = event.clientX
    y = event.clientY
    

    if !@options.arrow
      @$popover.css 'margin': 0

    if @options.arrow
      $arrow = @$popover.find('.' + @options.prefix + 'arrow')
      $arrow.removeAttr 'style'

      if postionInfo.arrowOffset

        if postionInfo.arrowOffset.left == -1 or postionInfo.arrowOffset.top == -1
          $arrow.hide()
        else
          $arrow.css postionInfo.arrowOffset

      if placement == 'left' or placement == 'right'
        $arrow.css top: @$popover.height() / 2
        
        
        
      else if (placement == 'top' or placement == 'bottom' or placement == 'top-left' or placement == 'bottom-left' or placement == 'top-right' or placement == 'bottom-right' or placement == 'auto-top' or placement == 'auto-bottom') and @options.followClick

        $arrow.css left: event.clientX - postionInfo.position.left

        if postionInfo.position.left > x - 20
          postionInfo.position.left = x - 10
          $arrow.css left: event.clientX - postionInfo.position.left + 10
        else if postionInfo.position.left  + popoverWidth < x + 20
          postionInfo.position.left  = x - popoverWidth + 10
          $arrow.css left: event.clientX - postionInfo.position.left - 10
          
      else if placement == 'top' or placement == 'bottom'
        $arrow.css left: @$popover.width() / 2
        if postionInfo.arrowOffset

          if postionInfo.arrowOffset.left == -1 or postionInfo.arrowOffset.top == -1
            $arrow.hide()
          else
            $arrow.css postionInfo.arrowOffset
      
    @$popover.css postionInfo.position
    .addClass placement
    .addClass 'in'
        
    
    
    @_poped = true
    @$element.trigger('shown.' + @options.eventNS, [@$popover])
    
    StrongPass.generate.apply @


    return @$element
  
  ###*
  #
  # @method hide
  # hides the popover and calls the destroy method in the end
  #
  ###
  hide: ()=>

    unless @_opened then return
    @$element.get(0).disabled = off
    e = $.Event 'hide.' + @options.eventNS
    @$element.trigger e, [ @$popover ]

    if @$popover
      ani = if @options.animaion then @options.animaioni + '-out' else 'out'
      @$popover.removeClass('in').addClass ani
      @$backdrop?.hide()
      setTimeout (=>
        @$popover.hide()
        
        @$element[0].focus()
        @destroy()
        if @options.afterHide
          @options.afterHide @$element
        return
      ), 300
      
    @_opened = false
    @$element.trigger 'hidden.' + @options.eventNS, [ @$element ]
    if @options.onHide
      @options.onHide @$popover
      
      return @$element
  
  
  ###*
  #
  # @method _buildPopover
  # creates the popover from the template
  # @return {jQuery Object}
  #
  ###
  _buildPopover: ()->
    if @$popover? then return @$popover
    
    id = @options.prefix + @_id
    @$popover = $ @options.template.apply @
    .attr('id', id)
    .removeClass()
    .addClass(@options.NS)
    
    if @options.backdrop then @$backdrop = $ @options.backdropTemplate
    else @$backdrop = null
    
    @options.onRender.apply @
    
    return @$popover
    
  ###*
  #
  # @method _getElementPositio
  # @return {Object}
  #
  ###
  _getElementPosition: ()->
  
    $.extend {}, @$element.offset(),
      width: @$element[0].offsetWidth
      height: @$element[0].offsetHeight
      
  
