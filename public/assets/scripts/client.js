$(document).ready(function() {
	// OnKeypress show {Create} Button
	function authCreateADraftApp() {
		$("#app_title").on("input", () => {
			if ($("#app_title").val() != "") {
				$("#createBtn")
					.css({ opacity: "1", cursor: "pointer" })
					.removeAttr("disabled");
			} else {
				$("#createBtn")
					.css({ opacity: ".2", cursor: "no-drop" })
					.attr("disabled");
			}
		});
	}
	authCreateADraftApp();

	// Fadein when load any URL
	function fadeOnload() {
		$(document).on(
			"load",
			() => {
				$(this).fadeIn(500);
			},
			false
		);
	}
	fadeOnload();

	function alertBeforeBack() {
		var msg = `You want to discard all progress?`;
		swal({
			title: `Are you sure!`,
			text: msg,
			icon: `warning`,
			buttons: ["Cancel", "Continue"],
			dangerMode: true,
			closeOnEsc: true,
			closeOnClickOutside: true
		}).then(goBack => {
			if (goBack) {
				return (location.href = "/app/dashboard");
			} else {
				swal.close();
			}
		});
	}
	$(".goBack").click(e => {
		e.preventDefault();
		var loc = /publish/i;
		var isRight = loc.test(location.href);
		if (isRight) {
			alertBeforeBack();
		}
	});
});
