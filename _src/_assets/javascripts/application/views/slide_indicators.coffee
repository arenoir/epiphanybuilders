class Eb.Views.SlideIndicators extends Backbone.View
  tagName: 'ul'
  className: 'slide-control'

  initialize: (options) ->
    @collection.on 'change', @render, @

  render: ->
    next = new Eb.Views.NextSlide(collection: @collection)
    prev = new Eb.Views.PreviousSlide(collection: @collection)
    $(@el).append(prev.render())
    @collection.each (slide) =>
      t = new Eb.Views.SlideIndicator( model: slide, collection: @collection )
      $(@el).append( t.render().el )
    $(@el).append(next.render())
    @