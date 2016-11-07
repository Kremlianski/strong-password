###

The object of changable params

###

defaults = 
  
  placement: 'vertical'
  cssClass: null
  arrow: true
  animation: 'fade'
  backdrop: true
  onHide: ()->
  afterHide: ()->
  offset: 
    top: 0
    left: 0
  followClick: true
  visibleTime: 1000
  caption: 'Do you like this password?'
  buttons:
    regen: 'Renew'
    ok: 'Apply'
    cancel: 'Cancel'
  firstVowel: false
  lastConsonant: false
  sounds: 4
  range: false
  width: 222
  height: 'auto'
  
###

The object of unchangable params

###    
postsettings = 

  template: -> 
    "<div class='sp-popover'>
    <div class='sp-arrow'></div>
      <div class='sp-popover-inner'>
        <div class='sp-popover-content'>
          <div class='sp-result'></div>
          <div class='sp-caption'>
            #{@options.caption}
          </div>
          <div class='sp-form'>
            <div class='sp-form-row'>
              <div class='sp-footer'>
                <button class='sp-button sp-button-ok'>
                  #{@options.buttons.ok}
                </button>
                <button class='sp-button sp-button-regen'>
                #{@options.buttons.regen}
                </button>
                <button class='sp-button sp-button-cancel'>
                #{@options.buttons.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>"
  backdropTemplate: '<div class="sp-popover-backdrop"></div>'
  onRender: ->
    that = @
    $ '.sp-button-regen', @$popover
    .on 'click', (e) ->
      $but = $ @
      $but.addClass that.options.prefix+'clicked'
      setTimeout ( ->
        $but.removeClass(that.options.prefix+'clicked')), 400
        
      StrongPass.regenerate.apply that
      return
      
    $ '.sp-button-ok', @$popover
    .on 'click', (e) =>
      @$element.attr 'type', 'text'
      @$element.val(@pass)
      setTimeout ( => @$element.attr 'type', 'password'), @options.visibleTime
      @hide()
      return
      
    $ '.sp-button-cancel', @$popover
    .on 'click', (e) =>
       @hide()
       return
      
  padding: true
  prefix: 'sp-'
  NS: 'sp-popover'
  eventNS: 'sp.popover'
  