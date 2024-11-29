import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { checkPembayaran, getLastPayment } from "../lib/firestore";
import { ListSiswa } from "~/db/siswa";
import axios from "axios";

const monthList = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export const usePayment = () => {
  const [message, setMessage] = useState<string>("");
  const [paymentMonths, setPaymentMonths] = useState<string[]>([]);
  const [siswa, setSiswa] = useState<any>(null);
  const [months, setMonths] = useState<any>(null);

  const currentDate = new Date();
  const currentMonth = monthList[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Calculate overdue months based on last payment
  const calculateOverdueMonths = (lastPayment: any) => {
    const overdueMonths: string[] = [];
    if (!lastPayment) {
      for (let i = 0; i < currentDate.getMonth(); i++) {
        overdueMonths.push(monthList[i]);
      }
      return overdueMonths;
    }

    const lastPaidMonth = lastPayment.month;
    const lastPaidYear = lastPayment.year;
    let monthIndex = monthList.indexOf(lastPaidMonth);
    monthIndex = (monthIndex + 1) % 12;

    while (
      (lastPaidYear === currentYear && monthIndex < currentDate.getMonth()) ||
      lastPaidYear < currentYear
    ) {
      overdueMonths.push(monthList[monthIndex]);
      monthIndex = (monthIndex + 1) % 12;
    }

    return overdueMonths;
  };

  // Calculate tax based on overdue count
  const calculateTax = (overdueCount: number) =>
    overdueCount > 5 ? overdueCount * 2500 : overdueCount * 2500;

  // Calculate total price considering overdue count and base price
  const calculateTotalPrice = (overdueCount: number, basePrice: number) => {
    const tax = calculateTax(overdueCount);
    return basePrice * overdueCount + tax;
  };

  // Handle form submission (checking payments and overdue months)
  const handleSubmit = async (nisn: string) => {
    const siswaData = ListSiswa.find((s) => s.nisn === nisn);
    if (siswaData) {
      setSiswa(siswaData);

      const payments = await checkPembayaran(nisn, currentMonth, currentYear);
      if (payments.length > 0) {
        setMessage("Pembayaran bulan ini sudah dilakukan.");
      } else {
        try {
          const lastPayment = await getLastPayment(nisn);
          let overdueMonths;
          let overdueCount;
          if (lastPayment) {
            overdueMonths = calculateOverdueMonths(lastPayment);
            overdueCount = overdueMonths.length;
          } else {
            overdueMonths = monthList.slice(0, currentDate.getMonth() + 1);
            overdueCount = overdueMonths.length;
          }
          const basePrice = 100000;
          const totalPrice = calculateTotalPrice(overdueCount, basePrice);
          setPaymentMonths(overdueMonths);
          setMonths(overdueMonths);
          setMessage(
            `${overdueCount} bulan belum dibayar: ${overdueMonths.join(
              ", "
            )}. Total yang harus dibayar: Rp ${totalPrice}`
          );
        } catch (error) {
          console.error("Error getting last payment:", error);
          setMessage(
            "Terjadi kesalahan saat mengambil data pembayaran terakhir."
          );
        }
      }
    } else {
      const overdueMonths = monthList.slice(0, currentDate.getMonth() + 1);
      const overdueCount = overdueMonths.length;
      const basePrice = 100000;
      const totalPrice = calculateTotalPrice(overdueCount, basePrice);
      setPaymentMonths(overdueMonths);
      setMonths(overdueMonths);
      setMessage(
        `${overdueCount} bulan belum dibayar: ${overdueMonths.join(
          ", "
        )}. Total yang harus dibayar: Rp ${totalPrice}`
      );
    }
  };

  const handleMidtransPayment = async (
    nisn: string,
    monthsToPay: number,
  ) => {
    const paymentId = uuidv4();
    try {
      const lastPayment = await getLastPayment(nisn);
      const basePrice = 100000;
      const totalPrice = calculateTotalPrice(monthsToPay, basePrice);

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
      const { token } = response.data;
      if (token) {
        window.location.href = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${token}`;
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
    resetData,
    months,
  };
};

