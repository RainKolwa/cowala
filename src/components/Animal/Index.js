/*
 * 神器详情
 *
**/ 

import $ from 'jquery'
import template from './Template.html'
import Mustache from 'mustache'
import { getItem, getLocal } from '../../actions'

export default class Animal {
	constructor() {
        // init
        this.star = getLocal('star')
        this.winning_state = this.star.winning_state
        this.trialPack = getLocal('trialPack')
        this.hasGotPrize = false
        this.prizeIsTrialPack = false

        // 数据
        this.id = this.star.star_name_id
		this.count = this.star.star_count

        // 状态
        this.applied = (this.winning_state === 0 && this.trialPack) ? true : false
        this.allStarCollected = this.count > 4 ? true : false
        if(this.winning_state === 1 || this.winning_state === 0){
            this.hasGotPrize = true
        }
        if(this.winning_state === 0){
            this.prizeIsTrialPack = true
        }
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
                allStarCollected: this.allStarCollected,
                hasGotPrize: this.hasGotPrize,
                prizeIsTrialPack: this.prizeIsTrialPack,
                starCount: this.count || 0,
                applied: this.applied
            })
        $(node).html(
            Mustache.render(template, {
                allStarCollected: this.allStarCollected,
                hasGotPrize: this.hasGotPrize,
                prizeIsTrialPack: this.prizeIsTrialPack,
                starCount: this.count || 0,
                applied: this.applied,
                trialPack: this.trialPack,
                id: this.id
            })
        );

        // 显示详情
        $('.action-detail').click(this.onShow.bind(this))

        // 关闭详情
        $('.star-detail-popup .back').click(this.onHide.bind(this))
    }
}