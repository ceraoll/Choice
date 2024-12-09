export function formatRupiah (value) {
  if (!value) return "";
  const numericValue = value.toString().replace(/\D/g, "");
  return `Rp ${parseInt(numericValue || "0", 10).toLocaleString("id-ID")}`;
};
