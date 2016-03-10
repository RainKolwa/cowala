import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Shop {
	
	render(node) {
		$(node).html(
            Mustache.render(template)
        );
    }
}