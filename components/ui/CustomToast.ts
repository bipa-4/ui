import Swal from 'sweetalert2';

export default function useCustomConfirmToast(text: string): void {
  Swal.fire({
    icon: 'success',
    title: text,
    position: 'top',
    timer: 1800,
    timerProgressBar: true,
    toast: true,
    showConfirmButton: false,
  });
}

export function useCustomWarningToast(text: string): void {
  Swal.fire({
    icon: 'warning',
    title: text,
    position: 'top',
    timer: 3000,
    timerProgressBar: true,
    toast: true,
    showConfirmButton: false,
  });
}
