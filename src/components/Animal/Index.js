import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Animal {
	constructor() {
        // 状态
        this.start = window.localStorage.getItem('star')
        this.ready = window.localStorage.getItem('star') && JSON.parse(window.localStorage.getItem('star')).star_count > 4
        this.over = window.localStorage.getItem('trialPack')
        // 数据
        this.id = JSON.parse(window.localStorage.getItem('star')).star_name_id
		this.count = JSON.parse(window.localStorage.getItem('star')).star_count
        this.trialPack = this.over && JSON.parse(window.localStorage.getItem('trialPack'))
	}

	show() {
		
	}

	render(node) {        
        console.log(this.trialPack)
        console.log(typeof(this.trialPack))
        $(node).html(
            Mustache.render(template, {
                start: this.start,
                ready: this.ready,
                over: this.over,
                starId: this.id, 
                count: this.count, 
                trialPack: this.trialPack
            })
        );

        $('.action-detail').on('click', function(e){
        	e.preventDefault();

        	// 显示详情
        	$('.star-detail').fadeIn().children('.bg').addClass('active');

        })
    }
}