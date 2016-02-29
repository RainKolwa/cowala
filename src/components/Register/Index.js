import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Register {

	render(node) {

		let year = [],
			month = [],
			day = [];
		
		for(let i=0; i<15; i++){
			year.push(2016-i)
		}
		for(let i=0; i<12; i++){
			month.push(i+1)
		}
		for(let i=0; i<31; i++){
			day.push(i+1)
		}

		$(node).html(
            Mustache.render(template, {
            	year: year,
            	month: month,
            	day: day
            })
        );
    }
}