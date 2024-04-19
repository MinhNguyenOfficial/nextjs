'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';
import { useToast } from '@/components/ui/use-toast';
import authApiRequest from '@/apiRequests/auth';
import { useRouter } from 'next/navigation';
import { clientSessionToken } from '@/lib/http';
import { handleErrorApi } from '@/lib/utils';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.login(values);

      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
        expiresAt: result.payload.data.expiresAt,
      });

      toast({
        description: result.payload.message,
      });

      clientSessionToken.value = result.payload.data.token;
      router.push('/');
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-[600px]"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  formNoValidate
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-8">
          <Button className="w-full" type="submit" disabled={loading}>
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
