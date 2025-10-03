"use client";

import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category } from '@/types';
import type { LucideIcon } from 'lucide-react';
import { Target } from 'lucide-react';


interface CreateCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySaved: (category: Omit<Category, 'id' | 'spent'> | Category) => void;
  existingCategory?: Category | null;
  icons: { [key: string]: LucideIcon };
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  icon: z.string().min(1, { message: "Please select an icon." }),
  limit: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().min(0, { message: "Limit must be a positive number." })
  ),
  limitType: z.enum(['monthly', 'yearly']),
  color: z.string().optional(), // Optional color for charts
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  name: '',
  icon: 'Target',
  limit: 0,
  limitType: 'monthly',
  color: '',
};

export default function CreateCategoryDialog({ isOpen, onClose, onCategorySaved, existingCategory, icons }: CreateCategoryDialogProps) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: existingCategory ? {
      ...existingCategory,
      icon: typeof existingCategory.icon === 'string' ? existingCategory.icon : 'Target',
    } : defaultValues
  });

  useEffect(() => {
    if (isOpen) {
      if (existingCategory) {
        reset({
          name: existingCategory.name,
          icon: typeof existingCategory.icon === 'string' ? existingCategory.icon : 'Target',
          limit: existingCategory.limit,
          limitType: existingCategory.limitType,
          color: existingCategory.color,
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [existingCategory, isOpen, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (existingCategory) {
      onCategorySaved({ ...existingCategory, ...data, icon: data.icon as keyof typeof icons });
    } else {
      onCategorySaved({ ...data, icon: data.icon as keyof typeof icons });
    }
    onClose();
  };

  const selectedIconName = watch('icon');
  const IconPreview = icons[selectedIconName] || Target;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{existingCategory ? 'Edit' : 'Create'} Category</DialogTitle>
          <DialogDescription>
            {existingCategory ? 'Update the details for your category.' : 'Add a new category to your budget.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" {...register('name')} className="col-span-3" />
              {errors.name && <p className="col-span-4 text-sm text-destructive text-right">{errors.name.message}</p>}
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">Icon</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Select value={selectedIconName} onValueChange={(value) => setValue('icon', value)}>
                  <SelectTrigger className="flex-grow">
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(icons).map(([name, IconComponent]) => (
                      <SelectItem key={name} value={name}>
                        <div className="flex items-center">
                          <IconComponent className="mr-2 h-5 w-5" />
                          {name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <IconPreview className="h-6 w-6 text-primary" />
              </div>
              {errors.icon && <p className="col-span-4 text-sm text-destructive text-right">{errors.icon.message}</p>}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="limit" className="text-right">Limit</Label>
              <Input id="limit" type="number" step="0.01" {...register('limit')} className="col-span-3" />
              {errors.limit && <p className="col-span-4 text-sm text-destructive text-right">{errors.limit.message}</p>}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="limitType" className="text-right">Limit Type</Label>
              <Select value={watch('limitType')} onValueChange={(value) => setValue('limitType', value as 'monthly' | 'yearly')}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select limit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {errors.limitType && <p className="col-span-4 text-sm text-destructive text-right">{errors.limitType.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">Chart Color</Label>
              <Input id="color" type="color" {...register('color')} className="col-span-3 p-1 h-10" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{existingCategory ? 'Save Changes' : 'Create Category'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
