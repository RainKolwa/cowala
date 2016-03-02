import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'
import { getItem } from '../../actions'

export default class Tvc {
	constructor() {
		this.hasCreatedStar = getItem('star')
	}

	render(node) {        
        $(node).html(
            Mustache.render(template, {hasCreatedStar: this.hasCreatedStar})
        );
    }
}