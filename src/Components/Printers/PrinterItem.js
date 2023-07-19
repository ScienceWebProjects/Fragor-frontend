// libs
import StyledLink from '../UI/shared/StyledLink';

function PrinterItem(props) {
  return (
    <StyledLink
      to={`${props.api.printersPage}/${props.printer.name}`}
      style={{ cursor: 'pointer', width: '100%' }}
    >
      {props.printer.name}
    </StyledLink>
  );
}

export default PrinterItem;
