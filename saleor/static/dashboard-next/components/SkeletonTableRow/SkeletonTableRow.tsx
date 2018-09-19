import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";

import Skeleton from "../../components/Skeleton";

interface SkeletonTableRowProps {
  columnsNumber?: number;
}

const SkeletonTableRow: React.StatelessComponent<SkeletonTableRowProps> = ({ columnsNumber }) => {
  const tableCells = new Array(columnsNumber || 1).fill(null).map(
    (_, index) => <TableCell key={index}><Skeleton /></TableCell>
  );
  return (
    <>
      <TableRow>
        {tableCells}
      </TableRow>
    </>
  );
};
SkeletonTableRow.displayName = "SkeletonTableRow";
export default SkeletonTableRow;
