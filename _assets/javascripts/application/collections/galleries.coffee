class Eb.Collections.Galleries extends Backbone.Collection
  model: Eb.Models.Gallery

  changeGallery: (name) ->
  	console.log name