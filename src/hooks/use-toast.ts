
import * as React from "react";
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";

type ToastType = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  onDismiss?: () => void;
}

const TOAST_LIMIT = 7;
const TOAST_REMOVE_DELAY = 1000;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type UseToastType = {
  toasts: ToastType[];
  add: (props: Omit<ToastType, "id">) => string;
  update: (id: string, props: Partial<ToastType>) => void;
  dismiss: (id: string) => void;
  remove: (id: string) => void;
};

const toasts: ToastType[] = [];

const listeners: Array<(toasts: ToastType[]) => void> = [];

function emitChange() {
  listeners.forEach((listener) => {
    listener([...toasts]);
  });
}

export function toast({
  ...props
}: Omit<ToastType, "id">) {
  const id = genId();

  const update = (props: Partial<ToastType>) =>
    updateToast(id, props);
  const dismiss = () => dismissToast(id);

  const newToast: ToastType = {
    id,
    ...props,
  };
  
  toasts.push(newToast);
  emitChange();

  if (toasts.length > TOAST_LIMIT) {
    dismissToast(toasts[0].id);
  }

  return {
    id,
    dismiss,
    update,
  };
}

function updateToast(id: string, props: Partial<ToastType>) {
  const index = toasts.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    toasts[index] = { ...toasts[index], ...props };
    emitChange();
  }
}

function dismissToast(id: string) {
  const index = toasts.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    const toast = toasts[index];
    if (toast.onDismiss) {
      toast.onDismiss();
    }
    setTimeout(() => {
      removeToast(id);
    }, TOAST_REMOVE_DELAY);
  }
}

function removeToast(id: string) {
  const index = toasts.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    toasts.splice(index, 1);
    emitChange();
  }
}

export function useToast(): UseToastType {
  const [state, setState] = React.useState<ToastType[]>(toasts);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    toasts: state,
    add: (props: Omit<ToastType, "id">) => {
      const id = genId();
      toasts.push({ id, ...props });
      emitChange();
      return id;
    },
    update: updateToast,
    dismiss: dismissToast,
    remove: removeToast,
  };
}
