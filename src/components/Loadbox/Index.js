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

import img8 from '../../images/intro_1_pic.png'
import img9 from '../../images/intro_2_pic.png'
import img10 from '../../images/intro_3_pic.png'
import img11 from '../../images/intro_1_txt.png'
import img12 from '../../images/intro_2_txt.png'
import img13 from '../../images/intro_3_txt.png'
import img14 from '../../images/intro_4_txt.png'
import img15 from '../../images/intro_5_txt.png'
import img16 from '../../images/bg.jpg'


export default class Loadbox {
	constructor(type) {
		this.type = type;
	}

	render() {  
		let preload = []
		
		switch(this.type) {
			case 'landing':
				preload = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16]
				break
			default:
				preload = []
		}
		
		$('#preload').html(
            Mustache.render(template, {preload: preload})
        );
    }
}