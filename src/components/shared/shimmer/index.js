const Shimmer = ({ height = '20px', width = '100%', borderRadius = '4px' }) => {
  return (
    <div
      className="shimmer-wrapper mt-3 mb-2"
      style={{ height, width, borderRadius }}
    >
      <div className="shimmer"></div>
    </div>
  );
};

export default Shimmer;
