import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'

export default class Animal {
	constructor() {
        // 状态
        this.start = window.localStorage.getItem('star')
        this.ready = window.localStorage.getItem('star') && JSON.parse(window.localStorage.getItem('star')).star_count > 4
        this.over = window.localStorage.getItem('trialPack') || window.localStorage.getItem('winning_state') === 1
        // 数据
        this.id = JSON.parse(window.localStorage.getItem('star')).star_name_id
		this.count = JSON.parse(window.localStorage.getItem('star')).star_count
        this.coupon = this.over && JSON.parse(window.localStorage.getItem('winning_state'))
        this.trialPack = this.over && JSON.parse(window.localStorage.getItem('trialPack'))

        
	}

	onShow(e) {
        e.preventDefault();
		$('.star-detail-popup').fadeIn().children('.bg').addClass('active');
	}

    onHide(e) {
        e.preventDefault();
        $('.star-detail-popup').fadeOut().children('.bg').removeClass('active');   
    }

	render(node) {        
        console.log(this.trialPack)
        $(node).html(
            Mustache.render(template, {
                start: this.start,
                ready: this.ready,
                over: this.over,
                starId: this.id, 
                count: this.count, 
                coupon: this.coupon,
                trialPack: this.trialPack
            })
        );

        // 显示详情
        $('.action-detail').click(this.onShow.bind(this))

        // 关闭详情
        $('.star-detail-popup').click(this.onHide.bind(this))
    }
}