import $ from 'jquery'
import template from './Loadbox.html'
import Mustache from 'mustache'
import img1 from '../../images/load-circle.png'
import img2 from '../../images/load-bg.png'
import img3 from '../../images/logo.png'
import img4 from '../../images/slogan.png'
import img5 from '../../images/panel-bg.jpg'
import img6 from '../../images/button.png'
import img7 from '../../images/leftnav.png'

export default class Loadbox {
	constructor(type) {
		this.type = type;
	}

	render() {  
		let preload = []
		
		switch(this.type) {
			case 'landing':
				preload = [img1,img2,img3,img4,img5,img6,img7]
				break
			default:
				preload = []
		}
		
		$('#preload').html(
            Mustache.render(template, {preload: preload})
        );
    }
}