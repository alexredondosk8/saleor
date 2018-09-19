import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";

interface ClickableTableRowProps extends React.StatelessComponent {
  onClick?: (event: React.MouseEvent<any>) => void;
}

const decorate = withStyles({
  row: {
    cursor: "pointer" as "pointer",
  },
});
const ClickableTableRow = decorate<ClickableTableRowProps>(
  ({ classes, children, ...props }) => (
    <>
      <TableRow className={classes.row} hover={true} {...props}>
        {children}
      </TableRow>
    </>
  )
);
ClickableTableRow.displayName = "ClickableTableRow";
export default ClickableTableRow;
