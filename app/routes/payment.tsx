import { useSearchParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { savePembayaran } from "../lib/firestore";
import { monthList } from "~/db/month";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get("order_id");
  const hasSavedPayment = useRef(false);

  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const currentDate = new Date();
  const currentMonth = monthList[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(`https://edu-api-flax.vercel.app/api/payment/status?order_id=${order_id}`);
        if (response.data.status_code === "200") {
          setPaymentDetails(response.data);
          console.log(response.data);
          if (!hasSavedPayment.current) {
            const nisn = localStorage.getItem("nisn")?.toString();
            const month = localStorage.getItem("totalMonths")?.toString() || "";
            const pembayaran = {
              nisn: nisn ? nisn.toString() : "0",  // Ensure nisn is a string
              month,
              year: currentYear,
              status: response.data.transaction_status,
              date: new Date().toISOString(),  // Convert Date to ISO string format
            };

            savePembayaran(pembayaran);
            hasSavedPayment.current = true;
            localStorage.removeItem("totalMonths");
          }
        } else {
          console.error("Payment not found");
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    if (order_id) {
      checkStatus();
    }
  }, [order_id]);

  if (!paymentDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <span className="text-xl font-semibold text-gray-500">Loading...</span>
      </div>
    );
  }

  const {
    transaction_id,
    gross_amount,
    currency,
    order_id: apiOrderId,
    payment_type,
    transaction_status,
    va_numbers,
  } = paymentDetails;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);

    doc.text("Payment Receipt", 105, 20, { align: "center" });

    doc.text(`Transaction ID: ${transaction_id}`, 10, 40);
    doc.text(`Order ID: ${apiOrderId}`, 10, 50);
    doc.text(`Payment Amount: ${gross_amount} ${currency}`, 10, 60);
    doc.text(`Payment Type: ${payment_type}`, 10, 70);
    doc.text(`Transaction Status: ${transaction_status}`, 10, 80);

    if (va_numbers && Array.isArray(va_numbers) && va_numbers.length > 0) {
      doc.text(`Bank: ${va_numbers[0]?.bank}`, 10, 100);
      doc.text(`Virtual Account Number: ${va_numbers[0]?.va_number}`, 10, 110);
    } else {
      doc.text("No bank details available.", 10, 100);
    }

    doc.save(`Payment_Receipt_${apiOrderId}.pdf`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-xl space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.jpg" alt="Logo" className="w-[200px] object-contain" />
        </div>

        {/* Header */}
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Payment Receipt</h1>

        <div className="space-y-4">
          {/* Payment details */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Transaction ID:</p>
            <p className="text-sm font-medium text-gray-800">{transaction_id}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Order ID:</p>
            <p className="text-sm font-medium text-gray-800">{apiOrderId}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Payment Amount:</p>
            <p className="text-sm font-medium text-gray-800">{gross_amount} {currency}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Payment Type:</p>
            <p className="text-sm font-medium text-gray-800">{payment_type}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Transaction Status:</p>
            <p className="text-sm font-medium text-gray-800">{transaction_status}</p>
          </div>
        </div>

        {va_numbers && Array.isArray(va_numbers) && va_numbers.length > 0 ? (
          <div className="bg-gray-100 p-6 rounded-md shadow-md mt-6">
            <h3 className="text-xl font-semibold text-center text-green-600 mb-4">Bank Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Bank:</p>
                <p className="text-sm font-medium text-gray-800">{va_numbers[0]?.bank}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Virtual Account Number:</p>
                <p className="text-sm font-medium text-gray-800">{va_numbers[0]?.va_number}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 text-center mt-4">No bank details available.</p>
        )}

        {/* Print PDF Button */}
        <div className="text-center mt-8">
          <button
            className="bg-blue-500 text-white py-3 px-8 rounded-full text-xl font-semibold hover:bg-blue-600 focus:outline-none transition-all"
            onClick={generatePDF}
          >
            Print PDF
          </button>
        </div>
      </div>
    </div>
  );
}

