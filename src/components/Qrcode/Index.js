import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Qrcode {
	constructor(qrcode) {
		this.qrcode = qrcode
	}

	render(node) {        
        $(node).html(
            Mustache.render(template, {qrcode: this.qrcode})
        );
    }
}