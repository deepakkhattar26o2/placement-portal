import { join } from "path";
import * as fs from "fs";

export async function saveFile(file : File, fileName: string) {
  if (!file) {
    throw new Error("Missing/Invalid File!");
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const dir = join("../../../../../public");
  const path = join(__dirname, dir, fileName);
  if (!fs.existsSync(join(__dirname, dir))) {
    fs.mkdirSync(join(__dirname, dir));
  }
  console.log(path);
  fs.writeFile(path, buffer, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
