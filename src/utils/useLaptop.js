// src/utils/laptop.js
import axios from 'axios';
import router from '@/router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth'; // Import the Pinia store
const API = import.meta.env.VITE_CHOICE_API;
const toast = useToast();


// Access the store
export async function getLaptop() {
  const authStore = useAuthStore();
  try {
    const response = await axios.get(`${API}/laptop`, {
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },
      params: {
        user_id: authStore.getUserInfo.user_id,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Data Laptop");
    return false;
  }
}

export async function fetchLaptopDetails(id_laptop) {
  const authStore = useAuthStore();

  if (!id_laptop) return toast.error("Id laptop tidak ditemukan");
  try {
    const response = await axios.get(`${API}/laptop/${id_laptop}`, {
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal mendapatkan data laptop");
    return false;
  }
}

export async function getNilaiAlternatifLaptop() {
  const authStore = useAuthStore();
  try {
    const response = await axios.get(`${API}/nilai-alternatif-laptop`, {
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },
      params: {
        user_id: authStore.getUserInfo.user_id,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Data Alternatif Laptop");
    return false;
  }
}

export async function insertLaptop(formData) {
  const authStore = useAuthStore();
  const { laptopType, price, weight, RAMCapacity, RAMSpeed, ROMCapacity, resolution, processor } = formData;
  try {
    await axios.post(
      `${API}/laptop`,
      {
        user_id: authStore.getUserInfo.user_id,
        nama_laptop: laptopType,
        harga: price,
        berat: parseFloat(weight),
        kapasitas_rom: ROMCapacity,
        kapasitas_ram: RAMCapacity,
        kecepatan_ram: RAMSpeed,
        resolusi: resolution,
        processor: processor,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.getToken}`,
        },
      }
    );
    toast.success("Berhasil input Laptop!");
    return true;
  } catch (err) {
    toast.error("Gagal input Laptop!");
    return false;
  }
}

export async function updateLaptop(id_laptop, formData) {
  const authStore = useAuthStore();
  const { laptopType, price, weight, RAMCapacity, RAMSpeed, ROMCapacity, resolution, processor } = formData;
  try {
    await axios.put(
      `${API}/laptop/${id_laptop}/update`,
      {
        nama_laptop: laptopType,
        harga: price,
        berat: parseFloat(weight),
        kapasitas_rom: ROMCapacity,
        kapasitas_ram: RAMCapacity,
        kecepatan_ram: RAMSpeed,
        resolusi: resolution,
        processor: processor,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.getToken}`,
        },
      }
    );
    const toastMessage = {
      status: 'success',
      message: 'Berhasil update Laptop!',
    };
    localStorage.setItem('toastMessage', JSON.stringify(toastMessage));
    router.go('/hitung');
    return true;
  } catch (err) {
    toast.error("Gagal update Laptop!");
    return false;
  }
}

export async function deleteLaptop(id_laptop) {
  const authStore = useAuthStore();
  try {
    await axios.delete(`${API}/laptop/${id_laptop}/delete`, {
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },
    });
    const toastMessage = {
      status: 'success',
      message: 'Berhasil delete Laptop!',
    };
    localStorage.setItem('toastMessage', JSON.stringify(toastMessage));
    router.go(0);
    return true;
  } catch (err) {
    console.error(err);
    if (err.response) {
      toast.error(err.response.data.error || "Gagal menghapus laptop!");
    }
    return false;
  }
}
