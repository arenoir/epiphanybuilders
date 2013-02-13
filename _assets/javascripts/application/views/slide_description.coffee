class Eb.Views.SlideDescription extends Backbone.View

  initialize: (options) ->
    @collection.on 'selected', @showSlideDescription, @
    @el = '.slide-description'

  showSlideDescription: (slide) ->
    $(@el).fadeOut("fast", =>
      $(@el).html( JST['application/templates/slides/description'](model: slide) )
      $(@el).fadeIn("fast")
    )


  imageWidth: ->
    $('#slides img:first').width()