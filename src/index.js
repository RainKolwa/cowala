import './styles/styles.scss'
import $ from 'jquery'
import slick from 'slick-carousel'
import * as Action from './actions'
import Mustache from 'mustache'
import Navigation from './components/Navigation'
import Loadbox from './components/Loadbox'
import Loader from './components/Loader'
import Animal from './components/Animal'
import Share from './components/Share'
import Qrcode from './components/Qrcode'
import Result from './components/Result'
import Apply from './components/Apply'
import Register from './components/Register'
import Tvc from './components/Tvc'
import Login from './components/Login'
import Create from './components/Create'

//require.ensure([], () => {})
	//const isProduction = false;
	const AnimationFrame = require('animation-frame');
	const imagesLoaded = require('imagesLoaded');
	imagesLoaded.makeJQueryPlugin( $ );
	const TweenMax = require('gsap');

	const loader = new Loader()
	loader.render('#loader')
	
	// insert site-nav
	new Navigation().render('div.site-nav');

	// use an animation frame
	// https://github.com/kof/animation-frame/blob/master/readme.md
	var animationFrame = new AnimationFrame();
	
	var GOON = {};

	GOON.Landing = (function(){

		var preloadData = []

		var init = function(){
			// 如果曾经登录过...
			if(window.localStorage.getItem('token')){
				Action.loadUser()
			}

			loader.show()
			// 渲染加载模版
			var preloadBox = $('#preload'),
				percentBox = $("#percentage");
			
			new Loadbox('landing').render();

			var preloadBox = $('#preload'),
				percentBox = $("#percentage");
		
			var imgs = preloadBox.find('img'),
				allimg_count = imgs.length,
				img_count = 0;
			console.log(imgs)
			imgs.each(function(){
				$(this).imagesLoaded(function(){
					img_count++;
					var percentage = Math.floor((img_count/allimg_count)*100);
					percentBox.html(percentage+"%");
					console.log(percentage)
					if(img_count === allimg_count){
						completeLoaderHandler();
					}
				});
			});

			bindEvents();
		};

		var completeLoaderHandler = function(){
			// 移除loading
			loader.hide()

			// 
			GOON.Tvc.init()
		};

		var bindEvents = function(){
			
		};
		
		return {
			init: init
		};
	})();

	GOON.Tvc = (function(){
		var tvc = $('.tvc');

		var init = function(){
			console.log('tvc initial..')

			new Tvc().render('div.tvc');

			tvc.fadeIn();

			bindEvents();
		};

		var hide = function(){
			tvc.hide();
		};

		var show = function(){
			tvc.show();
		};

		var bindEvents = function(){

			
		};

		return {
			init: init,
			show: show,
			hide: hide
		}

	})();

	GOON.Panel = (function(){
		var init = function(){

			bindEvents();
		};

		var bindEvents = function(){
			var wrap = $('#wrapper');

			// 
			//wrap.on('click'. '')

			// 提交收货信息
			wrap.on('click', '.action-submit-apply', function(e){
				e.preventDefault();

				var apply = $('.apply-form'),
					data = {},
					validateResult = true;
				
				// validate
				data.user_id = Action.getLocal('user').id;
				data.product_id = apply.find('.options .active').index() + 1;
				data.mobile = apply.find('input[name=mobile]').val();
				data.province_id = 1;
				data.city_id = 1;
				data.area_id = 1;
				data.address = apply.find('textarea').val();

				console.log(data);

				$.each(data, function(key, val){
					console.log('key:'+key)
					console.log('val:'+val)
					if(val === '' || !val){
						Action.showMessage('请输入完整的信息！');
						validateResult = false;
						return false
					}
					if(key === 'mobile' && !Action.validate(data.mobile, 'mobile')){
						Action.showMessage('手机号码格式有误！');
						validateResult = false;
						return false
					}
				})

				if(validateResult){
					Action.submitApply(data)
				}	
			})


			// 去领取
			wrap.on('click', '.action-apply', function(e){
				e.preventDefault()

				console.log('1')
				//
				new Apply().render('div.apply-form')
				Action.showPanel('apply-form')
			})

			// 返回首页
			wrap.on('click', '.action-back', function(e){
				e.preventDefault();

				Action.hidePanel();
				GOON.Tvc.show();

				// remove active class from circle
				$('.star-detail').removeClass('active');
			})

			// 查看我的甜睡神器
			wrap.on('click', '.action-show-star', function(e){
				e.preventDefault()

				var star = Action.getLocal('star')

				new Animal(star).render('div.star-detail')
				console.log(star)
				if(star.star_count > 4){
					// Action.showPanel('star-all-collected')
					Action.getPrize();
				}else{
					Action.showPanel('star-form')
				}
				GOON.Tvc.hide();
			})

			// 生成二维码, 分享给好友
			wrap.on('click', '.action-generate-qr', function(e){
				e.preventDefault();
				var starId = Action.getLocal('star').id;
				Action.generateQrcode(starId);
				// Action.showPanel('share-tips-qr')
			})

			// 去选择
			wrap.on('click', '.action-create-star', function(e){
				e.preventDefault();
				console.log('action-create button clicked...')
				var isLogin = Action.checkAuth();
				if(isLogin){
					console.log('user is login')
					// show create panel
					new Create().render('div.create-form')
					Action.showPanel('create-form')
					$('.create-form .selections').slick({
						dots: true,
						speed: 200
					})
					console.log('slick..')

				}else{
					// alert('请先登录')
					new Login().render('div.login-form')
					Action.showPanel('login-form')
				}
			})

			// 选择神器
			wrap.on('click', '.action-create', function(e){
				e.preventDefault();
				console.log('action-create button clicked...')

				var id = $('.create-form .selections').slick('slickCurrentSlide') + 1;
				console.log(id)

				Action.createStar(id);


			})

			// 登录
			wrap.on('click', '.action-login', function(e){
				e.preventDefault();
				console.log('action-login button clicked...')

				var loginForm = $('.login-form'),
					data = {},
					validateResult = true;

				data.email = loginForm.find("input[name=email]").val();
				data.password = loginForm.find("input[name=password]").val();

				// validate
				$.each(data, function(key, val){
					console.log('key:'+key)
					console.log('val:'+val)
					if(val === '' || !val){
						Action.showMessage('请输入完整的信息！');
						validateResult = false;
						return false
					}
				})
				console.log(validateResult)
				if(validateResult){
					// 
					Action.login(data)
				}
			})

			// 去注册
			wrap.on('click', '.link-to-reg', function(e){
				e.preventDefault();
				console.log('link-to-reg button clicked...')

				// insert register
				new Register().render('div.register-form');

				Action.showPanel('register-form')
			})

			// 获取手机验证码
			wrap.on('click', '.action-get-captcha', function(e){
				e.preventDefault();

				var regForm = $('.register-form'),
					mobile = regForm.find("input[name=mobile]").val();

				if(mobile === '' || !Action.validate(mobile, 'mobile')){
					Action.showMessage('手机号码格式有误！');
					return
				}

				Action.getCaptcha(mobile)

			})

			// 指定妈妈类型
			wrap.on('click', '.register-form .type li', function(){
				var type = $(this).text(),
					regForm = $('.register-form'),
					dateLabel = '';
				$(this).addClass('active').siblings().removeClass('active')
				switch(type){
					case '妈妈':
						dateLabel = '宝宝生日'
						regForm.find('.sex, .date > select').show()
						break;
					case '准妈妈':
						dateLabel = '预产期'
						regForm.find('.sex').hide()
						regForm.find('.date > select').show()
						break;
					case '备孕妈妈':
						dateLabel = '预期'
						regForm.find('.sex').hide()
						regForm.find('.date > select').eq(0).show().siblings().hide()
						break;
					default://其他
						regForm.find('.sex, .date > select').hide()
				}
				regForm.find('.date-label').text(dateLabel)
			})

			// 注册用户
			wrap.on('click', '.action-create-user', function(e){
				e.preventDefault();

				var regForm = $('.register-form'),
					validateResult = true,
					repassword = regForm.find("input[name=repassword]").val();
				var data = {};
					data.nick_name = regForm.find("input[name=nick_name]").val();
					data.email = regForm.find("input[name=email]").val();
					data.mobile = regForm.find("input[name=mobile]").val();
					data.mobilecode = regForm.find("input[name=captcha]").val();
					data.password = regForm.find("input[name=password]").val();
					data.password_confirm = regForm.find("input[name=repassword]").val();
					data.type = regForm.find(".type .active").text();
				var baby_sex = regForm.find("input[name=baby_sex]").val(),
					baby_birthday_year = regForm.find("select[name=baby_birthday_year]").val(),
					baby_birthday_month = regForm.find("select[name=baby_birthday_month]").val(),
					baby_birthday_day = regForm.find("select[name=baby_birthday_day]").val();
					switch(data.type){
						case '妈妈':
							data.type = 1;
							data.baby_sex = baby_sex === '男' ? 1 : 2;
							data.baby_birthday_year = baby_birthday_year;
							data.baby_birthday_month = baby_birthday_month;
							data.baby_birthday_day = baby_birthday_day;
							break;
						case '准妈妈':
							data.type = 0;
							data.baby_birthday_year = baby_birthday_year;
							data.baby_birthday_month = baby_birthday_month;
							data.baby_birthday_day = baby_birthday_day;
							break;
						case '备孕妈妈':
							data.type = 2;
							data.baby_birthday_year = baby_birthday_year;
							break;
						default://其他
							data.type = 3;
							regForm.find('.sex, .date > select').hide()
					}

				// validate inut data
				$.each(data, function(key, val){
					console.log('key: '+key+' val: '+val+' type: '+typeof(val))
					if(val === '' || !val){
						Action.showMessage('请输入完整的信息！');
						validateResult = false;
						return false
					}
					if(key === 'mobile' && !Action.validate(val, 'mobile')){
						Action.showMessage('手机号码格式有误！');
						validateResult = false;
						return false
					}
					if(key === 'email' && !Action.validate(val, 'email')){
						Action.showMessage('邮箱格式有误！');
						validateResult = false;
						return false
					}
				})

				if(validateResult && data.password !== data.password_confirm){
					Action.showMessage('两次输入的密码不一致！');
					validateResult = false;
				}

				if(validateResult && !$('input[name=term]').prop('checked')){
					Action.showMessage('请阅读并同意大王服务条款');
					validateResult = false;
				}
				
				if(validateResult){
					console.log('validate passed')	
					console.log(data)
					
					Action.register(data);
				}
				
			})
		};

		return {
			init: init
		}
	})();
	
	GOON.Landing.init();
	GOON.Tvc.init();
	GOON.Panel.init();


	// test
	
	// show share tip panel;
	// new Share(JSON.parse(window.localStorage.getItem('star'))).render('div.share-tips')
	// Action.showPanel('share-tips')

	// test get prize， 0=>试用 1=>优惠
	// new Result(0).render('div.star-all-collected')
	// Action.showPanel('star-all-collected')
