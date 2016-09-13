class Eb.Views.SlideShow extends Backbone.View

  initialize: (options) ->
    @collection.on 'selected', @slideIn, @

  render: ->
    @renderSlideIndicators()
    #d = new Eb.Views.SlideDescription( collection: @collection )
    #@collection.each (slide) =>
    #  $('#slides').append( JST['application/templates/slides/slide'](model: slide) )
    @

  renderSlideIndicators: ->
    next = new Eb.Views.NextSlide(collection: @collection)
    prev = new Eb.Views.PreviousSlide(collection: @collection)
    $('.slide-control').append(prev.render())
    @collection.each (slide) =>
      t = new Eb.Views.SlideIndicator( model: slide, collection: @collection )
      $('.slide-control').append( t.render().el )
    $('.slide-control').append(next.render())
    @

  slideIn: (slide) ->
    $('#slides').animate( { marginLeft: @slideOffset(slide) }, 300 )

  slideOffset: (slide) ->
    index = @collection.indexOf( slide )
    offset = ( -1.0 * index * @imageWidth() )

  imageWidth: ->
    $('#slides img:first').width()

    