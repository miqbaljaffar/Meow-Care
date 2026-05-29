interface QueueCardProps {
  label: string;
  queueNumber: number | string;
  isCurrent?: boolean;
}

export default function QueueCard({ label, queueNumber, isCurrent = false }: QueueCardProps) {
  const bgColor = isCurrent ? 'bg-brand-green' : 'bg-white';
  const textColor = isCurrent ? 'text-white' : 'text-brand-green';
  const labelColor = isCurrent ? 'text-green-100' : 'text-gray-500';
  const borderColor = isCurrent ? 'border-brand-green' : 'border-gray-200';

  return (
    <div
      className={`${bgColor} border ${borderColor} rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-lg`}
      role="status"
      aria-label={`${label}: ${queueNumber}`}
    >
      <p className={`text-xs sm:text-sm font-semibold ${labelColor} uppercase tracking-wide`}>
        {label}
      </p>
      <p className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight ${textColor} mt-2 sm:mt-3`}>
        {queueNumber}
      </p>
    </div>
  );
}