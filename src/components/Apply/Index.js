import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'
import "../../plugins/jquery/jquery.cxselect.min.js"
import cityData from "../../plugins/jquery/cityData.min.json"

export default class Apply {

	render(node) {
		$(node).html(
            Mustache.render(template)
        );

        $('.options > a').on('click', function(e){
        	e.preventDefault();
        	$(this).addClass('active').siblings().removeClass('active')
        })

        $.cxSelect.defaults.url = cityData;
        $('#cx_select').cxSelect({ 
		  selects: ['province', 'city', 'area'],
          jsonName: 'n', 
          jsonValue: 'v',
		  nodata: 'none' 
		}); 
    }
}