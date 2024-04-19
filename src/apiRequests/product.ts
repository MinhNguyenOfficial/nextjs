import http from '@/lib/http';
import { MessageResType } from '@/schemaValidations/common.schema';
import {
  CreateProductBodyType,
  ProductResType,
  UpdateProductBodyType,
} from '@/schemaValidations/product.schema';

export const productApiRequest = {
  getList: () =>
    http.get('/products', {
      cache: 'no-store',
    }),
  getDetail: (id: number) =>
    http.get<ProductResType>(`/products/${id}`, {
      cache: 'no-store',
    }),
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>('/products', body),
  update: (id: number, body: UpdateProductBodyType) =>
    http.put<ProductResType>(`/products/${id}`, body),
  uploadImage: (body: FormData) =>
    http.post<{
      message: string;
      data: string;
    }>('/media/upload', body),
  delete: (id: number) => http.delete<MessageResType>(`/products/${id}`),
};

export default productApiRequest;
