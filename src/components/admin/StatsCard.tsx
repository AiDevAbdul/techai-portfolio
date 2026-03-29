interface StatsCardProps {
  label: string;
  value: number | string;
  icon?: string;
}

export default function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="bg-primary-section border border-primary-action rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-muted text-sm">{label}</p>
          <p className="text-3xl font-bold text-primary-action mt-2">{value}</p>
        </div>
        {icon && <div className="text-4xl">{icon}</div>}
      </div>
    </div>
  );
}
