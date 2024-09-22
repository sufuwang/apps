import { createTransport, type Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type Mailer from "nodemailer/lib/mailer";
import { compressDataBaseFile } from "./folder";
// @ts-ignore
import Path from "path";

class _Email {
	private from: string;
	private transporter: Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
		this.from = '"ReadMe" sufu_wang@qq.com';
		this.transporter = createTransport({
			host: "smtp.qq.com",
			port: 587,
			secure: false,
			auth: {
				user: "sufu_wang@qq.com",
				pass: "leopwcabpnyrbaed",
			},
		});
	}

	send(content: Mailer.Options) {
		return this.transporter.sendMail(
			Object.assign({ from: this.from }, content)
		);
	}
}

export const Email = new _Email();

/**
 * 发送一封附件为数据库挂载卷的邮件
 */
export async function backupDatabase() {
	const { path, compressedFileName } = await compressDataBaseFile();
	return Email.send({
		to: "13087545358@163.com",
		subject: "Backup Database",
		attachments: [
			{
				filename: compressedFileName,
				path: Path.join(path, compressedFileName),
			},
		],
	});
}
