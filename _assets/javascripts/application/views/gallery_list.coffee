class Eb.Views.GalleryList extends Backbone.View

  initialize: (options) ->
    @collection.on 'change', @render, @

  render: ->
    @collection.each (gallery) =>
        $('#gallery-list').append( JST['application/templates/galleries/listitem'](model: gallery) )
    @

  renderDots: ->
    @collection.each (gallery) =>
        $('#gallery-list').append( JST['application/templates/galleries/listitem'](model: gallery) )
    @
