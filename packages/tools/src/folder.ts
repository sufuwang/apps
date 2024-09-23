import archiver from "archiver";
import dayjs from "dayjs";
// @ts-ignore
import fs from "fs";
// @ts-ignore
import Path from "path";

interface Folder {
	path: string;
	compressedFileName: string;
	willCompressFolderName: string;
}

/**
 * 压缩文件夹
 */
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

/**
 * 获取数据库挂载卷目录
 */
export function getDataBaseCachePath() {
	// @ts-ignore
	const folderPath = Path.join(__dirname.split("apps")[0], "apps");
	return {
		folderPath,
		fileName: "data",
	};
}

/**
 * 压缩数据库挂载卷
 */
export async function compressDataBaseFile() {
	const { folderPath, fileName: willCompressFolderName } =
		getDataBaseCachePath();
	const curDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
	const info = {
		path: folderPath,
		compressedFileName: `${curDate}.zip`,
		willCompressFolderName,
	};
	await compressFolder(info);
	return info;
}
