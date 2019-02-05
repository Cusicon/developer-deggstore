function fileUpload(imgFrame, imgInput) {
	$(imgInput).on("change", e => {
		let file = e.target.files[0];

		// Display file URL only
		fileReader.onload = e => {
			// $(imgFrame).css("background-image", `url(${e.target.result})`);
			$(imgFrame).attr("src", e.target.result);
		};
		// Display file Properties
	});
}

function displaySnapshotsImages(inputID, e) {
	let files = e.target.files;
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		var fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = e => {
			$(`<img src="${
				e.target.result
			}" id="app_snapshot${i}" style="background-color: transparent; border: 1px solid #eeeeee; margin: 10px 0; max-height: 140px; max-width: 200px;"
					alt="Snapshot">`).append(inputID);
			console.log(e.target.result);
		};
		return e.target.result;
	}
}
$("#app_snapshot").on("change", e => {
	displaySnapshotsImages("#app_snapshot", e);
});
