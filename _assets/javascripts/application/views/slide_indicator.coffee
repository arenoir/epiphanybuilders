class Eb.Views.SlideIndicator extends Backbone.View
  tagName: 'li'

  events:
    'click a' : 'activateSlide'

  initialize: (options) ->
    @collection.on 'selected', @toggleActive, @

  render: ->
    $(@el).html( JST['application/templates/slides/slide_indicator'](model: @model))
    @toggleActive()
    @

  activateSlide: ->
    @collection.setSelected(@model)

  toggleActive: ->
    if @isActive()
      $(@el).addClass("active")
    else
      $(@el).removeClass("active")

  isActive: ->
    console.log @collection.selected
    @model is @collection.selected