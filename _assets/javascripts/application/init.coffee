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
  
  
  init: (slides) ->
    #console.log galleries
    @slides = new Eb.Collections.Slides(slides)
    view = new Eb.Views.SlideShow( collection: @slides )
    view.render()


    

    
    # if !Backbone.history.started
    #    Backbone.history.start(pushState: false, root: '/')
    #    Backbone.history.started = true

    return