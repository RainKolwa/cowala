import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'
import { getItem, getLocal } from '../../actions'

export default class Animal {
	constructor() {
        // 状态
        this.start = getItem('star')
        this.ready = getItem('star') && getLocal('star').star_count > 4
        this.winning_state = getItem('winning_state')
        this.accepted = false
        if(this.winning_state === "1" || this.winning_state === "0"){
            this.accepted = true
        }

        // 数据
        this.id = getLocal('star').star_name_id
		this.count = getLocal('star').star_count
        this.winning_state = this.winning_state && getLocal('winning_state')
        this.hasGotTrialPack = this.winning_state && getLocal('trialPcak')
	}

	onShow(e) {
        e.preventDefault();
		$('.star-detail-popup').fadeIn().children('.bg-cir').addClass('active');
	}

    onHide(e) {
        e.preventDefault();
        $('.star-detail-popup').fadeOut().children('.bg-cir').removeClass('active');   
    }

	render(node) {        
        console.log({
            start: this.start,
            ready: this.ready,
            accepted: this.accepted,
            starId: this.id, 
            count: this.count, 
            winning_state: this.winning_state,
            hasGotTrialPack: this.hasGotTrialPack
        })
        $(node).html(
            Mustache.render(template, {
                start: this.start,
                ready: this.ready,
                accepted: this.accepted,
                starId: this.id, 
                count: this.count, 
                winning_state: this.winning_state,
                hasGotTrialPack: this.hasGotTrialPack
            })
        );

        // 显示详情
        $('.action-detail').click(this.onShow.bind(this))

        // 关闭详情
        $('.star-detail-popup').click(this.onHide.bind(this))
    }
}