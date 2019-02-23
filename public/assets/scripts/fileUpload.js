$(function() {
	// Multiple images preview engine in browser
	var screenshotsPreview = function(input, placeToInsertImagePreview) {
		if (input.files) {
			var filesAmount = input.files.length;

			for (var i = 0; i < filesAmount; i++) {
				var reader = new FileReader();

				reader.onload = function(event) {
					$($.parseHTML("<img>"))
						.attr({
							src: event.target.result,
							style: "display: inline-block; margin: 7% .1%;",
							height: 150,
							alt: "Screenshot",
							title: "Screenshot"
						})
						.prependTo(placeToInsertImagePreview);
				};

				reader.readAsDataURL(input.files[i]);
			}
		}
	};

	// Screenshots preview
	$("#app_screenshot").on("change", function() {
		if (this.files.length != 0) {
			$("div.screenshotsCon .info center")
				.html("")
				.hide();
			// Empty displayCon, before changing it's value
			$("div.screenshotsCon .info .displayCon div").html("");
			$("div.screenshotsCon .info .displayCon div").html(
				screenshotsPreview(this, "div.screenshotsCon .info .displayCon div")
			);
			console.log(this.files);
			console.log(this.files.length);
			
		} else {
			var PreviewInfo = `
				<center>
					<div style="margin: 9% 0%; text-align: center; width: 100%;">
						<h4 style="font-weight: lighter;">Select and Upload App Previews and Displays</h4>
						<span style="margin-bottom: 10px; display: block; color: #ccc;">Note: To upload screenshots, select all images
							at
							once.</span>
							<input type="button" class="btn btn-success" value="Choose screenshots">
					</div>
				</center>
			`;
			$("div.screenshotsCon .info").html(PreviewInfo);
			console.log(this.files);
			console.log(this.files.length);
			
		}
	});

	// App icon preview
	$("#app_icon").on("change", function(e) {
		if (this.files.length != 0) {
			let file = this.files[0];
			var fileReader = new FileReader();

			// Display file URL only
			fileReader.onload = e => {
				$("div#app_icon_frame").css(
					"background-image",
					`url(${e.target.result})`
				);
			};

			fileReader.readAsDataURL(file);
			
			console.log(this.files);
			console.log(this.files.length);
		} else {
			$("div#app_icon_frame").css(
				"background-image",
				"url(/assets/images/icon_add.png)"
			);
			
			console.log(this.files);
			console.log(this.files.length);
		}
	});
});
