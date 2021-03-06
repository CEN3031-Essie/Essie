// This javascript file is taken from the UF 2015 template which can be found here: https://webservices.it.ufl.edu/templates/uf-2015/
// This code has not been fully implemented because the mean stack only recognises javascript written in angular and this is vanilla js

// Smartresize
(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
	  var timeout;

	  return function debounced () {
		  var obj = this, args = arguments;
		  function delayed () {
			  if (!execAsap)
				  func.apply(obj, args);
			  timeout = null;
		  };

		  if (timeout)
			  clearTimeout(timeout);
		  else if (execAsap)
			  func.apply(obj, args);

		  timeout = setTimeout(delayed, threshold || 100);
	  };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

$(document).ready(function(){
	var $searchForm = $('.search-wrap'),
		$menuWrap = $('.menu-wrap'),
		$body = $('body'),
		$mobileDropdown = $('.mobile-dropdown-wrap'),
		$mobileDropdownTimeout,
		shuffledUFStats;

	// Run svgforeverybody
	svg4everybody();

	// Load randomized bio scroll features
	if (typeof biosjson !== 'undefined') {
		$('[id^=bio_]').each(function(){
			bioScrollPopulator( $(this).attr('id'), $(this).data('bio-affiliation'), biosjson );
		});
	}

	// Shuffle around stats for stat areas
	if (typeof statsjson !== 'undefined') {
		randomizeStats(statsjson);
	}

	// Hide alert modal via cookies
	ufl_site_alert_cookie();

	// Main menu mobile
	$('.btn-menu').on('click',function(e){
		e.preventDefault();
				$('.aux-menu-wrap a').off('click.mobileNoClick');
		if($body.hasClass('open-mobile-dropdown')){
			$body.removeClass('open-mobile-dropdown');
		} else {
			$body.toggleClass('open-menu');
		}

		// Mobile dropdown height if VH isn't supported
		if(!Modernizr.cssvhunit){
			$menuWrap.height($(window).height() - 60);
		}
	});

	// Apply CSS class based on stat length
	statLengthClassifier( '.stat-block .stat', 4 );
	statLengthClassifier( '.homepage-stat-wrap .stat', 3 );

	// -- T4 Helpers --
	
	// Copy audience nav menu items to auxiliary menu
	$(".audience-nav-wrap ul li").each(function(){$(this).children('a').attr('data-ufl-audience-preference',$(this).text().replace(/\s+/g, '-').replace('&', '').replace('--', '-').toLowerCase()).addClass('audience-link');}).clone().prependTo(".aux-menu-wrap>ul").addClass("audience-link").find("a").removeClass("audience-link").parents(".aux-menu-wrap ul").addClass("aux-nav");
	
	// Dropdown helper
	$(".main-menu-wrap .dropdown>ul").addClass("col-md-4");
	
	// Big List helpers
	$(".gal-list-wrap ul").addClass("big-list").prepend('<li class="btn-mobile-toggle" aria-hidden="true" role="presentation"><a href="#">Additional Links <span class="arw-right icon-svg"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/media/templates/uf2015/img/spritemap.svg#arw-right"></use></svg></span></a></li>').find("a").append('<span class="arw-right icon-svg"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/media/templates/uf2015/img/spritemap.svg#arw-right"></use></svg></span>');
	$(".t4-help-big-list ul").addClass("big-list show-mobile").find("a").append('<span class="arw-right icon-svg"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/media/templates/uf2015/img/spritemap.svg#arw-right"></use></svg></span>');
	$(".t4-ul-classifier ul").prepend('<li class="btn-mobile-toggle" aria-hidden="true" role="presentation"><a href="#">Filter <span class="arw-right icon-svg"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/media/templates/uf2015/img/spritemap.svg#arw-right"></use></svg></span></a></li>')
	
	// Homepage Hero helper
	$(".featured-story-content-wrap>.featured-story").each(function(i){if(0==i){$(this).addClass("active");}$(this).attr("data-number",i+1);$(this).children("h2").attr("data-index",i+1);});
	
	// Alphabetical List helper
	$('.t4-alpha-list ul').addClass('majors-list').each(function(){var alpha = $(this).parent('div').attr('data-category');$(this).attr('data-category',alpha);});
	
	// UL Classifier
	$(".t4-ul-classifier").each(function(){$(this).children('ul').addClass($(this).attr('data-ul-class'));});

	// Resize iframe forms
	$('.ufws-ifr').iFrameResize([{checkOrigin: false}]);

	// Set audience menu via cookies
	ufl_audience_cookie();

	// Remove the loading class to enable transitions
	$('body').removeClass('loading');

	// Show aux menu on smaller width
	$('.btn-show-aux').on('click',function(e){
		e.preventDefault();
		$('.header').toggleClass('show-aux');
	});

	// Dropdown positioning
	function showDropdown(el){
		if(window.innerWidth > 992){
			var $this = el,
			$offset = $this.offset().left,
			$dropdown = $this.find('.dropdown');

			$('.main-menu-wrap .hover').removeClass('hover');

			$this.addClass('hover');

			$this.removeClass('offscreen full');

			if($dropdown.width() + $offset > window.innerWidth){
				$this.addClass('offscreen');
			}

			if($this.hasClass('offscreen') && $dropdown.offset().left < 0 && window.innerWidth > 1140){
				$dropdown.css({'transform':'translateX('+Math.abs($dropdown.offset().left)+'px)'});
			}

			$dropdown.find('.col-md-4').velocity('finish').velocity('transition.slideDownIn',{
				duration: 400,
				easing: 'easeOut',
				stagger: 100
			});
		}
	}
	$('.main-menu-wrap > ul > li').hoverIntent({
		over: function(){
			showDropdown($(this))
		},
		out: function(){
			$(this).removeClass('hover');
		}
	}).on('click',function(){
		$this = $(this);
		if(Modernizr.touch){
			if($this.hasClass('hover')){
				$this.removeClass('hover');
			} else {
				showDropdown($this.closest('li'));
			}
		}
	});

	// Main menu focus for accessibility
	$('.main-menu-link').on('focus',function(e){
		showDropdown($(this).closest('li'));
	});

	// Mobile dropdown content
	$('.main-menu-wrap > ul > li > a').on('click',function(e){
		if(window.innerWidth < 992){
			e.preventDefault();
			$this = $(this);
			window.clearTimeout($mobileDropdownTimeout);
			$menuWrap.off('click.closeMobile');

			if($body.hasClass('open-mobile-dropdown')){
				$body.removeClass('open-mobile-dropdown');
				$mobileDropdown.empty();
				$('.aux-menu-wrap a').off('click.mobileNoClick')
			} else {
				$body.addClass('open-mobile-dropdown');
				$mobileDropdown.html('<h2><a href="'+$this.attr('href')+'">'+ $this.text() + '</a></h2>' + ($this.next('.dropdown').length ? $this.next('.dropdown').html() : ""));

				// Mobile dropdown height if VH isn't supported
				if(!Modernizr.cssvhunit){
					$mobileDropdown.height($(window).height() - 60);
				}

				$mobileDropdownTimeout = window.setTimeout(function(){
					$menuWrap.one('click.closeMobile',function(){
						$body.removeClass('open-mobile-dropdown');
						$mobileDropdown.empty();
					});
				},0);

				// Prevent clicks on other links when mobile dropdown is open
				$('.aux-menu-wrap a').one('click.mobileNoClick', function(e){
					e.preventDefault();
				});
			}
		}
	});

	// Header search form
	$searchForm.on('click',function(e){
		if(!$searchForm.hasClass('open-search')){
			e.preventDefault();
			$searchForm.addClass('open-search').find('input').focus();

			if(window.innerWidth <= 992){
				$('.alert-small').hide();
			}

			// Close the search form on blur
			window.setTimeout(function(){
				$(document).one('click.closeSearch',function(e){
					if(!$(e.target).closest('.search-wrap').length){
						$searchForm.removeClass('open-search').find('input').val('');
						$('.alert-small').show();
					}
				});
			},0);
		}
	})

	// Footer mobile accordian
	$('.footer-menu h2').on('click',function(){
		if(window.innerWidth <= 767){
			$(this).closest('.footer-menu').toggleClass('open');
		}
	});

	//// Homepage featured story
	// Setting homepage hero story on load
	$('.featured-story-img-wrap').each(function(){
		$(this).find('.featured-story-img:first').addClass('active');
	});

	// Switching to a new featured story
	$(document).on('click','.featured-story',function(){
		$this = $(this);

		// Changed featured carousel
		$('.featured-story-img-wrap').each(function(){
			$homeWrap = $(this).closest('.homepage-wrapper');

			// Get this carousel's clicked element
			$el = $homeWrap.find('.featured-story[data-number="'+ $this.attr('data-number') +'"]');

			// Move Carousel
			$(this).find('.featured-story-img').removeClass('active').eq($el.attr('data-number') - 1).addClass('active');

			// Establish container to append to
			$container = $homeWrap.find('.featured-story-content-wrap');

			// Get this carousel's active element
			$active = $homeWrap.find('.featured-story.active');
			$active.removeClass('active');

			// Move active to clicked element, and move clicked element to active
			$el.before($active);
			$el.addClass('active');
			$el.prependTo($container);
		});
	});

	// Homepage feature bio wrap
	function bioSize(){
		$activeWidth = 370;
		if(window.innerWidth > 1220){
			$activeWidth = 570;
		}
		$('.feature-bio-wrap').each(function(){
			$this = $(this);

			$('.bio:first',$this).addClass('active').width($activeWidth);

			$('.bio:nth-child(2)',$this).css({
			  left: $activeWidth
			});
			$('.bio:nth-child(3)',$this).css({
			  left: $activeWidth + $('.bio:not(.active)',$this).width()
			});
		});
	}
	if(window.innerWidth > 992){
		$('.bio:first').addClass('active');

		// Resize bios
		bioSize();
	}
	$(document).on('click','.bio',function(){
		$activeWidth = $('.bio.active').width();
	  $this = $(this);
	  $bioWrap = $this.closest('.feature-bio-wrap');

		if($('.feature-bios .bio.velocity-animating',$bioWrap).length || window.innerWidth < 767){
			return;
		}
	  if(!$this.hasClass('active')){
		  $this.velocity({
			left: 0,
			height: 638,
			width: $activeWidth
		  },{
			duration: 400,
			queue: false
		  });

		  $curActive = $('.bio.active',$bioWrap).clone();
		  $curActive.appendTo($bioWrap.find('.bio-wrap')).css({
			left: $activeWidth + $('.bio:not(.active)',$bioWrap).width() * 2,
			height: '251px',
			width: '251px'
		  })
		  .removeClass('active')
		  .velocity({
			left: 900
		  },{
			duration: 400,
			queue: false,
			complete: function(){
				// Remove old active
				$('.bio.active',$bioWrap).remove();

			  $this.addClass('active');
			  $('.feature-bio-copy-wrap',$bioWrap).html($this.find('.copy-wrap').html());

			  $('.feature-bio-copy-wrap',$bioWrap).find('h2,h3,p').velocity('finish').velocity('transition.slideUpIn',{
				duration: 400,
				easing: 'easeOut',
				stagger: 100
			  });
			}
		  });

		  $this.nextAll('.bio').velocity({
			left: '-=251px'
		  },{
			duration: 400,
			delay: 0,
			queue: false,
			complete: function(){
			  $newActive = $this.clone();
			  $this.remove();
			  $newActive.prependTo($bioWrap.find('.bio-wrap')).addClass('active');
			}
		  });
		}
	});

	// Position emergecy modal on smaller screens
	if($('.emergency-modal').outerHeight() + parseInt($('.emergency-modal').css('margin-top')) < $(window).height() - $('.header').height()){
		$('.emergency-modal-wrap').addClass('fixed');
	}

	// Close emergency modal
	$('.emergency-modal-close').on('click',function(e){
		e.preventDefault();
		$('.emergency-modal-wrap').velocity(
			{
				opacity: 0,
				duration: 200
			},{
				complete: function(){
					$('.emergency-modal-wrap').remove();
				}
		});
	});

	// Bio hover effects
	$(document).on('mouseenter','.bio',function(){
		if(Modernizr.touch == false && window.innerWidth > 767){
			$(this).find('h2,h3,.arw-right').velocity('finish').velocity('transition.slideUpIn',{
				duration: 400,
				easing: 'easeOut',
				stagger: 100
			});
		}
	});

	// Big list mobile toggle
	$('.btn-mobile-toggle').on('click',function(e){
		e.preventDefault();
		$bigList = $(this).parent();

		$bigList.toggleClass('open-list');

	});

	// Stat block animation
	$('.stat-block-wrap').on('mouseenter',function(){
		if(Modernizr.touch == false && window.innerWidth > 992){
			$this = $(this);
			$infoCopy = $('.info-copy',this);

			$statHeight = $this.find('.stat').outerHeight();
			$infoHeight = $this.find('.info').outerHeight();

			$statHeight = (($infoHeight / 2 / $statHeight) * 100) + 50;

			$('.stat',this).css({'transform':'translateY(-50%)'}).velocity('finish').velocity({
				marginTop: '-' + parseInt($infoHeight / 2 + 20)
			},{
				duration: 200,
				easing: 'easeOut'
			});

			$('.info',this).velocity('finish').velocity({
				opacity: 1,
				marginTop: parseInt($statHeight / 2 + 20)
			},{
				duration: 200,
				easing: 'easeOut',
				queue: false
			});
		}
	}).on('mouseleave',function(){
		if(Modernizr.touch == false && window.innerWidth > 992){
			$('.stat',this).velocity('stop').velocity('reverse');

			$('.info',this).velocity('stop').velocity({
				opacity: 0,
				marginTop: 0
			},{
				duration: 200,
				easing: 'easeOut',
				queue: false
			});
		}
	});

	// Equal height horizontal scroll
	if(window.innerWidth < 992){
		horScrollSize();
	}

	function horScrollSize(){
		// Reset height of all horizontal elements
		$('.hor-scroll-el').css({'height':'','width':''});
		$('.hor-scroll-wrap').each(function(){
			$horHeight = 0;
			$('.hor-scroll-el',this).each(function(){
				if($(this).outerHeight() >  $horHeight){
					$horHeight = $(this).outerHeight();
				}
			}).height($horHeight);
		});
	}

	// Stat wrap offscreen listener
	$('.stat-wrap').on('mouseenter',function(){
		$this = $(this);
		$classes = $this[0].classList;

		if($classes.contains('in-right') && $this.offset().left + parseInt($this.width() * 2) > window.innerWidth){
			$this.removeClass('in-right').addClass('in-left');
		}
		if($classes.contains('in-left') && $this.offset().left - parseInt($this.width() * 2) < 0){
			$this.removeClass('in-left').addClass('in-right');
		}
	});

	// Audience nav wrap arrow hover
	$('.audience-nav-wrap').hover(function(){
		$(this).find('svg use').attr('xlink:href','/modules/core/client/img/brand/arrowDown.png');
	},function(){
		$(this).find('svg use').attr('xlink:href','/modules/core/client/img/brand/arrowUp.png');
	});

	// Debounced window resize listener
	$(window).smartresize(function(){
		$windowWidth = window.innerWidth;
		if($windowWidth > 767){
			// Resize bios on window resize
			bioSize();
		}

		if($windowWidth >= 992){
			// Resize hor-scroll-wrap elements
			$('.hor-scroll-el').css({'height':''});
		} else {
			// Equal height hor-scroll elements
			horScrollSize();
		}

		// Position emergecy modal on smaller screens
		if($('.emergency-modal').outerHeight() + 200 < $(window).height() - $('.header').height()){
			$('.emergency-modal-wrap').addClass('fixed');
		} else {
			$('.emergency-modal-wrap').removeClass('fixed');
		}
	});

	// Styled select boxes
	$('select.styled').each(function(i){
		$this = $(this);

		// Make new HTML select box
		var $styledSelect = $('<div class="styled-select" data-select="select'+i+'" tabindex="0"><div class="selected">Standard Dropdown</div><ul></ul><span class="arw-right icon-svg"><svg><use xlink:href="/media/templates/uf2015/img/spritemap.svg#arw-down"></use></svg></span></div>');
		$this.before($styledSelect);

		// Get all options from this select box
		$('option',this).each(function(){
			$styledSelect.find('ul').append('<li><a href="#" data-value="'+$(this).val()+'">'+$(this).text()+'</a></li>')
		});

		// Hide this select box
		$this.hide().attr('data-select','select'+i);
	});
	$(document).on('click','.styled-select a',function(e){
		e.preventDefault();
		$this = $(this);
		$select = $this.closest('.styled-select');

		// Change the text of selected
		$select.find('.selected').text($this.text()).addClass('changed');

		// Hide the dropdown
		$('.styled-select').removeClass('hover').find('svg use').attr('xlink:href','/media/templates/uf2015/img/spritemap.svg#arw-down');

		$('select[data-select="'+$select.attr('data-select')+'"]').val($(this).attr('data-value'));

		// Unbind document close select
		$(document).off('click.closeSelect');
	}).on('click','.styled-select .selected,.styled-select .arw-right',function(){
		$select = $(this).closest('.styled-select');
		$('.styled-select').not($select).removeClass('hover');
		$select.toggleClass('hover');

		// Change the arrow icon
		if($select.hasClass('hover')){
			$select.find('svg use').attr('xlink:href','/media/templates/uf2015/img/spritemap.svg#arw-up');
		} else {
			$select.find('svg use').attr('xlink:href','/media/templates/uf2015/img/spritemap.svg#arw-down');
		}
		// Change the arrow icon
		$('.styled-select').not($select).find('svg use').attr('xlink:href','/media/templates/uf2015/img/spritemap.svg#arw-down');

		// Close the select on blur
		window.setTimeout(function(){
			$(document).one('click.closeSelect',function(e){
				if(!$(e.target).closest('.styled-select').length){
					$select.removeClass('hover');
					$select.find('svg use').attr('xlink:href','/media/templates/uf2015/img/spritemap.svg#arw-down');
				}
			});
		},0);
	}).on('keydown','.styled-select',function(e){
		if(e.keyCode == 32){
			e.preventDefault();
			$(this).addClass('hover').find('li:first a').focus();
		}
		// Down arrow
		if(e.keyCode == 40){
			e.preventDefault();
			$(this).find('a:focus').closest('li').next('li').find('a').focus();
		}
		// Up arrow
		if(e.keyCode == 38){
			e.preventDefault();
			$(this).find('a:focus').closest('li').prev('li').find('a').focus();
		}
	}).on('blur','.styled-select',function(e){
		if(!$(e.relatedTarget).closest('.styled-select').hasClass('hover')){
			$('.styled-select').removeClass('hover');
		}
	});

	// Custom checkboxes
	$('.uf-check input[type="checkbox"]').each(function(){
		$(this).after('<div><span class="icon-svg"><svg><use xlink:href="/media/templates/uf2015/img/spritemap.svg#close"></use></svg></span></div>')
	});
	// Custom radio buttons
	$('.uf-check input[type="radio"]').each(function(){
		$(this).after('<div></div>')
	});
});