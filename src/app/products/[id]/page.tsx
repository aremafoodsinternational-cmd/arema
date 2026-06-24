import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  image: string;
  gradient: string;
}

const PRODUCTS_DATA: Record<string, Product> = {
  'matta-rice': {
    id: 'matta-rice',
    name: 'Palakkad Matta Rice',
    category: 'Kerala Heritage',
    tagline: 'The nutrient-dense red-bran heritage grain.',
    description: 'Revered across the Indian subcontinent and its global diaspora, Palakkad Matta Rice (Rosematta) is the signature grain of Kerala. Grown in the dense, nutrient-rich soil of Palakkad, it is parboiled in its husk, which locks in vital nutrients. It retains its red outer bran layer, providing a rich, rustic flavour, chewy texture, and significant dietary fiber, vitamins, and minerals.',
    highlights: [
      'High in dietary fiber',
      'Rich in Magnesium & Vitamin B6',
      'Lower glycemic index',
      'Naturally unpolished red bran'
    ],
    specs: [
      { label: 'Grain Type', value: 'Short-Medium Grain' },
      { label: 'Color', value: 'Deep Red / Rose' },
      { label: 'Milling', value: 'Unpolished (Bran Retained)' },
      { label: 'Processing', value: 'Parboiled' },
      { label: 'Broken percentage', value: 'Max 5%' },
      { label: 'Moisture', value: 'Max 13.5%' },
      { label: 'Packaging available', value: '1kg, 5kg, 10kg, 25kg, 50kg' },
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DBCDC0 100%)',
  },
  'kuruva-rice': {
    id: 'kuruva-rice',
    name: 'Premium Kuruva Rice',
    category: 'Premium Grade',
    tagline: 'Plump, double-boiled short grains for daily dining.',
    description: 'Premium Kuruva Rice is a popular short-grain variety cherished for its soft, plump texture upon cooking. Sourced directly from local farmers in Palakkad, our Kuruva rice undergoes advanced double-boiling, ensuring that the grains remain non-sticky, easily digestible, and rich in natural nutrients. It is the perfect companion for traditional meals, curries, and daily South Indian dishes.',
    highlights: [
      'Soft and plump texture',
      'Double boiled for digestive ease',
      'Non-sticky grains',
      '100% natural, chemical-free processing'
    ],
    specs: [
      { label: 'Grain Type', value: 'Plump Short Grain' },
      { label: 'Color', value: 'Pristine White' },
      { label: 'Milling', value: 'Double Polished' },
      { label: 'Processing', value: 'Double Boiled' },
      { label: 'Broken percentage', value: 'Max 3%' },
      { label: 'Moisture', value: 'Max 13%' },
      { label: 'Packaging available', value: '5kg, 10kg, 25kg, 50kg' },
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #CDD2D5 100%)',
  },
  'aromatic-rice': {
    id: 'aromatic-rice',
    name: 'Jeerakasala Rice',
    category: 'Aromatic Collection',
    tagline: 'Naturally fragrant grains perfect for festive cooking.',
    description: 'Jeerakasala (also known as Kaima) is a premium, highly aromatic short-grain rice cultivated with utmost precision. Known for its small, slender grain size resembling cumin seeds (Jeera), this rice releases an intoxicating natural aroma when cooked. It is the preferred rice variety for Malabar Biryani, ghee rice, and rich festive preparations where scent and texture define the dish.',
    highlights: [
      'Exquisite natural fragrance',
      'Slender, non-sticky short grain',
      'Perfect for Biryani & Ghee Rice',
      'Aged to perfection for dry cooking'
    ],
    specs: [
      { label: 'Grain Type', value: 'Slender Short Grain' },
      { label: 'Color', value: 'Light Cream' },
      { label: 'Milling', value: 'Polished Aromatic Grade' },
      { label: 'Processing', value: 'Raw / Aged' },
      { label: 'Broken percentage', value: 'Max 2%' },
      { label: 'Moisture', value: 'Max 12.5%' },
      { label: 'Packaging available', value: '1kg, 5kg, 25kg' },
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DFD5C0 100%)',
  },
  'biryani-rice': {
    id: 'biryani-rice',
    name: 'Malabar Biryani Rice',
    category: 'Aromatic Collection',
    tagline: 'Superfine aged grains bringing authentic scent to Malabar Biryani.',
    description: 'Malabar Biryani Rice (specifically superfine Kaima / Jeerakasala) is aged to perfection. Sourced from organic heritage crop networks, each grain is milled to retain its natural essential oils. The short, thin grains absorb spices and ghee deeply, ensuring your signature Biryani is exceptionally flavorful and fragrant.',
    highlights: [
      'Superfine slender grain',
      'Naturally aged for 12 months',
      'High spice and fat absorption',
      'Authentic Malabar flavor'
    ],
    specs: [
      { label: 'Grain Type', value: 'Slender Short Grain' },
      { label: 'Color', value: 'Light Cream' },
      { label: 'Age', value: '12 Months+ (Aged)' },
      { label: 'Milling', value: 'Polished Aromatic Grade' },
      { label: 'Broken percentage', value: 'Max 2%' },
      { label: 'Moisture', value: 'Max 12.5%' },
      { label: 'Packaging available', value: '1kg, 5kg, 25kg' },
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DFD0BF 100%)',
  },
  'navara-rice': {
    id: 'navara-rice',
    name: 'Traditional Navara Rice',
    category: 'Medicinal & Heritage',
    tagline: 'Revered ancient grain of Kerala used in traditional health systems.',
    description: 'Navara Rice is a unique organic heritage grain native to Kerala, celebrated for its therapeutic and nutritional value in traditional health systems. Highly rich in antioxidants, proteins, and essential minerals, this short grain is traditionally used for preparing nourishing gruels, health broths, and authentic wellness treatments.',
    highlights: [
      'Rich in natural antioxidants',
      'Highly nutritive & digestible',
      'Traditional wellness grain',
      'Naturally red-bran unpolished'
    ],
    specs: [
      { label: 'Grain Type', value: 'Plump Short Grain' },
      { label: 'Bran', value: '100% Red Bran (Unpolished)' },
      { label: 'Processing', value: 'Raw / Semi-parboiled' },
      { label: 'Broken percentage', value: 'Max 5%' },
      { label: 'Moisture', value: 'Max 13.5%' },
      { label: 'Packaging available', value: '500g, 1kg, 5kg' },
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #C8D1C4 100%)',
  },
  'gandhakasala-rice': {
    id: 'gandhakasala-rice',
    name: 'Gandhakasala Rice',
    category: 'Specialty Aromatic',
    tagline: 'Rare aromatic variety from Wayanad and Palakkad hills.',
    description: 'Gandhakasala Rice is a rare, GI-tagged specialty aromatic rice cultivated in the highland valleys. Known for its distinct, sweet-scented fragrance and rich nutritional composition, this superfine grain makes any meal a celebration. It is traditionally parboiled or milled raw to retain its unique highland terroir aroma.',
    highlights: [
      'GI-tagged highland heritage crop',
      'Intense sweet fragrance',
      'Rich in proteins & minerals',
      'Superfine delicate grain'
    ],
    specs: [
      { label: 'Grain Type', value: 'Superfine Short Grain' },
      { label: 'Color', value: 'Off-White / Cream' },
      { label: 'Milling', value: 'Semi-Polished' },
      { label: 'Broken percentage', value: 'Max 3%' },
      { label: 'Moisture', value: 'Max 13%' },
      { label: 'Packaging available', value: '1kg, 5kg, 10kg, 25kg' },
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #C4CDD1 100%)',
  },
  'jyothi-matta': {
    id: 'jyothi-matta',
    name: 'Jyothi Matta Rice',
    category: 'Kerala Heritage',
    tagline: 'The Nutrition King - high fiber, red bran, and diabetic-friendly.',
    description: 'Known for its excellent cooking quality and soft texture, Jyothi Matta is rich in essential nutrients and antioxidants found in the red bran layer. It is a premium everyday health rice.',
    highlights: [
      'High in dietary fiber & red bran',
      'Diabetic-friendly everyday health rice',
      'Excellent cooking quality & soft texture',
      'Rich in essential nutrients & antioxidants'
    ],
    specs: [
      { label: 'Grain Type', value: 'Premium Jyothi Matta rice' },
      { label: 'Grain Size', value: 'Short Grain' },
      { label: 'Cooking Time', value: '45 - 60 minutes' },
      { label: 'Shelf Life', value: '12 months' },
      { label: 'Packaging available', value: '1kg, 5kg, 10kg' }
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DBCDC0 100%)',
  },
  'uma-matta': {
    id: 'uma-matta',
    name: 'Uma Matta Rice',
    category: 'Kerala Heritage',
    tagline: 'Easy Digest - light on stomach, quick cooking, and kid-friendly.',
    description: 'An easy-to-digest Matta rice variety that is light on the stomach and quick to cook. Perfect for daily consumption, especially suitable for children and elderly family members.',
    highlights: [
      'Light on the stomach & easy to digest',
      'Quick to cook (15-20 mins)',
      'Ideal for children & elderly members',
      'Perfect for daily entry-level cooking'
    ],
    specs: [
      { label: 'Grain Type', value: 'Easy-digest Matta rice' },
      { label: 'Grain Size', value: 'Medium to long grain' },
      { label: 'Cooking Time', value: '15 - 20 minutes' },
      { label: 'Packaging available', value: '1kg, 5kg, 10kg' }
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DBCDC0 100%)',
  },
  'kanjana-matta': {
    id: 'kanjana-matta',
    name: 'Kanjana Matta (Vadi Matta)',
    category: 'Kerala Heritage',
    tagline: 'Golden Premium - golden-red, aromatic long grains for festive dining.',
    description: 'A premium long-grain Matta variety characterized by its golden-red color and delicate aroma. Highly preferred for festive occasions, premium dining, and restaurant/hotel-grade usage.',
    highlights: [
      'Premium golden-red color',
      'Aromatic long grain',
      'Restaurant & hotel grade quality',
      'Perfect for festive occasions & premium dining'
    ],
    specs: [
      { label: 'Grain Type', value: 'Long-grain Matta rice' },
      { label: 'Grain Size', value: 'Bold Grain' },
      { label: 'Cooking Time', value: '20 - 25 minutes' },
      { label: 'Packaging available', value: '1kg, 5kg' }
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DBCDC0 100%)',
  },
  'chitteni-matta': {
    id: 'chitteni-matta',
    name: 'Chitteni Matta (Aryan)',
    category: 'Kerala Heritage',
    tagline: 'Aromatic Premium - highest fiber among Matta with a bold nutty taste.',
    description: 'Boasting the highest fiber content among all Matta varieties, Chitteni Matta (Aryan) has a bold, nutty taste. It is highly recommended for diet plans, health food stores, and health-conscious individuals.',
    highlights: [
      'Highest fiber content among Matta varieties',
      'Distinct bold, nutty taste',
      'Best choice for health-conscious diets',
      'Sourced for wellness & organic food stores'
    ],
    specs: [
      { label: 'Grain Type', value: 'Premium Matta rice' },
      { label: 'Grain Size', value: 'Medium Grain' },
      { label: 'Cooking Time', value: '30 - 35 minutes' },
      { label: 'Packaging available', value: '1kg, 5kg, 10kg' }
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DBCDC0 100%)',
  },
  'ast-white-rice': {
    id: 'ast-white-rice',
    name: 'AST White Rice',
    category: 'Premium Grade',
    tagline: 'Aromatic Premium - natural aroma, quick cooking, and fluffy grains.',
    description: 'A natural aromatic white rice that cooks quickly and produces beautiful, fluffy uniform grains. An export favorite, ideal for daily meals, curries, fried rice, and premium family dining.',
    highlights: [
      'Natural enticing aroma',
      'Quick cooking & perfectly fluffy',
      'Uniform medium length grains',
      'Global export favorite'
    ],
    specs: [
      { label: 'Grain Type', value: 'Medium-grain white rice' },
      { label: 'Grain Size', value: 'Medium length, Uniform grains' },
      { label: 'Cooking Time', value: '15 - 20 minutes' },
      { label: 'Packaging available', value: '1kg, 5kg' }
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #CDD2D5 100%)',
  },
  'puttu-podi': {
    id: 'puttu-podi',
    name: 'Premium Puttu Podi',
    category: 'Value Added Products',
    tagline: 'Traditional Kerala breakfast in just 5 minutes - just add water.',
    description: 'Made from premium roasted rice flour with zero raw smell. It is free-flowing, lump-free, healthy, and fiber-rich, preserving the authentic traditional taste of Kerala\'s favorite breakfast.',
    highlights: [
      'Breakfast ready in 5 minutes (just add water)',
      'Roasted rice flour with zero raw smell',
      'Free-flowing & lump-free texture',
      'Healthy, fiber-rich, and authentic taste'
    ],
    specs: [
      { label: 'Product Type', value: 'Roasted rice flour (Puttu Podi)' },
      { label: 'Shelf Life', value: '9 months' },
      { label: 'Ingredients', value: '100% Roasted Rice' },
      { label: 'Best Suited For', value: 'Daily traditional breakfast' }
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DFD5C0 100%)',
  },
  'idiyappam-podi': {
    id: 'idiyappam-podi',
    name: 'Premium Idiyappam Podi',
    category: 'Value Added Products',
    tagline: 'For lighter, softer, and melt-in-the-mouth Idiyappams.',
    description: 'High-quality rice flour made with zero tapioca, zero maida, and zero raw smell. Preservative-free and fiber-rich, it yields perfectly textured, soft Idiyappams.',
    highlights: [
      'Softest, melt-in-the-mouth texture',
      '0% Tapioca, 0% Maida, 0% Raw Smell',
      'Preservative-free & fiber-rich',
      'Diabetic-friendly & kids-tiffin approved'
    ],
    specs: [
      { label: 'Product Type', value: 'Specialty rice flour (Idiyappam Podi)' },
      { label: 'Additives', value: 'None (Preservative-free)' },
      { label: 'Best Suited For', value: 'Idiyappam, Kozhukkatta, Ela Ada' }
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DFD0BF 100%)',
  },
  'pathiri-podi': {
    id: 'pathiri-podi',
    name: 'Premium Pathiri Podi',
    category: 'Value Added Products',
    tagline: 'Ultra-fine roasted rice flour for paper-thin Pathiris.',
    description: 'An ultra-fine roasted rice flour sourced from paddy grown in the fertile Bharathapuzha basin. Naturally fiber-rich and easy to digest compared to maida pathiris, with zero percent maida.',
    highlights: [
      'Ultra-fine texture for paper-thin pathiris',
      'Sourced from Bharathapuzha basin paddy',
      '0% Maida — 100% healthy rice',
      'Easy to digest and fiber-rich'
    ],
    specs: [
      { label: 'Product Type', value: 'Ultra-fine roasted rice flour (Pathiri Podi)' },
      { label: 'Grain Source', value: 'Bharathapuzha Basin' },
      { label: 'Best Suited For', value: 'Traditional Pathiri, Ari Pathiri' }
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #C8D1C4 100%)',
  },
  'kondattam': {
    id: 'kondattam',
    name: 'Premium Kerala Kondattam',
    category: 'Value Added Products',
    tagline: 'Sun-dried preserves with 0% chemicals, keeping traditional wisdom alive.',
    description: 'Sun-dried vegetable and rice preserves made using ancient preservation methods. Free of artificial colors, preservatives, or additives. Light-weight and extremely crisp when fried.',
    highlights: [
      'Sun-dried with 0% chemicals or additives',
      'Authentic traditional Kerala recipe',
      'Extremely crisp and flavorful when fried',
      'Perfect side for Kanji (rice gruel) or curries'
    ],
    specs: [
      { label: 'Product Type', value: 'Sun-dried preserves (Kondattam)' },
      { label: 'Varieties', value: 'Ari, Mulak, Pavakka, Payar, Vazhapindi, Vendakka' },
      { label: 'Preservation', value: '100% Natural Sun-dried' },
      { label: 'Additives', value: 'None (0% artificial colors/preservatives)' }
    ],
    image: '/images/product-bag-nobg.png',
    gradient: 'linear-gradient(135deg, #ECEAE6 0%, #C4CDD1 100%)',
  },
};

export async function generateStaticParams() {
  return [
    { id: 'matta-rice' },
    { id: 'kuruva-rice' },
    { id: 'aromatic-rice' },
    { id: 'biryani-rice' },
    { id: 'navara-rice' },
    { id: 'gandhakasala-rice' },
    { id: 'jyothi-matta' },
    { id: 'uma-matta' },
    { id: 'kanjana-matta' },
    { id: 'chitteni-matta' },
    { id: 'ast-white-rice' },
    { id: 'puttu-podi' },
    { id: 'idiyappam-podi' },
    { id: 'pathiri-podi' },
    { id: 'kondattam' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  let product = PRODUCTS_DATA[id];

  if (!product) {
    try {
      const { data: dbProd } = await supabase.from('products').select('*').eq('id', id).single();
      if (dbProd) {
        const { data: dbTrans } = await supabase.from('product_translations').select('*').eq('product_id', id).eq('lang', 'en').single();
        if (dbTrans) {
          product = {
            id: dbProd.id,
            name: dbTrans.name,
            category: dbTrans.category,
            tagline: dbTrans.tagline,
            description: dbTrans.description,
            highlights: dbTrans.highlights || [],
            specs: dbTrans.specs || [],
            image: dbProd.image_url,
            gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DBCDC0 100%)',
          };
        }
      }
    } catch (e) {}
  }

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Arema Foods`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product = PRODUCTS_DATA[id];

  if (!product) {
    try {
      const { data: dbProd } = await supabase.from('products').select('*').eq('id', id).single();
      if (dbProd) {
        const { data: dbTrans } = await supabase.from('product_translations').select('*').eq('product_id', id).eq('lang', 'en').single();
        if (dbTrans) {
          product = {
            id: dbProd.id,
            name: dbTrans.name,
            category: dbTrans.category,
            tagline: dbTrans.tagline,
            description: dbTrans.description,
            highlights: dbTrans.highlights || [],
            specs: dbTrans.specs || [],
            image: dbProd.image_url,
            gradient: 'linear-gradient(135deg, #ECEAE6 0%, #DBCDC0 100%)',
          };
        }
      }
    } catch (e) {}
  }

  if (!product) {
    notFound();
  }

  // Get other products for recommendation (limit to 2 related products)
  const otherProducts = Object.values(PRODUCTS_DATA)
    .filter((p) => p.id !== id)
    .slice(0, 2);

  return (
    <ProductDetailClient product={product} otherProducts={otherProducts} />
  );
}
