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
  
  startSlideShow: (slides) =>
    slides.auto = window.setInterval( () ->
        slides.next()
        return
      10000
    )

  stopSlideShow: (slides) =>
    if slides.auto
      window.clearInterval( slides.auto )    

  generateSlidesFromHtml: (slide_list) ->
    a = $.makeArray( $(slide_list).children('li') ).map( (t, i) -> { id: i, src: $(t).find('img').attr('src') } )
    JSON.parse( JSON.stringify(a) )

  slidShowInit: (slide_list, slide_indicator_container ) ->

    slides = Eb.generateSlidesFromHtml( slide_list )
    
    @slides = new Eb.Collections.Slides(slides)
    @slides.selected = @slides.first()

    slideShow = new Eb.Views.SlideShow( collection: @slides )
    slideIndicator = new Eb.Views.SlideIndicators( collection: @slides )
    $(slide_indicator_container).html( slideIndicator.render().el )
    Eb.startSlideShow(@slides)
    return

  workSlideShowInit: (slide_list, thumnails_container) ->
    slides = Eb.generateSlidesFromHtml( slide_list )
    @slides = new Eb.Collections.Slides(slides)
    @slides.selected = @slides.first()

    slideShow = new Eb.Views.SlideShow( collection: @slides )
    
    thumbnails = new Eb.Views.Thumbnails( collection: @slides )
    $( thumnails_container ).html( thumbnails.render().el )

    Eb.startSlideShow(@slides)
    return

