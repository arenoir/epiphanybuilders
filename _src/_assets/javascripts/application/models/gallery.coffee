class Eb.Models.Gallery extends Backbone.Model
	initialize: ->
    	super
    	@slides = new Eb.Collections.Slides