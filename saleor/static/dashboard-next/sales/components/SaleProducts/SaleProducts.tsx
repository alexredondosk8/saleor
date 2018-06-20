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

import Money from "../../../components/Money";
import PageHeader from "../../../components/PageHeader";
import Skeleton from "../../../components/Skeleton";
import StatusLabel from "../../../components/StatusLabel";
import TablePagination from "../../../components/TablePagination";
import i18n from "../../../i18n";

interface SaleProductsProps {
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  products?: Array<{
    id: string;
    name: string;
    sku: string;
    availability: {
      available: boolean;
    };
    price: {
      amount: number;
      currency: string;
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
const SaleProducts = decorate<SaleProductsProps>(
  ({
    classes,
    pageInfo,
    disabled,
    products,
    onAdd,
    onNextPage,
    onPreviousPage,
    onRowClick
  }) => (
    <Card>
      <PageHeader title={i18n.t("Discounted products")}>
        <IconButton onClick={onAdd} disabled={!onAdd || disabled}>
          <AddIcon />
        </IconButton>
      </PageHeader>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{i18n.t("Name", { context: "object" })}</TableCell>
            <TableCell>{i18n.t("SKU", { context: "object" })}</TableCell>
            <TableCell>{i18n.t("Status", { context: "object" })}</TableCell>
            <TableCell className={classes.textRight}>
              {i18n.t("Price", { context: "object" })}
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
          {products === undefined || products === null ? (
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
          ) : products.length > 0 ? (
            products.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <span
                    onClick={onRowClick ? onRowClick(product.id) : undefined}
                    className={onRowClick ? classes.link : ""}
                  >
                    {product && product.name ? product.name : <Skeleton />}
                  </span>
                </TableCell>
                <TableCell>
                  {product && product.sku ? product.sku : <Skeleton />}
                </TableCell>
                <TableCell>
                  {product &&
                  product.availability &&
                  product.availability.available !== undefined ? (
                    <StatusLabel
                      label={
                        product.availability.available
                          ? i18n.t("Available")
                          : i18n.t("Unavailable")
                      }
                      status={
                        product.availability.available ? "success" : "error"
                      }
                    />
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={classes.textRight}>
                  {product && product.price ? (
                    <Money
                      amount={product.price.amount}
                      currency={product.price.currency}
                    />
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                {i18n.t("No discounted products found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
);
SaleProducts.displayName = "SaleProducts";
export default SaleProducts;
