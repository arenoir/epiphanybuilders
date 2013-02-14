class Eb.Views.SlideShow extends Backbone.View

  initialize: (options) ->
    @collection.on 'selected', @slideIn, @

  render: ->
    @renderSlideIndicators()
    d = new Eb.Views.SlideDescription( collection: @collection )
    @collection.each (slide) =>
      $('#slides').append( JST['application/templates/slides/slide'](model: slide) )
    @

  renderSlideIndicators: ->
    @collection.each (slide) =>
      console.log slide
      t = new Eb.Views.SlideIndicator( model: slide, collection: @collection )
      $('.slide-control').append( t.render().el )
    @

  slideIn: (slide) ->
    $('#slides').animate( { marginLeft: @slideOffset(slide) }, 300 )

  slideOffset: (slide) ->
    index = @collection.indexOf( slide )
    offset = ( -1.0 * index * @imageWidth() )

  imageWidth: ->
    $('#slides img:first').width()

    