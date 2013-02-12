class Eb.Views.SlideShow extends Backbone.View

  # initialize: (options) ->
  #   @collection.on 'change', @render, @

  render: ->
    @renderSlideIndicators()
    @collection.each (slide) =>
      $('#slides').append( JST['application/templates/slides/slide'](model: slide) )
    @

  renderSlideIndicators: ->
    @collection.each (slide) =>
      console.log slide
      t = new Eb.Views.SlideIndicator( model: slide, collection: @collection )
      $('.slide-control').append( t.render() )
    @