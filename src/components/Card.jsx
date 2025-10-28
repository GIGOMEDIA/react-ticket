const Card = ({ title, description, icon = null, className = "" }) => {
return (
  <div
    className={`bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
  >
    {icon && (
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-semibold text-gray-800 mb-1 tracking-wide">
      {title}
    </h3>
    <p className="text-gray-700 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);
};

export default Card;

