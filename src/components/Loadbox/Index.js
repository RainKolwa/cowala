import $ from 'jquery'
import template from './Loadbox.html'
import Mustache from 'mustache'
import img1 from '../../images/01.jpg'
import img2 from '../../images/02.jpg'
import img3 from '../../images/03.jpg'
import img4 from '../../images/04.jpg'
import img5 from '../../images/05.jpg'
import img6 from '../../images/06.jpg'

export default class Loadbox {
	constructor(type) {
		this.type = type;
	}

	render() {  
		let preload = []
		
		switch(this.type) {
			case 'landing':
				preload = [img1,img2,img3,img4,img5,img6]
				console.log(preload)
				break
			default:
				preload = []
		}
		
		$('#preload').html(
            Mustache.render(template, {preload: preload})
        );
    }
}