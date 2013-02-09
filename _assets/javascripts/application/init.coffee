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
  
  
  init: (galleries) ->
    #console.log galleries
    @galleries = new Eb.Collections.Galleries(galleries)
    view = new Eb.Views.GalleryList( collection: @galleries )
    view.render()
    

    
    # if !Backbone.history.started
    #    Backbone.history.start(pushState: false, root: '/')
    #    Backbone.history.started = true

    return