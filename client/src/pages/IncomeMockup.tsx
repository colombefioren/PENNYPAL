import { Plus } from "lucide-react";

const IncomeMockup = () => {
  return (
    <>
      <div className="relative z-2 bg-gray-100/10 backdrop-blur-2xl rounded-xl flex flex-col items-center justify-center mx-25 text-white mt-30">
        <div className="flex w-full justify-between items-center border-b-2 border-b-gray-200 px-20 py-4">
          <h1 className="font-bold text-4xl">Incomes</h1>
          <div className="flex gap-10 items-center justify-center">
            <div className="text-2xl">More Actions</div>
            <button className="py-4 px-8 cursor-pointer hover:bg-green-700 transition-colors font-semibold rounded-lg text-lg bg-green-600">
              New Expense
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full mt-8 px-20">
          <div className="text-font-semibold text-2xl">Recents</div>
          <div className="grid">
            <div className="w-40 cursor-pointer h-56 rounded-lg border border-dashed border-slate-300 hover:bg-slate-500/20 flex items-center justify-center">
            <Plus className="text-green-600" size={40}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IncomeMockup;
