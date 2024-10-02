import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

// definirea tipurilor pentru props
interface CheckoutFormProps {
  totalAmount: number; // totalul comenzii
  onOrderPlaced: () => void; // callback pentru a sterge cosul de cumparaturi
}

const CheckoutForm: FC<CheckoutFormProps> = ({
  totalAmount,
  onOrderPlaced,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Noua stare pentru mesajul de succes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const orderData = {
      name,
      email,
      phone,
      address,
      total_amount: totalAmount,
    };

    try {
      const response = await axios.post(
        "http://localhost/my_project/checkout.php",
        orderData
      );
      console.log("Response from server:", response.data);
      onOrderPlaced();

      setSuccessMessage("Comanda a fost plasată cu succes!");

      // resetam formularul
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error("Eroare la plasarea comenzii:", error);
      setErrorMessage(
        "A apărut o eroare la plasarea comenzii. Te rugăm să încerci din nou."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 w-1/2 m-auto mt-4'>
      {errorMessage && <p className='text-primary'>{errorMessage}</p>}
      {successMessage && (
        <p className='text-primary-foreground'>{successMessage}</p>
      )}

      <div>
        <label htmlFor='name' className='block mb-1'>
          Nume
        </label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nume'
          required
          className='border p-2 w-full'
        />
      </div>
      <div>
        <label htmlFor='email' className='block mb-1'>
          Email
        </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
          className='border p-2 w-full'
        />
      </div>
      <div>
        <label htmlFor='phone' className='block mb-1'>
          Telefon
        </label>
        <input
          type='text'
          id='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Telefon'
          required
          className='border p-2 w-full'
        />
      </div>
      <div>
        <label htmlFor='address' className='block mb-1'>
          Adresă
        </label>
        <input
          type='text'
          id='address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Adresă'
          required
          className='border p-2 w-full'
        />
      </div>
      <p>Total Comandă: {totalAmount} RON</p>
      <Button type='submit' disabled={loading}>
        {loading ? "Se trimite..." : "Trimite comanda"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
