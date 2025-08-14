interface QueueCardProps {
  label: string;
  queueNumber: number | string;
  isCurrent?: boolean;
}

export default function QueueCard({ label, queueNumber, isCurrent = false }: QueueCardProps) {
  const bgColor = isCurrent ? 'bg-brand-green' : 'bg-white';
  const textColor = isCurrent ? 'text-white' : 'text-brand-green';
  const labelColor = isCurrent ? 'text-green-100' : 'text-gray-500';

  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 text-center transition-all duration-300`}>
      <p className={`text-lg font-semibold ${labelColor}`}>{label}</p>
      <p className={`text-6xl font-bold tracking-tight ${textColor}`}>{queueNumber}</p>
    </div>
  );
}