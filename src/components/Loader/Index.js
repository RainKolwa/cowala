import $ from 'jquery'
import template from './Loader.html'
import Mustache from 'mustache'

export default class Loader {

	show() {
		$('#loader').fadeIn()
		$('#loader').children('span').addClass('active')
		$('#mask').fadeIn()
	}

	hide() {
		$('#loader').fadeOut()
		$('#loader').children('span').removeClass('active')
		$('#mask').fadeOut()
	}

	render(node) {        
        $(node).html(
            Mustache.render(template, 0)
        );
    }
}