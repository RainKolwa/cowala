import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Tvc {
	constructor() {
		this.start = window.localStorage.getItem('star')
	}

	render(node) {        
        $(node).html(
            Mustache.render(template, {start: this.start})
        );
    }
}