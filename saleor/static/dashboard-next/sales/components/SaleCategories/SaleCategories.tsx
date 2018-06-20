import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import * as React from "react";

import PageHeader from "../../../components/PageHeader";
import Skeleton from "../../../components/Skeleton";
import TablePagination from "../../../components/TablePagination";
import i18n from "../../../i18n";

interface SaleCategoriesProps {
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  categories?: Array<{
    id: string;
    name: string;
    products: {
      totalCount: number;
    };
  }>;
  disabled?: boolean;
  onAdd?();
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
const SaleCategories = decorate<SaleCategoriesProps>(
  ({
    classes,
    pageInfo,
    categories,
    disabled,
    onAdd,
    onNextPage,
    onPreviousPage,
    onRowClick
  }) => (
    <Card>
      <PageHeader title={i18n.t("Discounted categories")}>
        <IconButton onClick={onAdd} disabled={!onAdd || disabled}>
          <AddIcon />
        </IconButton>{" "}
      </PageHeader>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{i18n.t("Name", { context: "object" })}</TableCell>
            <TableCell className={classes.textRight}>
              {i18n.t("Products", { context: "object" })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={2}
              hasNextPage={pageInfo ? pageInfo.hasNextPage : undefined}
              onNextPage={onNextPage}
              hasPreviousPage={pageInfo ? pageInfo.hasPreviousPage : undefined}
              onPreviousPage={onPreviousPage}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {categories === undefined || categories === null ? (
            <TableRow>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          ) : categories.length > 0 ? (
            categories.map(category => (
              <TableRow key={category.id}>
                <TableCell>
                  <span
                    onClick={onRowClick ? onRowClick(category.id) : undefined}
                    className={onRowClick ? classes.link : ""}
                  >
                    {category && category.name ? category.name : <Skeleton />}
                  </span>
                </TableCell>
                <TableCell className={classes.textRight}>
                  {category &&
                  category.products &&
                  category.products.totalCount !== undefined ? (
                    category.products.totalCount
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>
                {i18n.t("No discounted categories found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
);
SaleCategories.displayName = "SaleCategories";
export default SaleCategories;
