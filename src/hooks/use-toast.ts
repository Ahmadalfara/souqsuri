
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  useToast as useToastOriginal,
  toast as toastOriginal,
} from "@/components/ui/toaster";

export type ToasterToast = Toast & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  className?: string;
};

export const useToast = useToastOriginal;
export const toast = toastOriginal;

export type { ToastProps };
