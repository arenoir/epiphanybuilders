class Eb.Views.SlideIndicator extends Backbone.View
  tagName: 'li'

  events:
    'click a' : 'activateSlide'

  render: ->
    $(@el).html( JST['application/templates/slides/slide_indicator'](model: @model))

  activateSlide: ->
    console.log @
    @collection.activate( @ )