import $ from 'jquery'
import template from './Navigation.html'
import Mustache from 'mustache'

export default class Navigation {

	render(node) {        
        $(node).html(
            Mustache.render(template)
        );
    }
}