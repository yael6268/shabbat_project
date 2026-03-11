export const Shoping2 = ({ shoping, onToggle }) => {
  return (
    <li 
      className={`shop-item ${shoping.checked ? 'checked' : ''}`} 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
    >
      {/* צד ימין: תיבת סימון וטקסט באותה שורה */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <input 
          type="checkbox" 
          checked={shoping.checked} 
          onChange={onToggle}
          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
        />
        <span className="item-name">{shoping.name}</span>
      </div>

      {/* צד שמאל: כמות המוצר */}
      <span className="item-amount" style={{ fontWeight: 'bold' }}>
        {shoping.amount}
      </span>
    </li>
  );
};