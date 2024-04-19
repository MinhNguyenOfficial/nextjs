'use client';

import { Button } from '@/components/ui/button';
import { ProductResType } from '@/schemaValidations/product.schema';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import productApiRequest from '@/apiRequests/product';
import { handleErrorApi } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

type Product = ProductResType['data'];

export default function DeleteProduct({ product }: { product: Product }) {
  const { toast } = useToast();
  const router = useRouter();
  const deleteProduct = async () => {
    try {
      const result = await productApiRequest.delete(product.id);
      toast({
        description: result.payload.message,
      });
      router.refresh();
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={'destructive'}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you want to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              Product &quot;{product.name}&quot; will be permanently delete!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
