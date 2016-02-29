import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Tvc {
	constructor() {
		this.isStarOwner = window.localStorage.getItem('star') && window.localStorage.getItem('star') !== "undefined"
	}

	render(node) {        
        $(node).html(
            Mustache.render(template, {isStarOwner: this.isStarOwner})
        );
    }
}