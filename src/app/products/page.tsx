import productApiRequest from '@/apiRequests/product';
import DeleteProduct from '@/app/products/_components/delete-product';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductListPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const isAuthenticated = Boolean(sessionToken);
  const { payload } = (await productApiRequest.getList()) as any;
  const productList = payload.data;
  return (
    <div className="space-y-3">
      <h1>Product list</h1>
      {isAuthenticated && (
        <Link href={'/products/add'}>
          <Button variant={'secondary'}>Add Product</Button>
        </Link>
      )}
      <div className="space-y-5">
        {productList.map((product: any) => (
          <div key={product.id} className="flex gap-4">
            <div>
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  height={180}
                  width={180}
                  className="w-32 h-32 object-cover"
                />
              </Link>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              {isAuthenticated && (
                <div className="flex space-x-2">
                  <Link href={`products/${product.id}/edit`}>
                    <Button variant={'outline'}>Edit</Button>
                  </Link>
                  <DeleteProduct product={product} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
