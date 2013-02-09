class Eb.Views.GalleryList extends Backbone.View


  render: ->
    @collection.each (gallery) =>
        $('#gallery-list').append( JST['application/templates/galleries/listitem'](model: gallery) )
    @