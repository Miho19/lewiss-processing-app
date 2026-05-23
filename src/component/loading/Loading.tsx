function Loading() {
  return (
    <div className="flex flex-1 w-full space-x-2 justify-center items-center p-6">
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:0.3s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:0.15s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}

export default Loading;
