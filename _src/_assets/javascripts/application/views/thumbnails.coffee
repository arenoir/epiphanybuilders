class Eb.Views.Thumbnails extends Backbone.View
  tagName: 'ul'
  className: 'slide-thumbnails'

  initialize: (options) ->
    @collection.on 'change', @render, @

  render: ->
    @collection.each (thumb) =>
        v = new Eb.Views.SlideIndicator(collection: @collection, model: thumb, template: 'application/templates/slides/thumbnail')
        $(@el).append( v.render().el )
    @



