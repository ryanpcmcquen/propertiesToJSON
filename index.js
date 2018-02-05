const parseProperties = (str) => {
	const lines = str.split("\n");
	const nonCommentLines = lines.filter(
		(line) =>
			line
				.replace(/\s/g, "")
				.slice(0, 1)
				.match(/(\#|\!)/)
				? false
				: line
	);
};
