export default function Snackbar({
  message,
  action,
  onAction,
}: {
  message: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="bg-surface-container-highest rounded-[48px] p-4 flex items-center justify-between shadow-xl relative">
      <span className="font-body text-[14px] text-white">{message}</span>
      {action && (
        <button onClick={onAction}>
          <span className="font-body font-extrabold text-[10px] tracking-[1px] uppercase text-primary">
            {action}
          </span>
        </button>
      )}
    </div>
  );
}
