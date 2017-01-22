function addnews() {
	var form = $('#addnews').serializeArray();
	var result = new Object();

	for (var i = 0; i < form.length; i++) {
		result[form[i]['name']] = form[i]['value'];
	}

	sendJSON('/addNews', result, function(err, data) {
		if(!err && data.status == "success") {
			window.location.href = "/";
		}
	});

}


$("a.deletenews").click(function(){
    var news_id = $(this).parent().attr('id');

	sendJSON('/deleteNews', {news_id: news_id}, function(err, data) {
		if(!err && data.status == "success") {
			window.location.href = "/";
		}
	});
});


$("a.updatenews").click(function() {
	var parent_div = $(this).parent();
	var result = new Object();
	result['news_id'] = parent_div.attr('id');
	result['subject_value'] = parent_div.find('h4').text();
	result['text_value'] = parent_div.find('p').text();

	var form = $("<form/>", {id:"form_update"});
	form.append($("<input>", {type:'hidden', value: result['news_id'], name:'news_id'}));
	form.append($("<input>", {type:'text',value:result['subject_value'], name:'subject'}));
	form.append($("</br>"));
	form.append($("<input>", {type:'text',value:result['text_value'], name:'text'}));
	form.append($("</br>"));
	form.append($("<button type='button' onclick='updatenews()'>Обновить</button>"));
	parent_div.append(form);

});

function updatenews(){
	var form = $('#form_update').serializeArray();
	var result = new Object();

	for (var i = 0; i < form.length; i++) {
		result[form[i]['name']] = form[i]['value'];
	}

	sendJSON('/updateNews', result, function(err, data) {
		if(!err && data.status == "success") {
			$('#'+data.news_id).find('h4').text(data.subject);
			$('#'+data.news_id).find('p').text(data.text);
			$('#form_update').remove();
		}
	});
}

function sendJSON(url, obj, callback) {
	$.ajax({
		url: url,
		method: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		data: JSON.stringify(obj),
		success: function(data) {
			callback(null, data);
		},
		error: function(jqXHR, textStatus) {
			callback(textStatus);
		}
	});
}
