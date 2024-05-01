
const ShimmerCard = () => {
  return (
    <div className="card-container border-2 border-gray-300 px-4 pt-4 pb-2 shadow-lg rounded-2xl lg:w-[25%] animate-pulse bg-white">
      <div className="company-card flex gap-2 justify-center lg:justify-start">
        <div className="company-logo">
          <div className="shimmer-placeholder w-16 h-16 rounded-full bg-gray-200"></div>
        </div>
        <div className="company-info">
          <div className="shimmer-placeholder w-32 h-6 mb-2 bg-gray-200"></div>
          <div className="shimmer-placeholder w-20 h-4 mb-1 bg-gray-200"></div>
          <div className="shimmer-placeholder w-24 h-4 bg-gray-200"></div>
        </div>
      </div>

      <div className="job-details mt-5">
        <div className="shimmer-placeholder w-40 h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 mb-2 bg-gray-200"></div>
        <div className="shimmer-placeholder w-[90%] h-4 bg-gray-200"></div>
        <div className="shimmer-placeholder mt-6 w-full h-10 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
