class Eb.Collections.Slides extends Backbone.Collection
  model: Eb.Models.Slide

  setSelected: (slide) ->
    @selected = slide
    @trigger 'selected', slide

  next: ->
    if m = @selected
      index = @indexOf(m) + 1
      t = @at(index) || @first()
      @setSelected t

  