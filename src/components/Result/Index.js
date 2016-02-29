import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Result {
	constructor(type) {
		console.log('type is:'+type)
		this.type = type
	}

	render(node) {
		$(node).html(
            Mustache.render(template, {type: this.type})
        );
    }
}