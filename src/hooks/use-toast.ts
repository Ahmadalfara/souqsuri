
import { type ToastProps } from "@/components/ui/toast"
import { 
  useToast as useToastPrimitive,
  toast as toastPrimitive,
  type ToasterToast
} from "@/hooks/use-toast-primitive"

export const useToast = useToastPrimitive
export const toast = toastPrimitive

export type { ToasterToast, ToastProps }
