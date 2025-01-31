import { Outlet } from "react-router-dom";
import { Bot, User } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="w-screen h-screen flex bg-[var(--background)]">
      <div className="w-1/20 flex flex-col justify-between items-center p-8">
        <div className="flex flex-col items-center gap-6">
          <div>
            <div className="w-12 h-12 bg-neutral-600 rounded-full"></div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded flex items-center justify-center bg-purple-100 text-[var(--primary)] p-2 cursor-pointer">
              <Bot size={20} />
            </div>
          </div>
        </div>
        <div>
          <div className="w-12 h-12 bg-neutral-200 rounded-full flex justify-center items-center p-2 text-neutral-600 cursor-not-allowed">
            <User size={20} />
          </div>
        </div>
      </div>
      <div className="w-full border rounded-xl m-4 p-6 bg-[var(--muted)]">
        <Outlet />
      </div>
    </div>
  );
}
