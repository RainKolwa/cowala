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

        $('#cx_select').cxSelect({ 
		  url: cityData,               // 如果服务器不支持 .json 类型文件，请将文件改为 .js 文件 
		  selects: ['province', 'city', 'area'],  // 数组格式，请注意顺序 
		  nodata: 'none' 
		}); 
    }
}