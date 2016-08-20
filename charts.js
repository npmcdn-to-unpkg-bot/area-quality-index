let searchword = "20500";
$.ajax({
	url: '/api/area_data/' + searchword,
	type: 'GET',
	success: function(data) {
		console.log(data);
		if(data.status === 1) {
			handleCharts(data)
		}
		else {
			console.log("error in data");
		}
	},
	error: function(err) {
		console.log("Error", err)
	}
});


function handleCharts(data) {
	$('.charts').append('<div class="house-size"><i class="fa fa-3x fa-building-o"></i><span class="title">Average household size</span><span class="data">'+data['household-avg-size']+'</span></div>');
	$('.charts').append('<div class="median-income"><i class="fa fa-3x fa-money"></i><span class="title">Median income</span><span class="data">'+data['median-income']+' €</span></div>');
	$('.charts').append('<div class="avg-age"><i class="fa fa-3x fa-clock-o"></i><span class="title">Average age</span><span class="data">'+data['average-age']+'</span></div>');
	$('.charts').append('<div class="jobless"><i class="fa fa-3x fa-briefcase"></i><span class="title">Unemployed</span><span class="data">'+(data['jobless']*100).toFixed(2)+' %</span></div>');
	$('.charts').append('<div class="owners-renters"><i class="fa fa-3x fa-area-chart"></i><span class="title">Owners/renters</span><span class="data">'+(data['house-owners']/data['renters']).toFixed(2)+'</span></div>');

	// $('.charts div').css({'display': 'inline-block', 'padding': '20px', 'text-align': 'center'});
	$('.charts .title').css({'display': 'block'});
}