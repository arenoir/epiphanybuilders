#= require_self

#= require_tree ./models
#= require_tree ./collections
#= require_tree ./views
#= require_tree ./routers
#= require_tree ./templates

@Eb =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  
  startSlideShow: (slides) =>
    slides.auto = window.setInterval( () ->
        slides.next()
        return
      10000
    )

  stopSlideShow: (slides) =>
    if slides.auto
      window.clearInterval( slides.auto )    


  init: () ->

    t = $.makeArray($('#slides li')).map( (t, i) -> { id: i } )
    slides =   JSON.parse(JSON.stringify(t))
    
    @slides = new Eb.Collections.Slides(slides)
    @slides.selected = @slides.first()
    view = new Eb.Views.SlideShow( collection: @slides )
    view.render()

    Eb.startSlideShow(@slides)

    # @auto = setInterval( () =>
    #     @slides.next()
    #     return
    #   10000
    # )

    # stop: () ->
    #   if @auto
    #     window.clearInterval( @auto )

    

    
    # if !Backbone.history.started
    #    Backbone.history.start(pushState: false, root: '/')
    #    Backbone.history.started = true

    return