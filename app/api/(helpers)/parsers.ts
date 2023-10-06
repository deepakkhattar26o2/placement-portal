export function formDataToJSON(fdata: FormData) {
  let data: any = {};
  fdata.forEach((value, key)=>{data[key] = value})

  return data;
}

export function jsonToFormData(obj : any){
  let fdata = new FormData();
  for(let key in obj){
    fdata.append(key,  obj[key]);
  }
  return fdata;
}

export function csvToArray(text: string): string[] {
  let arr = text.split(",").map((ele) => ele.replace(/ /g, ""));
  return arr;
}
