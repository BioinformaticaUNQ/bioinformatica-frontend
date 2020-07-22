export function sequences_colors(sequences) {
	let colors = {};
	for (var i = 0; i < sequences.length; i++){
		let color = i * (360 / sequences.length) % 360;
		colors[sequences[i]] =  "hsl( " + color + ", 100%, 50% )";
	}
	return colors;
}