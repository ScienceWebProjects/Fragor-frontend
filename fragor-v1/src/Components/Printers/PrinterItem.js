// libs
import StyledLink from '../UI/shared/StyledLink';

function PrinterItem(props) {
  const printerDetailsHandler = () => {
    props.onPrinterSelect(props.printer);
    sessionStorage.setItem('printerDetails', JSON.stringify(props.printer));
  };

  return (
    <StyledLink
      to={{
        pathname: `${props.api.printersPage}/${props.printer.name}`,
        state: { printer: props.printer },
      }}
      style={{ cursor: 'pointer', width: '100%' }}
      onClick={printerDetailsHandler}
    >
      {props.printer.name}
    </StyledLink>
  );
}

export default PrinterItem;
