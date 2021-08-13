import { cities } from "typeData";

export function getColorMark(mark: number): string {
  if (mark >= 8) return "green";
  if (mark >= 5) return "orange";
  else return "red";
}
export function getNameCity(cityCode: string, listCity: cities[]): string {
  const NameCity = listCity.find((city) => {
    return cityCode === city.code;
  });
  return NameCity?.name || "Không xác định";
}
