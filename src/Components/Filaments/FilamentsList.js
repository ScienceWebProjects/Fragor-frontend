// libs

// components
import FilamentItem from './UI/FilamentItem';

const FilamentsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <h1 style={{ padding: '0.2rem 2rem', color: '#000' }}>Found no filaments.</h1>
      </div>
    );
  }

  return (
    <ul>
      {props.items.map((filament) => (
        <FilamentItem
          key={filament.id}
          quantity={filament.quantity}
          type={filament.type}
          color={filament.color}
          hotbed={filament.hotbed}
          hotend={filament.hotend}
        />
      ))}
    </ul>
  );
};

export default FilamentsList;
