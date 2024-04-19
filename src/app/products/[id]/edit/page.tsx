import productApiRequest from '@/apiRequests/product';
import ProductAddFrom from '@/app/products/_components/product-add-from';
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

  return {
    title: `Edit product ${product.name}`,
    description: product.description,
  };
}

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  let product = null;
  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {!product && <p>Product not found!</p>}
      {product && <ProductAddFrom product={product} />}
    </div>
  );
}
