import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(1, "Numele este obligatoriu"),
  email: z.string().email("Introduceți un email valid"),
  phone: z.string().min(10, "Telefonul trebuie să aibă cel puțin 10 caractere"),
  address: z.string().min(1, "Adresa este obligatorie"),
  total_amount: z
    .number()
    .min(0, "Totalul comenzii trebuie să fie un număr valid"),
});
