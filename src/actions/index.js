import $ from 'jquery'
import config from '../store/config'
import Share from '../components/Share'
import Qrcode from '../components/Qrcode'
import Result from '../components/Result'
import Tvc from '../components/Tvc'

function setItem(key, value){
	window.localStorage.setItem(key, value)
}

function getItem(key){
	return window.localStorage.getItem(key)
}

function removeItem(){
	window.localStorage.removeItem(key)
}

function clearItem(){
	window.localStorage.clear()
}

export function getLocal(type){
	return JSON.parse(getItem(type))
}

// 显示弹窗
export function showPanel(dom){
	$('.popup-panel').hide()
	$('.'+dom).show();
}

// 隐藏弹窗
export function hidePanel(){
	$('.popup-panel').hide()
}

// 显示消息
export function showMessage(msg){
	$('.message span').text(msg);
	$('.message').addClass('active');
	setTimeout(function(){
		$('.message').removeClass('active');
	},1000)
}

// 验证登录
export function checkAuth(){
	return window.localStorage.getItem('token') ? true : false
}

// 通用验证
export function validate(val, type){
	switch (type){
		case 'mobile':
			return (/^1[3|4|5|7|8]\d{9}$/).test(val);
			break;
		case 'email':
			return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(val);
			break;
		default:
			return false;
	}
}


// 登录
export function login(data){
	$.ajax({
		url: config.api + 'users/auth',
		method: 'POST',
		crossDomain: true,
		dataType: config.dataType,
		data: data,
		success: function(response){
			if(response.errFlg){
				alert(response.errMsg)
			}else{
				showMessage('登录成功！');

				// 储存信息
				setItem('token', response.access_token);
				setItem('user', response.user);
				response.star && setItem('star', Array.isArray(response.star) ? JSON.stringify(response.star[0]) : JSON.stringify(response.star));
				response.winning_state && setItem('winning_state', response.winning_state);
				response.trialPack && setItem('trialPack', JSON.stringify(response.trialPack));

				// 隐藏弹窗
				hidePanel();

				// 重新渲染Tvc
				new Tvc().render('div.tvc');
			}
		}
	})
}


// 注销
export function logout(){
	// 
	clearItem();
}

// 注册
export function register(data){
	console.log('test')

	$.ajax({
		url: config.api + 'users/create',
		method: 'POST',
		crossDomain: true,
		dataType: config.dataType,
		data: data,
		success: function(response){
			if(response.errFlg){
				alert(response.errMsg)
			}else{
				showMessage('注册成功！');
				// show success panel
				showPanel('share-tips');
			}
		}
	})
}


// 获取手机验证码
export function getCaptcha(mobile){
	$.ajax({
		url: config.api + 'users/verify',
		method: 'POST',
		crossDomain: true,
		dataType: config.dataType,
		data: {phone: mobile},
		success: function(response){
			// 
			showMessage(response.errFlg ? response.errMsg : '短信验证码发送成功！');
			//
		}
	})
}


// 获取用户信息
export function loadUser(){
	$.ajax({
		url: config.api + 'users/user_info',
		method: 'POST',
		crossDomain: true,
		dataType: config.dataType,
		headers: {
	        "x-token": getItem('token')
	    },
		success: function(response){
			// 
			if(response.errFlg){
				clearItem()
			}else{
				// 获取用户信息
				setItem("user", JSON.stringify(response.user))
				setItem("star", JSON.stringify(response.star))

				return response.user;
			}
		}
	})
}


// 创建神器
export function createStar(star){
	$.ajax({
		url: config.api + 'stars/create',
		method: 'POST',
		crossDomain: true,
		dataType: config.dataType,
		data: {
			"star_name": star
		},
		headers: {
	        "x-token": getItem('token')
	    },
		success: function(response){
			if(response.errFlg){
				showMessage(response.errMsg);
				// if invalid token???
			}else{
				showMessage('创建成功');

				// 更新储存
				setItem('star', response.star);

				// 初始化选择结果页
				new Share(response.star).render('div.share-tips')
				showPanel('share-tips')
			}
		}
	})
}

// 获取分享二维码
export function generateQrcode(starId){
	$.ajax({
		url: config.api + 'stars/qrcode',
		method: 'POST',
		crossDomain: true,
		dataType: config.dataType,
		data: {
			"star_id": starId
		},
		headers: {
	        "x-token": getItem('token')
	    },
		success: function(response){
			// 
			if(response.errFlg){
				showMessage(response.errMsg);
				// if invalid token???
			}else{
				//
				console.log(response.qrcode)
				
				new Qrcode(response.qrcode).render('div.share-tips-qr')
				showPanel('share-tips-qr')
			}
		}
	})
}


// 获取奖品类别
export function getPrize(){
	$.ajax({
		url: config.api + 'stars/prize',
		method: 'POST',
		crossDomain: true,
		dataType: config.dataType,
		headers: {
	        "x-token": getItem('token')
	    },
		success: function(response){
			// 
			if(response.errFlg){
				showMessage(response.errMsg)
			}else{
				// 优惠券/试用装
				new Result(response.result).render('div.star-all-collected')
				showPanel('star-all-collected')
			}
		}
	})
}

// 提交收货信息
export function submitApply(data) {
	// body...
	$.ajax({
		url: config.api + 'users/trial_packs',
		method: 'POST',
		crossDomain: true,
		dataType: config.dataType,
		data: data,
		headers: {
	        "x-token": getItem('token')
	    },
		success: function(response){
			// 
			if(response.errFlg){
				showMessage(response.errMsg)
			}else{
				// 提交成功
				// new Result(response.result).render('div.star-all-collected')
				// showPanel('star-all-collected')

				
			}
		}
	})
}
