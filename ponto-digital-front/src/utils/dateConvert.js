export function ConvertDate(stringDate) {
  const newDate = stringDate.split("-");

  let auxTrade = newDate[2].split("T")[0];
  newDate[2] = newDate[0];
  newDate[0] = auxTrade;
  return newDate.join("/");
}
