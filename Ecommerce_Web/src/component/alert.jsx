import Swal from "sweetalert2";

export const successAlert = (msg) =>
  Swal.fire({
    icon: "success",
    title: msg,
    timer: 1200,
    showConfirmButton: false,
  });

export const errorAlert = (msg) =>
  Swal.fire({
    icon: "error",
    title: msg,
  });