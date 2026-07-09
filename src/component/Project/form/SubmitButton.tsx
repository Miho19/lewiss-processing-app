type Props = {
  isFormSubmitting: boolean;
};

function SubmitButton(props: Props) {
  const { isFormSubmitting } = props;

  return (
    <div className="fixed right-6 top-24 z-100">
      <button
        disabled={isFormSubmitting}
        type="submit"
        className="w-26 flex ml-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1D1D1D] hover:bg-[#393939] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D1D1D] hover:-translate-y-1 transition-all duration-100 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
      >
        Submit
      </button>
    </div>
  );
}

export default SubmitButton;
