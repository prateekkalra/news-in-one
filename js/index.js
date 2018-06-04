$(document).ready(function(){
		// $(".cssload-fond").hide();

	function getCountry(){
			let result = $.ajax({
				url:'https://api.ipdata.co/',
				dataType: 'json',
				async:false
			}).responseJSON;
			return result;
		}
	const country = getCountry();
	let country_code = 'us'
	country_code= country.country_code;
	const newsarea = $('#newsarea');
	const newsrow = $('#newsrow');

	const alert = $("#err_alert");

	let url = `https://newsapi.org/v2/top-headlines?country=${country_code}&apiKey=3ab706dd9785401fb04bb8152a442115`;
	

	$("#cflag").attr("src",country.flag);
	$("#cflag").css("display","block");

	

	$("#lists a").click(function(){
		$('#search').val("");
		const listdata = $(this).data('cat');
		let catquery = "&"
		if(listdata!="topnews"){
			catquery = `&category=${listdata}&`;
		}
		url= `https://newsapi.org/v2/top-headlines?country=${country_code}${catquery}apiKey=3ab706dd9785401fb04bb8152a442115`;
		rendernews();

		$.each($('#lists a'),function(i,link){
			$(link).removeClass('active');
		})
		$(this).addClass('active');
		
	});


	rendernews();

	function rendernews(){
		$(".cssload-fond").show();

		alert.css("display","none");
		newsrow.empty();//Clear contents of newsrow

		$.getJSON(url,function (result) {
		if(result.status=="ok"&&result.totalResults>0){
			$.each(result.articles,function(i,articles){
			let newsimg = $("<img>")
				.attr("src",articles.urlToImage)
				.addClass('img-fluid newsimg');

			let newstitle = $("<h6>")
				.addClass("newstitle text-center")
				.html(articles.title);



			let newslinkdiv = $("<a>")
				.addClass('newsblock col-lg-3 col-md-3 col-sm-5 col-12 my-2 offset-md-1 px-0')
				.attr("href",articles.url)
				.attr("target","_blank")
				.appendTo(newsrow);
				

			let newsdiv = $("<div>")
				// .addClass('')
				.append(newstitle)
				// .append(newssrc)
				.prepend(newsimg)
				.appendTo(newslinkdiv);
				
				$(".cssload-fond").hide();

			});	

		}

		else{
			alert.css("display","block");
			alert.css("visibility","visible");
		}




		
	});
	}

	const search = $('#search');
	let val=''
	search.on('keyup',function(e){
		val = search.val();
		if(e.keyCode==13&&val!=''){
			url = `https://newsapi.org/v2/everything?q=${encodeURI(val)}&sortBy=popularity&pageSize=50&apiKey=3ab706dd9785401fb04bb8152a442115`;
			rendernews();
			$.each($('#lists a'),function(i,link){
			$(link).removeClass('active');
		})
		}
	})

	








});

