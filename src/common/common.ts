export function displayPhoto(id?: number) {
  if (!id) return "";

  const token =
    localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? "";

  return `${process.env.REACT_APP_API_URL}/photo/${id}?token=${token}`;
}

export function isStringANumber(value: string): boolean {
  const regex = /^-?\d+(\.\d+)?$/;
  return regex.test(value);
}
