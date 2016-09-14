
// Collections

var GifCollection = Backbone.Collection.extend({
	url: "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC",   

	parse: function(resp) {
		console.log(resp, "<< parsing")
		return resp.data
	}

})

// Views
var HomeView = Backbone.View.extend({
	el: "#container",

	render: function() {
		this.el.innerHTML = "<h3> Welcome to the Gif Gallery! Click the gallery button to see something cool!</h3>"
	},

	initialize: function() {
		this.render()
	}
})

var AboutView = Backbone.View.extend({
	el: "#container",

	render: function() {
		this.el.innerHTML = "<h3> Made by : TxsAdamWest <a href='https://github.com/TxsAdamWest'><img class='icon' src='./images/me.jpeg'/></a></h3>"
	},

	initialize: function() {
		this.render()
	}
})

var GifGalleryView = Backbone.View.extend({
	el: "#container",

	render: function() {
		console.log("Render fired!")

		this.el.innerHTML = this._buildTemplate(this.gc.models)
	},

	_buildTemplate: function(modelArr) {
		var gifArr = modelArr

		console.log(gifArr, "<< gifArr")

		var htmlStr = ''

		gifArr.forEach(function(index){
			htmlStr += '<img class="gif" src=' + index.get('images').downsized_large.url + '/>'
			})

			return htmlStr

	},

	initialize: function(GifColl) {
		console.log(GifColl,"<< Still got our data.")
		this.gc = GifColl
		this.render()
	}
})



const app = function() {

	var container = document.querySelector('.container') 

    var Router = Backbone.Router.extend({

    	routes: {
    		"home": "showHome",
    		"gallery": "showGallery",
    		"detailed": "showDetailed",
    		"about": "showAbout",
    		"*default" : "redirect"
    	},

    	showHome: function() {

    		var hv = new HomeView()

    	},

    	showGallery: function() {

    		var GifColl = new GifCollection()

    		GifColl.fetch().then(function(){
    			console.log(GifColl,"<< Data fetched.")
    			var GifGall = new GifGalleryView(GifColl)
    		})
    	},

    	showAbout: function() {

    		var av = new AboutView()
    	},

    	redirect: function() {
    		location.hash = 'home'
    	},

        initialize: function() {
            console.log("router constructed.")
            Backbone.history.start()
        }

    })

    new Router()

}

app()
