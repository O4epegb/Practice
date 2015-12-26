const { compose, replace, map, prop } = require("ramda")
const { getJSON } = require('jquery')
const Task = require('data.task')

const Http = {
  // get :: Url -> Task Error JSON
  get: (url) => new Task((rej, res) => getJSON(url).error(rej).done(res))
}

const Url = String

const baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b1e00b4ce4e0eca3e5f22733f671a0d0&tags={TAGS}&extras=url_s&format=json&jsoncallback=?'

// makeUrl :: String -> Url
const makeUrl = (t) => replace("{TAGS}", t, baseUrl)

// extractUrls :: JSON -> [Url]
const extractUrls = compose(map(prop('url_s')), prop('photo'), prop('photos'))

// flickrSearch :: String -> Task Error [Url]
const flickrSearch = compose(map(extractUrls), Http.get, makeUrl)

module.exports = { flickrSearch }
