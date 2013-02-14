class Eb.Routers.Application extends Backbone.Router.extend
  el: '#slideshow'
  
  routes:
    '' : 'index'
    'gallery/:name' : 'changeGallery'
  
  initialize: (options) ->
    console.log 'test'
    @galleries = options.galleries
    galleryList = new Eb.Views.GalleryList( collection: @galleries )
    galleryList.render()
    #galleryCarousel = new Eb.Views.GalleryCarousel( collection: )
    return

  index: ->
    console.log 'index'
    #@galleries.changeGallery(name)
    @

  changeGallery: (name) ->
    console.log name
    @galleries.changeGallery(name)
    @
