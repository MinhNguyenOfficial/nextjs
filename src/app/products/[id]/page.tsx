import productApiRequest from '@/apiRequests/product';
import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react';

const getDetail = cache(productApiRequest.getDetail);

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { payload } = await getDetail(Number(params.id));
  const product = payload.data;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: 'https://nextjs.org',
      siteName: 'Next.js',
      images: [
        {
          url: product.image,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function ProductDetail({ params, searchParams }: Props) {
  let product = null;
  try {
    const { payload } = await getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      {!product && <p>Product not found!</p>}
      {product && (
        <div>
          <div key={product.id} className="flex gap-4">
            <div>
              <Image
                src={product.image}
                alt={product.name}
                height={180}
                width={180}
                className="w-32 h-32 object-cover"
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
