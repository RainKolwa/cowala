import './styles/styles.scss'
import $ from 'jquery'
import TweenMax from 'gsap'
import slick from 'slick-carousel'
import * as Action from './actions'
import Mustache from 'mustache'
import Navigation from './components/Navigation'
import Intro from './components/Intro'
import Loadbox from './components/Loadbox'
import Loader from './components/Loader'
import Skip from './components/Skip'
import Animal from './components/Animal'
import Share from './components/Share'
import Result from './components/Result'
import Apply from './components/Apply'
import Register from './components/Register'
import Tvc from './components/Tvc'
import Login from './components/Login'
import Create from './components/Create'
import ApplyResult from './components/ApplyResult'
import Rule from './components/Rule'
import Shop from './components/Shop'

//require.ensure([], () => {})
	//const isProduction = false;
	const AnimationFrame = require('animation-frame');
	const imagesLoaded = require('imagesLoaded');
	imagesLoaded.makeJQueryPlugin( $ );
	

	const loader = new Loader()
	loader.render('#loader')
	
	// insert site-nav
	new Navigation().render('div.site-nav');

	// use an animation frame
	// https://github.com/kof/animation-frame/blob/master/readme.md
	var animationFrame = new AnimationFrame();
	
	var GOON = {};
	var skipped = false;

	GOON.BrowserCheck = (function(){
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
		(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

		var init = function(){
			if (Sys.ie){
			    if(parseInt(Sys.ie) < 10){
			        add();
			    }
			}	
		};

		var add = function (){
		    buttonHTML = '<a style="margin:0 auto;float:none" href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank" class="button button-circle update" onclick="_gaq.push([\'_trackEvent\', \'ClickCount\', \'click\', \'goto_update\']);">升级浏览器！</a>';
		    document.body.innerHTML +='<div class="alert-mask" id="alert-mask"><div class="alert-box"><img src="/images/logo.png" /><p>您的浏览器版本过低，<br>为了保证您的浏览效果，<br>建议升级浏览器后进入本公司官方网站</p>'+buttonHTML+'</div></div>';
		}

		return {
			init: init
		}
	})();

	GOON.Landing = (function(){

		var preloadData = []

		var init = function(){

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
			
			imgs.each(function(){
				$(this).imagesLoaded(function(){
					img_count++;
					var percentage = Math.floor((img_count/allimg_count)*100);
					percentBox.html(percentage+"%");
					
					if(img_count === allimg_count){
						completeLoaderHandler();
					}
				});
			});

			bindEvents();
		};

		var completeLoaderHandler = function(){
			// 跳过动画
			new Skip().render('body')

			// 移除loading
			loader.hide()

			if(!skipped){
				// 片头动画
				GOON.Intro.start()
			}
		};

		var bindEvents = function(){
			$('body').on('click', '#skip', function(e){
				e.preventDefault();
				$(this).remove();

				// 直接进入星空动画
				GOON.Intro.startSkyIn();
				skipped = true;
				GOON.Intro.tl.stop()
			})
		};
		
		return {
			init: init
		};
	})();

	GOON.Intro = (function(){

		var intro = $('.intro');
		var bg = $('.bg');
		var star = $('.star');
		var scene1;
		var scene2;
		var scene3;
		var scene4;
		var scene5;
		var overlay;

		var tl = new TimelineLite();
		var tl1 = new TimelineLite();

		// bg & star 动画
		var tl2 = new TimelineMax({
			repeat: 1
		});

		var init = function(){

			new Intro().render('div.intro')

			scene1 = intro.find('.scene1');
			scene2 = intro.find('.scene2');
			scene3 = intro.find('.scene3');
			scene4 = intro.find('.scene4');
			scene5 = intro.find('.scene5');
			overlay = intro.find('.sceneOverlay');

		};

		var start = function(){
			console.log('start..')
			tl.to(overlay, 0.25, {autoAlpha: 1});

			tl.to(scene1, 0.5, {autoAlpha: 1});
			tl.to(scene1.find('.txt'), 0.5, {autoAlpha: 1, y: -10}, "-=0.25");
			tl.to(scene1, 1, {autoAlpha: 0}, "+=1");
			
			tl.to(scene2, 0.5, {autoAlpha: 1}, "-=0.38");
			tl.to(scene2.find('.txt'), 0.5, {autoAlpha: 1, y: -10}, "-=0.25");
			tl.to(scene2, 1, {autoAlpha: 0}, "+=1");

			tl.to(scene3, 0.5, {autoAlpha: 1}, "-=0.38");
			tl.to(scene3.find('.txt'), 0.5, {autoAlpha: 1, y: -10}, "-=0.25");
			tl.to(scene3, 1, {autoAlpha: 0}, "+=1");

			tl.to(scene4, 0.5, {autoAlpha: 1, y: -15});
			tl.to(scene4, 1, {autoAlpha: 0}, "+=1");

			tl.to(scene5, 0.5, {autoAlpha: 1, y: -15});
			tl.to(scene5, 1, {autoAlpha: 0}, "+=1");

			tl.to(overlay, 0.2, {autoAlpha: 0, onComplete: startSkyIn});
			
			
		};

		var startSkyIn = function(){
			// 移除片头
			intro.remove()

			// 星空动画
			tl1.to(bg, 5, {autoAlpha: 1,rotation: 360, scale: 1.6, transformOrigin: "50% 65%", onComplete: completeSkyIn}, "-=0.5")
			tl1.to(star, 1, {autoAlpha: 1})
			tl1.to(intro, 0, {autoAlpha: 0});
		};

		var completeSkyIn = function(){

			// 移除跳过按钮
			if($('#skip')){
				$('#skip').remove();
			}

			// 如果曾经登录过...
			if(window.localStorage.getItem('token')){
				Action.loadUser()
			}

			// 初始化Tvc	
			GOON.Tvc.init()

			tl2.to(bg, 6, {left: 0, top: 0})
			tl2.to(star, 6, {left: "-20%", top: 0}, "-=6")

			tl2.to(bg, 6, {left: "-120%", top: 0})
			tl2.to(star, 6, {left: "-100%", top: "-80%"}, "-=6")

			tl2.to(bg, 6, {left: "-50%", top: "-90%"})
			tl2.to(star, 6, {left: "-30%", top: "-70%"}, "-=6")
		}

		return {
			init: init,
			start: start,
			startSkyIn: startSkyIn,
			completeSkyIn: completeSkyIn,
			tl: tl
		}

	})();


	GOON.Tvc = (function(){

		var tvc = $('.tvc'),
			timer,
			i = 0;

		var init = function(){

			new Tvc().render('div.tvc');

			show();

			bindEvents();
		};

		var hide = function(){
			tvc.hide();
			clearInterval(timer)
		};

		var show = function(){
			tvc.fadeIn();
			clearInterval(timer)
			timer = setInterval(function(){
				if(i===3){i=0}
				$('.slogan').find('.light').eq(i).addClass('active').siblings().removeClass('active')
				i++;
			},500)
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

			// 显示门店详情
			wrap.on('click', '.action-show-event', function(e){
				e.preventDefault();
				console.log('action-show-event button clicked')

				new Shop().render('div.shop')
				Action.showPanel('shop')
			})


			// 显示活动规则
			wrap.on('click', '.action-show-rule', function(e){
				e.preventDefault();
				console.log('action-show-rule button clicked')

				new Rule().render('div.rule')
				Action.showPanel('rule')
			})

			// 提交收货信息
			wrap.on('click', '.action-submit-apply', function(e){
				e.preventDefault();

				var apply = $('.apply-form'),
					data = {},
					validateResult = true;
				
				data.user_id = Action.getLocal('user').id;
				data.recipient = apply.find('input[name=recipient]').val();
				data.product_id = apply.find('.options .active').index() + 7;
				data.mobile = apply.find('input[name=mobile]').val();
				data.province_id = apply.find('.province').val();
				data.city_id = apply.find('.city').val();
				data.area_id = apply.find('.area').val();
				data.address = apply.find('textarea').val();

				$.each(data, function(key, val){
					
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
					console.log('address form address validte passed')
					Action.submitApply(data)
				}	
			})


			// 去领取
			wrap.on('click', '.action-apply', function(e){
				e.preventDefault()

				new Apply().render('div.apply-form')
				Action.showPanel('apply-form')
			})

			// 返回首页
			wrap.on('click', '.action-back', function(e){
				e.preventDefault();

				Action.hidePanel();
				GOON.Tvc.show();

				$('.star-detail').removeClass('active');
			})

			// 查看我的甜睡神器
			wrap.on('click', '.action-show-star', function(e){
				e.preventDefault()

				new Animal().render('div.star-detail');
				Action.showPanel('star-form');

				GOON.Tvc.hide();
			})

			// 去领取奖励
			wrap.on('click', '.action-get-prize', function(e){
				e.preventDefault();

				Action.getPrize();
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

				var isLogin = Action.checkAuth();
				
				if(isLogin){
					// 去选择神器 或者 查看神器
					new Create().render('div.create-form')
					Action.showPanel('create-form')
					$('.create-form .selections').slick({
						dots: true,
						speed: 200,
						autoplay: true,
						autoplaySpeed: 100
					})
					setTimeout(function(){
						$('.create-form .selections').slick('unslick');
						$('.create-form .selections').slick({
							dots: true,
							speed: 200,
							autoplay: false
						})
					},1800)
				}else{
					// 去登录
					new Login().render('div.login-form')
					Action.showPanel('login-form')
				}
			})

			// 选择神器
			wrap.on('click', '.action-create', function(e){
				e.preventDefault();

				var id = $('.create-form .selections').slick('slickCurrentSlide') + 1;
				console.log(id)

				Action.createStar(id);
			})

			// 登录
			wrap.on('click', '.action-login', function(e){
				e.preventDefault();

				var loginForm = $('.login-form'),
					data = {},
					validateResult = true;

				data.email = loginForm.find("input[name=email]").val();
				data.password = loginForm.find("input[name=password]").val();

				// 验证
				$.each(data, function(key, val){
					if(val === '' || !val){
						Action.showMessage('请输入完整的信息！');
						validateResult = false;
						return false
					}
				})
				if(validateResult){ 
					Action.login(data)
				}
			})

			// 去注册
			wrap.on('click', '.link-to-reg', function(e){
				e.preventDefault();
				console.log('link-to-reg button clicked...')

				// 初始化注册表单
				new Register().render('div.register-form');

				Action.showPanel('register-form')
			})

			// 获取手机验证码
			wrap.on('click', '.action-get-captcha', function(e){
				e.preventDefault();
				if($(this).text().indexOf('s') > -1){
					return
				}

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
						regForm.find('.sexbox, .date > select').show()
						break;
					case '准妈妈':
						dateLabel = '预产期'
						regForm.find('.sexbox').hide()
						regForm.find('.date > select').show()
						break;
					case '备孕妈妈':
						dateLabel = '预期'
						regForm.find('.sexbox').hide()
						regForm.find('.date > select').eq(0).show().siblings().hide()
						break;
					default://其他
						regForm.find('.sexbox, .date > select').hide()
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

				// 验证数据
				$.each(data, function(key, val){
					if(key !== 'type' && key !== 'baby_birthday_year' && key !== 'baby_birthday_month' && key !== 'baby_birthday_day' && key !== 'baby_sex'){
						if(val === '' || !val){
							Action.showMessage('请输入完整的信息！');
							validateResult = false;
							return false
						}
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
					Action.register(data);
				}
				
			})
		};

		return {
			init: init
		}
	})();
	
	GOON.BrowserCheck.init();
	GOON.Landing.init();
	GOON.Intro.init();
	GOON.Panel.init();


	// test
	
	// show share tip panel;
	// new Share(JSON.parse(window.localStorage.getItem('star'))).render('div.share-tips')
	// Action.showPanel('share-tips')

	// test get prize， 0=>试用 1=>优惠
	// new Result(1).render('div.star-all-collected')
	// Action.showPanel('star-all-collected')

	// Action.showPanel('share-tips')

	// 显示试用品申请表
	// new Apply().render('div.apply-form')
	// Action.showPanel('apply-form')

	// 显示提交成功信息
	// new ApplyResult().render('div.apply-result-form');
	// Action.showPanel('apply-result-form');
