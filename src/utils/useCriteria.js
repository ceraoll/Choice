import axios from 'axios';
import { useToast } from 'vue-toastification';
const API = import.meta.env.VITE_CHOICE_API;
const toast = useToast();


function getToken() {
  return localStorage.getItem("accessToken");
}

function getUserInfo() {
  return JSON.parse(localStorage.getItem("userInfo"));
}

export async function getBrand() {
  try {
    const response = await axios.get(`${API}/brand`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Data Brand");
    return false;
  }
}

export async function getGenerasiProcessor() {
  try {
    const response = await axios.get(`${API}/generasi-processor`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Data Generasi Processor");
    return false;
  }
}

export async function getKapasitasROM() {
  try {
    const response = await axios.get(`${API}/kapasitas-rom`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Kapasitas ROM");
    return false;
  }
}

export async function getKapasitasRAM() {
  try {
    const response = await axios.get(`${API}/kapasitas-ram`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Kapasitas RAM");
    return false;
  }
}

export async function getKecepatanRAM() {
  try {
    const response = await axios.get(`${API}/kecepatan-ram`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Kecepatan RAM");
    return false;
  }
}

export async function getResolusi() {
  try {
    const response = await axios.get(`${API}/resolusi`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Resolusi");
    return false;
  }
}

export async function getTipeProcessor() {
  try {
    const response = await axios.get(`${API}/tipe-processor`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Tipe Processor");
    return false;
  }
}

export async function getCriteria() {
  try {
    const response = await axios.get(`${API}/criteria`);
    return response.data;
  } catch (err) {
    toast.error("Gagal Mendapatkan Tipe Processor");
    return false;
  }
}

export async function insertLaptop(formData) {
  const { laptopType, price, weight, RAMCapacity, RAMSpeed, ROMCapacity, resolution, processor } = formData;
  try {
    const response = await axios.post(`${API}/laptop`, {
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
    return response.data;
  } catch (err) {
    toast.error("Gagal Menginput Laptop");
    return false;
  }
}