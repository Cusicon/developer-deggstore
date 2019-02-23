// Load StoreListing as the default when '/app/publish/draft' is loaded

$(document).ready(() => {
	LoadPublishMenus();
	setCategory();
});

const loader = `
	<center style="position: absolute; z-index: -2; width: 100%;">
		<div id="loader_con" style="margin: 250px;">
			<div class="loader" style="display: block;"></div>
		</div>
	</center>
`;

function Load(selector, url) {
	$(selector).html(loader);
	$.ajax({
		type: "GET",
		url: url,
		success: function(data, msg) {
			$(selector).html(data);
		},
		error: function(xhr, txtstats, err) {
			$(selector).html(loader);
		}
	});
}

// Load publish menu
function LoadPublishMenus() {
	// app_packages
	$("#app_packages").click(e => {
		var href = $("#app_packages").attr("data-href");
		// Load ${href} to {#Body}
		Load("#Body", href);
		// Add active to selected
		$(".app_menu li a").removeClass("active");
		console.log(e.target);
		$(e.target).addClass("active");
	});

	// test_flight
	$("#test_flight").click(e => {
		var href = $("#test_flight").attr("data-href");
		// Load ${href} to {#Body}
		Load("#Body", href);
		// Add active to selected
		$(".app_menu li a").removeClass("active");
		console.log(e.target);
		$(e.target).addClass("active");
	});

	// services
	$("#services").click(e => {
		var href = $("#services").attr("data-href");
		// Load ${href} to {#Body}
		Load("#Body", href);
		// Add active to selected
		$(".app_menu li a").removeClass("active");
		console.log(e.target);
		$(e.target).addClass("active");
	});

	// in_app_purchase
	$("#in_app_purchase").click(e => {
		var href = $("#in_app_purchase").attr("data-href");
		// Load ${href} to {#Body}
		Load("#Body", href);
		// Add active to selected
		$(".app_menu li a").removeClass("active");
		console.log(e.target);
		$(e.target).addClass("active");
	});
}

function setCategory() {
	var application = $("#application");
	var game = $("#game");
	var app_type = $("#app_type");
	var app_category = $("#app_category");
	var application_options = `
  <option value="Art & Design">Art & Design</option>
  <option value="Auto & Vehicles">Auto & Vehicles</option>
  <option value="Beauty">Beauty</option>
  <option value="Book & References">Book & References</option>
  <option value="Business">Business</option>
  <option value="Comics">Comics</option>
  <option value="Communication">Communication</option>
  <option value="Dating">Dating</option>
  <option value="Education">Education</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Finance">Finance</option>
  <option value="Health & Fitness">Health & Fitness</option>
  <option value="Library & Demo">Library & Demo</option>
  <option value="Lifestyle">Lifestyle</option>
  <option value="Media & Video">Media & Video</option>
  <option value="Medical">Medical</option>
  <option value="Music & Audio">Music & Audio</option>
  <option value="News & Magazines">News & Magazines</option>
  <option value="Personalisation">Personalisation</option>
  <option value="Photography">Photography</option>
  <option value="Productivity">Productivity</option>
  <option value="Shopping">Shopping</option>
  <option value="Social">Social</option>
  <option value="Sports">Sports</option>
  <option value="Tools">Tools</option>
  <option value="Transport">Transport</option>
  <option value="Travels & Local">Travels & Local</option>
  <option value="Weather">Weather</option>
  `;

	var game_options = `
	<option value="Action">Action</option>
	<option value="Adventure">Adventure</option>
	<option value="Arcade">Arcade</option>
	<option value="Combat">Combat</option>
	<option value="Educational">Educational</option>
	<option value="First Person Shooter">First Person Shooter (FPS)</option>
	<option value="Massively Multiplayer Online">Massively Multiplayer Online (MMO)</option>
	<option value="Simulations">Simulations</option>
	<option value="Puzzle">Puzzle</option>
	<option value="Real-Time Strategy">Real-Time Strategy</option>
	<option value="Role Playing">Role Playing</option>
	<option value="Sports">Sports</option>
	<option value="Stealth shooter">Stealth Shooter</option>
  `;

	app_type.change(e => {
		if (app_type.val() == "application") {
			app_category.html(application_options);
		} else if (app_type.val() == "game") {
			app_category.html(game_options);
		} else {
			app_category.html(`<option label="Choose a category"></option>`);
		}
	});
}
