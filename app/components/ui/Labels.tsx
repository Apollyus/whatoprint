interface LabelsProps {
  labels: { [key: string]: string };
}

export function Labels({ labels }: LabelsProps) {
  const getGradient = (key: string) => {
    switch (key) {
      case "label-1":
        return "from-[#FFB800]/20 to-[#FFB800]/20 text-[#FFB800] font-semibold border-2 border-[#FFB800]"; // Yellowish
      case "label-2":
        return "from-[#4ADE80]/20 to-[#4ADE80]/20 text-[#4ADE80] font-semibold border-2 border-[#4ADE80]"; // Greenish
      case "label-3":
        return "from-[#A855F7]/20 to-[#A855F7]/20 text-[#A855F7] font-semibold border-2 border-[#A855F7]"; // Purplish
      case "label-4":
        return "from-[#3B82F6]/20 to-[#3B82F6]/20 text-[#3B82F6] font-semibold border-2 border-[#3B82F6]"; // Bluish
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  // Convert dictionary to array and sort by key to ensure order (label-1, label-2...)
  const labelEntries = Object.entries(labels).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {labelEntries.map(([key, value]) => (
        <span
          key={key}
          className={`px-6 py-1 rounded-full text-base font-medium bg-gradient-to-r ${getGradient(
            key
          )}`}
        >
          {value}
        </span>
      ))}
    </div>
  );
}
