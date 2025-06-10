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

interface SetLimitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  onLimitSet: (category: Category, newLimit: number, newSpent?: number) => void;
}

const formSchema = z.object({
  limit: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().min(0, { message: "Limit must be a positive number." })
  ),
  limitType: z.enum(['monthly', 'yearly']),
  spent: z.preprocess(
    (val) => val === '' ? undefined : parseFloat(String(val)), // Allow empty string for spent, treat as undefined
    z.number().min(0, { message: "Spent amount must be positive." }).optional()
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function SetLimitDialog({ isOpen, onClose, category, onLimitSet }: SetLimitDialogProps) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (category && isOpen) {
      reset({
        limit: category.limit,
        limitType: category.limitType,
        spent: category.spent,
      });
    }
  }, [category, isOpen, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onLimitSet(
        {...category, limitType: data.limitType}, // pass updated category with potentially new limit type
        data.limit, 
        data.spent
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Limit for {category.name}</DialogTitle>
          <DialogDescription>
            Adjust the spending limit and current spent amount for this category.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="limit" className="text-right">New Limit</Label>
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
              <Label htmlFor="spent" className="text-right">Current Spent</Label>
              <Input id="spent" type="number" step="0.01" {...register('spent')} className="col-span-3" placeholder="Leave blank to keep current" />
              {errors.spent && <p className="col-span-4 text-sm text-destructive text-right">{errors.spent.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
