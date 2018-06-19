/*
* 1. Write a app to display data in table with the following functionalities:
*
* > Vue fixed header row (album.id, album.title, photos.title, photos.thumbnail)
* > Specific fields sortable(album.id, albums.title, photos.title)
* > Searchable on albums.title and photos.title
* > Scrollable (show 25 rows by default)
* > Custom filters - album.title
* > thumbnail should appear as an image
*
***  Data url:                                    ***
***  https://jsonplaceholder.typicode.com/albums  ***
***  https://jsonplaceholder.typicode.com/photos  ***
*
* 2. Vue Devtools (on Chrome browser) is visible only in development mode.
* How do you enable it in production?
*/

import "./index.html";
import "./index.scss";

import Vue from "vue";
import App from "./App.vue";

new Vue({
  el: "#root",
  render: h => h(App)
});
