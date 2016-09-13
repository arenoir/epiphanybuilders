class Eb.Views.NextSlide extends Backbone.View
  tagName: 'li'
  className: 'arrow-next' 
  events:
    'click a' : 'next'

  render: ->
    $(@el).html('<a href="#">next</a>')

  next: ->
    Eb.stopSlideShow @collection
    @collection.next()
    return false

class Eb.Views.PreviousSlide extends Backbone.View
  tagName: 'li'
  className: 'arrow-previous' 
  events:
    'click a' : 'previous'

  render: ->
    $(@el).html('<a href="#">previous</a>')

  previous: ->
    Eb.stopSlideShow @collection
    @collection.previous()
    return false