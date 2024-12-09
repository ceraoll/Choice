import axios from 'axios';
import router from '@/router';
import { useToast } from 'vue-toastification';
const API = import.meta.env.VITE_CHOICE_API;
const toast = useToast();


function getToken() {
  return localStorage.getItem("accessToken");
}

function getUserInfo() {
  return JSON.parse(localStorage.getItem("userInfo"));
}

export async function getLaptop() {
  try {
    const response = await axios.get(`${API}/laptop`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        user_id: getUserInfo().user_id, 
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Data Laptop");
    return false;
  }
}

export async function getNilaiAlternatifLaptop() {
  try {
    const response = await axios.get(`${API}/nilai-alternatif-laptop`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        user_id: getUserInfo().user_id, 
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Data Alternatif Laptop");
    return false;
  }
}


export async function insertLaptop(formData) {
  const { laptopType, price, weight, RAMCapacity, RAMSpeed, ROMCapacity, resolution, processor } = formData;
  try {
    await axios.post(`${API}/laptop`, {
      user_id: getUserInfo().user_id,
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
        Authorization: `Bearer ${getToken()}`,
      },
    });
    router.go(0);
    toast.success("Berhasil input Laptop!");
  } catch (err) {
    toast.error("Gagal input Laptop!");
    return false;
  }
}