import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Animal {
	constructor(star) {
		this.id = star.star_name_id
		this.count = star.star_count
	}

	show() {
		
	}

	render(node) {        
        $(node).html(
            Mustache.render(template, {starId: this.id, count: this.count})
        );

        $('.action-detail').on('click', function(e){
        	e.preventDefault();

        	// show detail
        	$('.star-detail').fadeIn().children('.bg').addClass('active');

        })
    }
}