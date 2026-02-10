import * as React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "./utils";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

const variantConfig = {
  default: {
    icon: Info,
    className: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
    iconClassName: "text-gray-600 dark:text-gray-400",
  },
  success: {
    icon: CheckCircle,
    className: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    iconClassName: "text-green-600 dark:text-green-400",
  },
  error: {
    icon: AlertCircle,
    className: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
    iconClassName: "text-red-600 dark:text-red-400",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
    iconClassName: "text-orange-600 dark:text-orange-400",
  },
  info: {
    icon: Info,
    className: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    iconClassName: "text-blue-600 dark:text-blue-400",
  },
};

export function Toast({
  title,
  description,
  variant = "default",
  onClose,
}: Omit<ToastProps, "id">) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "pointer-events-auto flex w-full max-w-md gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-sm transition-all animate-in slide-in-from-right-full",
        config.className
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconClassName)} />
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </p>
        )}
        {description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastProps, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const showToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(7);
    const duration = toast.duration || 5000;

    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const closeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-0 right-0 z-[9999] flex flex-col gap-3 p-4 sm:p-6 max-w-full">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            onClose={() => closeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
