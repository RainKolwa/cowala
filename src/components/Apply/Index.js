import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Apply {

	render(node) {
		$(node).html(
            Mustache.render(template)
        );

        $('.options > a').on('click', function(e){
        	e.preventDefault();
        	$(this).addClass('active').siblings().removeClass('active')
        })
    }
}