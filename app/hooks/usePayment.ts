import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { checkPembayaran, getLastPayment } from "../lib/firestore";
import { ListSiswa } from "~/db/siswa";
import axios from "axios";

const monthList = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const usePayment = () => {
  const [message, setMessage] = useState<string>("");
  const [paymentMonths, setPaymentMonths] = useState<any>([]);
  const [siswa, setSiswa] = useState<any>(null);
  const [months, setMonths] = useState<any>(null);

  const currentDate = new Date();
  const currentMonth = monthList[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const calculateOverdueMonths = (lastPayment: { month: string }) => {
    const lastPaidMonthIndex = monthList.indexOf(lastPayment.month);
    const currentMonthIndex = currentDate.getMonth();

    // Jika terakhir dibayar sebelum Desember, tambahkan sisa bulan
    const overdueMonths = [];
    for (let i = lastPaidMonthIndex + 1; i <= currentMonthIndex; i++) {
      overdueMonths.push(monthList[i % 12]);
    }

    return overdueMonths;
  };

  const calculateTax = (overdueCount: number) => {
    return overdueCount > 5 ? (overdueCount - 5) * 2500 : 0;
  };

  // Calculate total price considering overdue count and base price
  const calculateTotalPrice = (overdueCount: number, basePrice: number) => {
    const tax = calculateTax(overdueCount);
    // Apply the tax to the total price, ensuring it's added correctly
    return basePrice * overdueCount + tax;
  };

  const handleSubmit = async (nisn: string) => {
    const siswaData = ListSiswa.find((s) => s.nisn === nisn);
    if (!siswaData) {
      setMessage("NISN siswa tidak berhasil ditemukan!");
      return;
    }

    setSiswa(siswaData);

    const payments = await checkPembayaran(nisn, currentMonth, currentYear);
    if (payments.length > 0) {
      setMessage("Pembayaran bulan ini sudah dilakukan.");
    } else {
      try {
        const lastPayment = await getLastPayment(nisn);
        let overdueMonths: string[] = [];
        let overdueCount: number = 0;

        if (lastPayment) {
          overdueMonths = calculateOverdueMonths(lastPayment);
          overdueCount = overdueMonths.length;
        } else {
          overdueMonths = monthList.slice(0, currentDate.getMonth() + 1);
          overdueCount = overdueMonths.length;

          // Pastikan "Desember" disertakan jika perlu
          if (!overdueMonths.includes("Desember")) {
            overdueMonths.push("Desember");
            overdueCount++;
          }
        }

        if (overdueCount === 0) {
          setMessage("Pembayaran sudah lunas.");
        } else {
          const basePrice = 100000;
          const totalPrice = calculateTotalPrice(overdueCount, basePrice);

          setPaymentMonths(overdueMonths);
          setMessage(
            `${overdueCount} bulan belum dibayar: ${overdueMonths.join(
              ", "
            )}. Total yang harus dibayar: Rp ${totalPrice}`
          );
        }
      } catch (error) {
        console.error("Error getting last payment:", error);
        setMessage(
          "Terjadi kesalahan saat mengambil data pembayaran terakhir."
        );
      }
    }
  };

  const handleMidtransPayment = async (
    nisn: string,
    monthsToPay: number,
    totalMonths: number
  ) => {
    const paymentId = uuidv4();
    try {
      localStorage.removeItem("totalMonths");

      const totalPrice = totalMonths;

      const response = await axios.post(
        "https://edu-api-flax.vercel.app/api/payment",
        {
          paymentId,
          nisn,
          price: totalPrice,
          month: currentMonth,
          year: currentYear,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("nisn", nisn);
      checkMonth(nisn, monthsToPay);
      const { token } = response.data;
      if (token) {
        //window.location.href = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${token}`;
      } else {
        console.error("Failed to get token from server");
        setMessage("Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage(
        "There was an error processing the payment. Please try again."
      );
    }
  };

  const checkMonth = async (nisn: string, monthsToPayCount: number) => {
    const lastPayment = await getLastPayment(nisn);
    let overdueMonths: string[] = [];
    let overdueCount: number = 0;
    const monthsToPay = monthsToPayCount + 1;

    if (lastPayment) {
      const lastPaidMonthIndex = monthList.indexOf(lastPayment.month);
      let monthsToPayArray: string[] = [];

      for (let i = 0; i < monthsToPay; i++) {
        const nextMonthIndex = (lastPaidMonthIndex + i) % 12;
        monthsToPayArray.push(monthList[nextMonthIndex]);
      }

      const overdueMonths = monthsToPayArray[monthsToPay - 1];
      localStorage.setItem("totalMonths", overdueMonths);
      console.log(overdueMonths);
    } else {
      const overdueMonths = monthList.slice(0, monthsToPay); // Ambil bulan sesuai monthsToPay
      const selectedMonth = overdueMonths[monthsToPayCount - 1]; // Ambil bulan terakhir
      localStorage.setItem("totalMonths", selectedMonth);
      console.log("Selected month:", selectedMonth);
      console.log(selectedMonth);
    }

    console.log("Overdue count:", overdueCount);
  };

  // Reset data
  const resetData = () => {
    setSiswa(null);
    setPaymentMonths([]);
    setMessage("");
  };

  return {
    siswa,
    message,
    paymentMonths,
    handleSubmit,
    handleMidtransPayment,
    calculateTotalPrice,
    resetData,
    months,
  };
};
