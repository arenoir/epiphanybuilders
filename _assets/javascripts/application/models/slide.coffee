class Eb.Models.Slide extends Backbone.Model

  defaults:
    uri: ''
    state: ''

  select: (state) ->
    st = ''
    st = 'selected' if state
    @set('state' : st)