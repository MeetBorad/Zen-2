import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { TASKS } from "@/data/cc";

type TaskCtx = {
  done: Record<string, boolean>;
  toggle: (id: string) => void;
  completed: number;
  total: number;
  reset: () => void;
};

const Ctx = createContext<TaskCtx | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const value = useMemo<TaskCtx>(
    () => ({
      done,
      toggle: (id) => setDone((d) => ({ ...d, [id]: !d[id] })),
      completed: TASKS.filter((t) => done[t.id]).length,
      total: TASKS.length,
      reset: () => setDone({}),
    }),
    [done],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTasks() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}
