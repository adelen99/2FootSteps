-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2024 at 06:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Încălțăminte de alergat'),
(2, 'Streetwear'),
(3, 'Sport');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `customer_address` varchar(255) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `customer_email`, `customer_phone`, `customer_address`, `order_date`, `total_amount`) VALUES
(1, 'Adelin Lupu', 'lupuadelin4@gmail.com', '12-85-120851-208', 'Str Principala, Nr 149', '2024-09-27 17:48:47', 0.00),
(2, 'Adelin Lupu', 'lupuadelin4@gmail.com', '01725017250127', 'Str Principala, Nr 149', '2024-09-27 17:49:17', 113.00),
(3, 'Sebastian Muresan', 'sebastianmuresan@gmail.com', '0755555555', 'Cluj', '2024-09-27 18:14:24', 255.00),
(4, 'Tania Popescu', 'taniapopescu@gmail.com', '0722 333 444', 'Cluj-Napoca', '2024-09-27 18:39:02', 180.00),
(5, 'Sergiu Lupu', 'sergiulupu92@yahoo.com', '0773 986 773', 'Dej', '2024-09-27 18:40:49', 208.00),
(6, 'Sergiu Popescu', 'sergiupopescu@yahoo.com', '0777 888 999', 'Gherla', '2024-09-27 18:47:49', 90.00),
(7, 'Bogdan Pop', 'b.pop@gmail.com', '0743 878 939', 'Sibiu', '2024-09-27 18:50:28', 225.00),
(8, 'Radu Lupu', 'radulupu@gmail.com', '0755 442 331', 'Dej', '2024-09-27 18:53:45', 77.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `is_taxable` tinyint(1) NOT NULL DEFAULT 0,
  `img_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `is_taxable`, `img_url`) VALUES
(1, 'Nike Air Jordan 1', 'Nike Air Jordan 1 – Încălțările legendare care au redefinit stilul pe terenul de baschet și în cultura streetwear. Cu un design clasic și inovator, aceste adidași îmbină confortul superior cu o estetică rafinată, având detalii iconice și o paletă de culori variată. Fie că te pregătești pentru antrenament sau vrei să adaugi un plus de stil ținutei tale zilnice, Nike Air Jordan 1 sunt alegerea perfectă. Cumpără acum și experimentează senzația de a purta un simbol al stilului și performanței!', 90.00, 0, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/NikeAirJordan1/AJ1TravisScott1.jpg'),
(2, 'Nike Air Force 1', 'Nike Air Force 1 – Încălțările iconice care au marcat istoria modei și a sportului. Acest model clasic, lansat pentru prima dată în 1982, combină un design simplu și elegant cu o construcție durabilă, oferind confort pe parcursul întregii zile. Cu o siluetă versatilă, Nike Air Force 1 se potrivește perfect cu orice ținută, de la casual la elegantă. Disponibile într-o gamă variată de culori și stiluri, aceste adidași sunt esențiali pentru orice iubitor de modă. Alege Nike Air Force 1 pentru a adăuga un strop de istorie și stil garderobei tale!', 85.00, 0, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/nike_af1.png'),
(3, 'Nike Dunk Low', 'Nike Dunk Low – O combinație perfectă de stil și confort, Nike Dunk Low reprezintă esența culturii streetwear și a baschetului. Cu o siluetă joasă și un design elegant, acești adidași sunt ideali pentru orice ocazie, fie că te afli pe terenul de baschet sau pe străzile orașului. Construiți cu materiale de calitate superioară și disponibile într-o gamă variată de culori și combinații, Nike Dunk Low oferă nu doar un aspect modern, ci și confortul necesar pentru utilizarea zilnică. Alege Nike Dunk Low pentru a-ți exprima stilul personal și a te bucura de un look fresh, mereu la modă!', 95.00, 1, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/NikeDunkLow/panda1.jpg'),
(4, 'Nike Air Max 270', 'Nike Air Max 270 – Confort și stil se îmbină perfect în acest model iconic. Inspirat de tradiția Nike în tehnologia Air, Air Max 270 se remarcă prin unitatea de aer de mari dimensiuni, oferind o amortizare excepțională și un suport de lungă durată. Cu un design modern și o gamă variată de culori, acești adidași sunt ideali pentru cei care doresc să îmbine stilul cu performanța. Materialele ușoare și respirabile asigură confort pe tot parcursul zilei, fie că te afli în oraș, la sală sau pur și simplu te bucuri de o plimbare. Alege Nike Air Max 270 pentru un look fresh și un confort de neegalat!', 120.00, 1, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/NikeDunkLow/nike_am-270.png'),
(5, 'Nike React Infinity Run', 'Nike React Infinity Run – Fiecare pas devine o experiență de alergare unică cu Nike React Infinity Run. Acest model inovator este conceput pentru a oferi un echilibru perfect între confort, amortizare și suport. Tehnologia React asigură o amortizare moale, dar responsivă, reducând riscul de accidentare, în timp ce partea superioară din plasă respirabilă permite o ventilație excelentă. Designul său modern și elegant se potrivește perfect atât în timpul antrenamentelor intense, cât și în viața de zi cu zi. Fie că ești un alergător experimentat sau abia începi, Nike React Infinity Run te va însoți cu stil și confort pe orice distanță.', 110.00, 0, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/NikeDunkLow/nike_reactInfinity.jfif'),
(6, 'Nike Air Presto', 'Nike Air Presto – Adaugă un strop de confort și stil în garderoba ta cu Nike Air Presto, un model iconic ce combină inovația cu un design minimalist. Cunoscuți drept \'t-shirt pentru picioare\', acești pantofi sunt extrem de versatili și ușor de purtat, oferind o senzație de strângere perfectă datorită sistemului de ajustare elastic. Partea superioară din plasă asigură respirabilitate și confort pe tot parcursul zilei, iar unitatea de amortizare Air Sole îți oferă suportul de care ai nevoie. Fie că alegi să-i porți la sală sau în oraș, Nike Air Presto îți va oferi o experiență de purtare remarcabilă, fiind alegerea ideală pentru cei care apreciază confortul și stilul.', 70.00, 1, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/nike_air-presto.png'),
(7, 'Nike Blazer Mid', 'Nike Blazer Mid – Întoarce-te la rădăcinile stilului urban cu Nike Blazer Mid, un pantof clasic cu un aspect atemporal. Inspirat de baschetul din anii \'70, acest model reînvie eleganța retro și este perfect pentru a fi purtat atât pe teren, cât și în oraș. Cu o siluetă înaltă care oferă suport suplimentar gleznei, Nike Blazer Mid combină pielea de calitate superioară cu detalii moderne, asigurând atât durabilitate, cât și confort. Talpa din cauciuc oferă aderență excelentă, iar designul său minimalist îl face ușor de asortat cu orice ținută. Fie că alegi să-l porți cu blugi, fuste sau pantaloni scurți, Nike Blazer Mid este alegerea ideală pentru cei care doresc să îmbine confortul cu un stil distinctiv.', 75.00, 0, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/nike_blazer-mid.png'),
(8, 'Nike Court Vision Low', 'Nike Court Vision Low – Inspirat de stilul clasic al baschetului, Nike Court Vision Low aduce un suflu retro în garderoba ta. Cu o siluetă elegantă și o construcție din piele sintetică de calitate superioară, acești pantofi oferă atât confort, cât și durabilitate. Designul său minimalist, completat de detalii subtile, îi face versatili, potriviți atât pentru antrenamente, cât și pentru purtarea zilnică. Talpa din cauciuc asigură aderență excelentă pe diferite suprafețe, iar perna interioară îți va oferi sprijinul necesar pe parcursul întregii zile. Fie că îi porți cu pantaloni sport sau cu o ținută casual, Nike Court Vision Low este alegerea perfectă pentru cei care doresc să îmbine stilul clasic cu confortul modern.', 65.00, 1, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/nike_court-vision.png'),
(9, 'Nike Air Max 90', 'Nike Air Max 90 – O emblemă a stilului urban, Nike Air Max 90 îmbină confortul desăvârșit cu un design iconic. Cu linia sa distinctivă și unitatea de aer vizibilă în talpă, acest model oferă o experiență de mers moale și amortizată, ideală pentru fiecare zi. Construit din materiale premium, Air Max 90 asigură durabilitate și suport, în timp ce detaliile reflectorizante adaugă un plus de stil și vizibilitate. Fie că alegi să-i porți la o sesiune de alergare sau într-o ieșire casual, acești pantofi sunt o alegere perfectă pentru a-ți completa ținuta, combinând eleganța retro cu confortul modern. Adaugă un strop de atitudine și originalitate în garderoba ta cu Nike Air Max 90!', 99.00, 0, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/nike_air-max-90.png'),
(10, 'Nike Free RN 5.0', 'Nike Free RN 5.0 – Descoperă libertatea mișcării cu Nike Free RN 5.0, un pantof de alergare conceput pentru cei care apreciază confortul și flexibilitatea. Cu un design minimalist și o talpă inovatoare care permite o gamă largă de mișcare, acest model îți oferă senzația de a alerga desculț, fără a compromite suportul necesar. Materialele ușoare și respirabile asigură o ventilație optimă, menținându-ți picioarele proaspete și confortabile în timpul antrenamentelor. Fie că te pregătești pentru o sesiune intensă de alergare sau pur și simplu vrei să te bucuri de o plimbare, Nike Free RN 5.0 îți oferă o experiență naturală și plăcută. Alege să te miști liber și cu stil!', 80.00, 1, 'https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/nike_free-rn.png');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `product_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`product_id`, `category_id`) VALUES
(1, 2),
(1, 3),
(2, 2),
(2, 3),
(3, 2),
(3, 3),
(4, 1),
(5, 1),
(6, 1),
(7, 2),
(7, 3),
(8, 2),
(9, 1),
(10, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
