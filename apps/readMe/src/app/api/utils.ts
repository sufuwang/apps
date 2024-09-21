import fs from "fs";
// @ts-ignore
import archiver from "archiver";
import Path from "path";

interface Folder {
	path: string;
	compressedFileName: string;
	willCompressFolderName: string;
}

export function compressFolder({
	compressedFileName,
	willCompressFolderName,
	path,
}: Folder) {
	return new Promise((resolve, reject) => {
		const output = fs.createWriteStream(Path.join(path, compressedFileName));
		const archive = archiver("zip", {
			zlib: { level: 9 },
		});
		output.on("close", () => {
			console.info(
				"Compressed Folder: ",
				`${path}/${willCompressFolderName} => ${path}/${compressedFileName}`
			);
			resolve(null);
		});
		archive.on("error", reject);
		archive.pipe(output);
		archive.directory(Path.join(path, willCompressFolderName), false);
		archive.finalize();
	});
}

export function getDataBaseCachePath() {
	const folderPath = Path.join(__dirname.split("readMe")[0], "readMe");
	return {
		folderPath,
		fileName: "data",
	};
}

export async function compressDataBaseFile() {
	const { folderPath, fileName: willCompressFolderName } =
		getDataBaseCachePath();
	const date = new Date();
	const curDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
	const info = {
		path: folderPath,
		compressedFileName: `readme_data_${curDate}.zip`,
		willCompressFolderName,
	};
	await compressFolder(info);
	return info;
}
