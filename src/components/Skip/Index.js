import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Skip {

	render(node) {
		$(node).append(
            Mustache.render(template)
        );
    }
}