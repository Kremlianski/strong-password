###*

Strong Password jQuery Plugin

@author Alexandre Kremlianski (kremlianski@gmail.com)
 
@version 1.0

@requires jQuery

###


###*
#
# @class StrongPass
#
#
###

class StrongPass

  ###
  
  the array of sounds
  
  ###
  sounds = ["Nee", "Bo", "my", "cho", "vee", "Voo", "Na", "Jo", "Cea", "ha", "cy", "kea", "Va", "xea", "dy", "Boo", "Da", "So", "Ry", "joo", "ly", "woo", "vu", "Gy", "fi", "qea", "du", "hee", "Bi", "ni", "fee", "Ba", "lu", "noo", "Zu", "cha", "Ji", "vi", "Hu", "Ree", "di", "bu", "Fy", "Zoo", "goo", "ve", "Zi", "Shee", "Kee", "Xu", "de", "Hi", "Xee", "Fu", "Soo", "Choo", "Mea", "Sha", "Nu", "Dee", "Chi", "me", "Loo", "lee", "be", "Joo", "Dea", "Che", "shy", "jo", "ree", "Coo", "ca", "Ge", "ro", "gea", "ka", "fy", "rea", "Ga", "Co", "sa", "qoo", "Do", "Lo", "Ky", "wy", "chee", "Wa", "fo", "Jea", "Wea", "Sy", "hoo", "Mi", "Ma", "Lee", "wu", "gi", "chea", "Su", "mu", "Qy", "Moo", "xi", "Koo", "cu", "Si", "Qu", "Sho", "see", "xe", "Doo", "Gu", "fe", "hea", "ne", "Ri", "sea", "xa", "jee", "Je", "roo", "co", "na", "Re", "Cho", "Vee", "le", "ko", "va", "Ze", "Shea", "Kea", "He", "Bee", "so", "Go", "ry", "Vea", "la", "Mee", "zy", "Woo", "Za", "hy", "Ha", "Wo", "Vy", "Hee", "ba", "choo", "Dy", "Cha", "shu", "xy", "Ly", "xoo", "Mo", "Xa", "Hea", "Fi", "ri", "Fa", "By", "Ni", "gee", "Goo", "zi", "Lu", "xu", "chy", "hi", "shi", "fu", "Jy", "bee", "nu", "qi", "Ju", "bea", "soo", "Ru", "qe", "Wee", "chi", "Ci", "Nea", "Shy", "xo", "Lea", "ge", "Ki", "zee", "Ce", "no", "Xoo", "Rea", "ga", "we", "Ke", "vo", "do", "zea", "Qoo", "Ro", "Se", "qee", "lo", "Zo", "fea", "Ho", "sy", "Sa", "bo", "wee", "Hoo", "ma", "lea", "cee", "Wy", "jea", "Xo", "Ja", "Fo", "qy", "koo", "da", "Xea", "Ra", "My", "voo", "cea", "Wu", "si", "Zee", "shee", "qu", "boo", "Cy", "ru", "bi", "Fee", "zu", "See", "ji", "Chee", "Noo", "hu", "Xi", "Vu", "Fea", "Ku", "je", "Xe", "re", "Vi", "Roo", "Di", "zoo", "Bu", "ze", "vea", "mee", "chu", "Li", "she", "kee", "Shoo", "ra", "Ve", "xee", "De", "ny", "za", "mea", "sha", "Le", "wo", "Ko", "vy", "dee", "loo", "Be", "mo", "qa", "La", "dea", "Shu", "Zy", "che", "fa", "Hy", "coo", "by", "Qo", "Gee", "Ca", "jy", "Chy", "Shi", "Xy", "ky", "wi", "Ka", "wa", "shoo", "Gea", "li", "ju", "Ny", "She", "Chu", "mi", "ku", "Foo", "Bea", "su", "ci", "wea", "Qi", "nee", "Qa", "ki", "Du", "ce", "Gi", "Qe", "nea", "ke", "Mu", "moo", "gu", "se", "Wi", "Zea", "shea", "Qee", "Cu", "No", "zo", "sho", "gy", "foo", "ho", "Sea", "We", "Vo", "Chea", "doo", "Jee", "Qea", "Fe", "qo", "Me", "ja", "Cee", "Ne", "he", "go"]
  
  ###
  the array of vovels
  ###
  vovels =["a", "e", "i", "o", "u", "y"]
  
  ###
  the array of consonants
  ###
  consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "z", "w"]

  ###*
  #
  # @method regenerate
  # @static
  # Empties the previous result and generates the new one
  #
  ###
  @regenerate: ->

    result =  $ '.sp-result', @$popover.get 0
    .empty()
    StrongPass.generate.apply @
    return
  
  ###*
  #
  # @method generate
  # @static
  # Generates the new password and then create the effect of calculation
  #
  ###
  @generate: ->
  
    ###*
    #
    # @param {Array} a
    # shuffles an array
    #
    ###
    shuffle = (a) ->
      j = undefined
      x = undefined
      i = undefined
      i = a.length
      while i
        j = Math.floor(Math.random() * i)
        x = a[i - 1]
        a[i - 1] = a[j]
        a[j] = x
        i -= 1
      return
        
    ###*
    # Creates the effect of calculation
    ###
    outerSort = ->
      if passArray.length == 0 then return
      span = $('<span>').appendTo result
      letter = passArray.shift()
      letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      shuffle letters
      innerSort(letters, letter, span)
      outerSort()
      return
      
    innerSort = (letters, letter, span) ->
      if !letters or letters.length == 0 then return
      x = letters.shift()
      span.html x
      setTimeout ( ->
        if x == letter 
          span.addClass('sp-generated')
          return
        else innerSort(letters, letter, span)
      ), 25
      return
      
    ###*
    #
    # @return {Boolean}
    #
    ###
    yesOrNot = -> Math.random() < 0.5
      
    ###*
    #
    # @param {String} pass
    # @return {String}
    #
    ###
    addFirstLetter = (pass) ->
      if yesOrNot()
        letter = vovels[Math.floor(Math.random() * vovels.length)]
        pass = letter + pass
      pass
      
    ###*
    #
    # @param {String} pass
    # @return {String}
    #
    ###  
    addLastLetter = (pass) ->
      if yesOrNot()
        letter = consonants[Math.floor(Math.random() * consonants.length)]
        pass = pass + letter
      pass
    
    
    ###*
    #
    # @param {array} range
    # @return {Integer}
    # returns a random number within the given range
    ###
    getN = (range) ->
      x = range[0]
      y = range[1]
      
      Math.floor(Math.random() * (y - x + 1)) + x
      

    @pass = ''
    
    ###
    the number of sounds in the result password
    ###
    n = @options.sounds
    
    if @options.range then n = getN(@options.range)

    ###
    a container for the result
    ###
    result =  $ '.sp-result', @$popover.get 0
    
    ###
    the password
    ###
    pass = (sounds[Math.floor(Math.random() * sounds.length)] for x in [1..n]).reduce (x,y) -> x + y
    
    ###
    prepending a vowel
    ###
    if @options.firstVowel then pass = addFirstLetter(pass)
    
    ###
    appending a consonant
    ###
    if @options.lastConsonant then pass = addLastLetter(pass)
    
    passArray = pass.split('')
    @pass = pass
    
    outerSort()
     