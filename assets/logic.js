

let limit = "10";
let subject = "";
let arr = ['tennis', 'baseball', 'hockey'];
const apikey = "fMXM1tplkxAXn5EA91akb0ZDK8ODwYrO"
let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=" + apikey + "&limit=" + limit;
console.log(queryURL);

let gif = $("#gif");

//function for adding buttons from pre-defined array for examples
for(i=0; i < arr.length; i++){
	var btn = $('<button type="button" class="btn btn-outline-primary" id="btncolor" onclick="pullgif(this)" >' + arr[i] + '</button>');
	btn.attr("category", arr[i]);
	$('h3').append(btn);
};

//Add button based on user choice input

function adder(){
	console.log($("#usrinput").val());
	if($("#usrinput").val() ==""){
		return;
	}else{
	var usrbtn = $('<button type="button" class="btn btn-outline-primary" id="btncolor" onclick="pullgif(this)">' + $("#usrinput").val()  + '</button>')
		usrbtn.attr("category", $("#usrinput").val()); 
	$('h3').append(usrbtn);
	}};
	

//take category attribute and assign to subject variable which makes up the api call url.
function pullgif(btn){
	$("#gif").empty();
	subject = btn.getAttribute("category");
	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=" + apikey + "&limit=" + limit;
	console.log(subject);
	call();
};
	
//logic for playing and stopping the GIF.
function playorstop(img){
		if(img.src != img.getAttribute("animate")){
			img.src = img.getAttribute("animate");
		}else{
			img.src = img.getAttribute("still");
		}
	};


function call()	{
	
	//ajax call to api
	
	console.log(subject);
	$.ajax({
	url: queryURL,
	method: "GET"
	}).
	
	//once response is received run function that that adds still images to div ele
	
	then(function(response){
		for(i=0; i < response.data.length;i++){
			console.log(response);
			
			var img = $('<img id="image'+ i + '"class="image img-fluid border border-primary" onclick="playorstop(this)">');
			var rating = $('<div id="rating">GIF Rating: ' + response.data[i].rating + '---Click Image to Play or Stop GIF' + '</div>');
			console.log(response.data[i].embed_url);
			img.attr("src", response.data[i].images.fixed_height_still.url);
			img.attr("still", response.data[i].images.fixed_height_still.url);
			img.attr("animate", response.data[i].images.fixed_height.url);
			
			gif.append("<br>");	
			$("#gif").append(img);
			$("#gif").append(rating);

	}
	

})};




