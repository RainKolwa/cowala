import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Share {
	constructor(star) {
		this.id = star.star_name_id
	}

	render(node) {        
        $(node).html(
            Mustache.render(template, {id: this.id})
        );
    }
}