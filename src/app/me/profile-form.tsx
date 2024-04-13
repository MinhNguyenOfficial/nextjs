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
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from '@/schemaValidations/account.schema';
import accountApiResquest from '@/apiRequests/account';

type Profile = AccountResType['data'];

export default function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
    },
  });

  async function onSubmit(values: UpdateMeBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await accountApiResquest.updateMe(values);

      toast({
        description: result.payload.message,
      });

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
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" value={profile.email} readOnly />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-8">
          <Button className="w-full" type="submit" disabled={loading}>
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
