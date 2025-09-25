// app/products/[productId]/page.tsx
import Head from 'next/head';
import ProductDetailContent from '@/components/ProductDetailContent';

// Utility function for API calls with retry logic
async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      if (data.status === 'error') {
        throw new Error(data.message || 'API returned an error');
      }
      return data;
    } catch (err) {
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw err;
    }
  }
}

async function fetchProduct(productId: string) {
  try {
    return await fetchWithRetry(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/`);
  } catch (err) {
    console.error(`Failed to fetch product ${productId}:`, err);
    return null;
  }
}

async function fetchAttributes(productId: string) {
  try {
    const data = await fetchWithRetry(`${process.env.NEXT_PUBLIC_node_URL}/attributes/${productId}`);
    return data.attributes || null;
  } catch (err) {
    console.error(`Failed to fetch attributes for product ${productId}:`, err);
    return null;
  }
}

async function fetchPrice(productId: string) {
  try {
    const data = await fetchWithRetry(`${process.env.NEXT_PUBLIC_API_URL}/api/PricesView/?product_ids=${productId}`);
    return data.data[productId] || null;
  } catch (err) {
    console.error(`Failed to fetch price for product ${productId}:`, err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }) {
  const resolvedParams = await params; // Await params to resolve the Promise
  const productId = resolvedParams.productId;
  const product = await fetchProduct(productId);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
      robots: 'noindex',
    };
  }

  return {
    title: `${product.name} - Product Details`,
    description: product.description || 'Explore this product and its specifications.',
    robots: 'index, follow',
    openGraph: {
      title: product.name,
      description: product.description || 'Product description goes here.',
      images: product.image ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}` : '/public/large_on_black.jpg',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.id}`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
  const resolvedParams = await params; // Await params to resolve the Promise
  const productId = resolvedParams.productId;
  let product = null;
  let attributes = null;
  let price = null;
  let error = null;

  try {
    product = await fetchProduct(productId);
    if (!product) {
      error = 'Product not found.';
    } else {
      attributes = await fetchAttributes(productId);
      price = await fetchPrice(productId);
    }
  } catch (err) {
    error = 'Error loading product details. Please try again later.';
    console.error('Error in ProductDetailPage:', err);
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-red-500 text-lg">{error}</p>
        <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to Home
        </a>
      </div>
    );
  }

  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}` : '/public/large_on_black.jpg',
    description: product.description || 'No description available.',
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.category?.name || 'Unknown Brand',
    },
  };

  if (price !== null) {
    structuredData.offers = {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.id}`,
      priceCurrency: 'USD',
      price: price.toFixed(2),
      priceValidUntil: '2025-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    };
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div className="container mx-auto px-4 py-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
        <ProductDetailContent product={product} attributes={attributes} price={price} />
      </div>
    </>
  );
}
