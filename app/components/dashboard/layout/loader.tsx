export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-20">
      <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
      <span className="text-sm text-gray-500">Loading your design...</span>
    </div>
  );
}
