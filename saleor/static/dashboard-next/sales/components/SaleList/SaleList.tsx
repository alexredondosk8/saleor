import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";

import { DISCOUNT_VALUE_TYPES } from "../..";
import Money from "../../../components/Money";
import Skeleton from "../../../components/Skeleton";
import TablePagination from "../../../components/TablePagination";
import i18n from "../../../i18n";

interface SaleListProps {
  currency?: string;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  sales?: Array<{
    id: string;
    name: string;
    type: string;
    value: number;
    products: {
      totalCount: number;
    };
    categories: {
      totalCount: number;
    };
  }>;
  onNextPage?();
  onPreviousPage?();
  onRowClick?(id: string): () => void;
}

const decorate = withStyles(theme => ({
  link: {
    color: theme.palette.secondary.main,
    cursor: "pointer" as "pointer"
  },
  textRight: {
    textAlign: "right" as "right"
  }
}));
const SaleList = decorate<SaleListProps>(
  ({
    classes,
    currency,
    pageInfo,
    sales,
    onNextPage,
    onPreviousPage,
    onRowClick
  }) => (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{i18n.t("Name", { context: "object" })}</TableCell>
            <TableCell className={classes.textRight}>
              {i18n.t("Products", { context: "object" })}
            </TableCell>
            <TableCell className={classes.textRight}>
              {i18n.t("Categories", { context: "object" })}
            </TableCell>
            <TableCell className={classes.textRight}>
              {i18n.t("Value", { context: "object" })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={4}
              hasNextPage={pageInfo ? pageInfo.hasNextPage : undefined}
              onNextPage={onNextPage}
              hasPreviousPage={pageInfo ? pageInfo.hasPreviousPage : undefined}
              onPreviousPage={onPreviousPage}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {sales === undefined || sales === null ? (
            <TableRow>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          ) : sales.length > 0 ? (
            sales.map(sale => (
              <TableRow key={sale.id}>
                <TableCell>
                  <span
                    onClick={onRowClick ? onRowClick(sale.id) : undefined}
                    className={onRowClick ? classes.link : ""}
                  >
                    {sale.name}
                  </span>
                </TableCell>
                <TableCell className={classes.textRight}>
                  {sale.products && sale.products.totalCount ? (
                    sale.products.totalCount
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={classes.textRight}>
                  {sale.categories && sale.categories.totalCount ? (
                    sale.categories.totalCount
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={classes.textRight}>
                  {sale.value && currency ? (
                    sale.type === DISCOUNT_VALUE_TYPES.percentage ? (
                      i18n.t("-{{ value }}%", { value: sale.value.toFixed(2) })
                    ) : (
                      <Money amount={sale.value} currency={currency} />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>{i18n.t("No sales found")}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
);
SaleList.displayName = "SaleList";
export default SaleList;
