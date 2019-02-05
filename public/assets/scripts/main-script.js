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
  <option value="art_&_design">Art & Design</option>
  <option value="auto_&_vehicles">Auto & Vehicles</option>
  <option value="beauty">Beauty</option>
  <option value="book_&_References">Book & References</option>
  <option value="business">Business</option>
  <option value="comics">Comics</option>
  <option value="communication">Communication</option>
  <option value="dating">Dating</option>
  <option value="education">Education</option>
  <option value="entertainment">Entertainment</option>
  <option value="finance">Finance</option>
  <option value="health_&_fitness">Health & Fitness</option>
  <option value="library_&_demo">Library & Demo</option>
  <option value="lifestyle">Lifestyle</option>
  <option value="media_&_video">Media & Video</option>
  <option value="medical">Medical</option>
  <option value="music_&_audio">Music & Audio</option>
  <option value="news_&_magazines">News & Magazines</option>
  <option value="personalisation">Personalisation</option>
  <option value="photography">Photography</option>
  <option value="productivity">Productivity</option>
  <option value="shopping">Shopping</option>
  <option value="social">Social</option>
  <option value="sports">Sports</option>
  <option value="tools">Tools</option>
  <option value="transport">Transport</option>
  <option value="travels_&_local">Travels & Local</option>
  <option value="weather">Weather</option>
  `;

	var game_options = `
  <option value="arcade">Arcade</option>
  <option value="action">Action</option>
  <option value="adventure">Adventure</option>
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
