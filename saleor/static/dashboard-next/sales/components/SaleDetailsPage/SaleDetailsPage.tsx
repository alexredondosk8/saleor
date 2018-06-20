import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";

import { DISCOUNT_VALUE_TYPES, DiscountValueType } from "../..";
import ActionDialog from "../../../components/ActionDialog";
import Container from "../../../components/Container";
import Form from "../../../components/Form";
import PageHeader from "../../../components/PageHeader";
import {
  SaveButtonBar,
  SaveButtonBarState
} from "../../../components/SaveButtonBar";
import SingleAutocompleteSelectField from "../../../components/SingleAutocompleteSelectField";
import i18n from "../../../i18n";
import SaleCategories from "../SaleCategories/SaleCategories";
import SaleProducts from "../SaleProducts/SaleProducts";
import SaleProperties from "../SaleProperties/SaleProperties";

interface SaleDetailsPageProps {
  sale?: {
    id: string;
    name: string;
    type: DiscountValueType;
    value: number;
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
  categories?: Array<{
    id: string;
    name: string;
    products: {
      totalCount: number;
    };
  }>;
  categorySearchResult?: Array<{
    id: string;
    name: string;
  }>;
  productSearchResult?: Array<{
    id: string;
    name: string;
  }>;
  disabled?: boolean;
  loadingCategories?: boolean;
  loadingProducts?: boolean;
  saveButtonState?: SaveButtonBarState;
  onBack?();
  onCategoriesNextPage?();
  onCategoriesPreviousPage?();
  onCategoryAdd?();
  onFetchCategories?(search: string);
  onFetchProducts?(search: string);
  onProductsNextPage?();
  onProductsPreviousPage?();
  onProductAdd?();
  onSaleDelete?();
  onSubmit?();
}

interface SaleDetailsPageState {
  openedAddCategoryDialog: boolean;
  openedAddProductDialog: boolean;
  openedDeleteSaleDialog: boolean;
}

const decorate = withStyles(theme => ({
  cardSeparator: {
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing.unit
    }
  },
  root: {
    display: "grid" as "grid",
    gridColumnGap: theme.spacing.unit * 2 + "px",
    gridTemplateColumns: "2fr 1fr"
  }
}));

const SaleDetailsPage = decorate<SaleDetailsPageProps>(
  class SaleDetailsPageComponent extends React.Component<
    SaleDetailsPageProps & WithStyles<"cardSeparator" | "root">,
    SaleDetailsPageState
  > {
    state = {
      openedAddCategoryDialog: false,
      openedAddProductDialog: false,
      openedDeleteSaleDialog: false
    };

    toggleDeleteSaleDialog = () => {
      this.setState(prevState => ({
        openedDeleteSaleDialog: !prevState.openedDeleteSaleDialog
      }));
    };

    toggleAddCategoryDialog = () => {
      this.setState(prevState => ({
        openedAddCategoryDialog: !prevState.openedAddCategoryDialog
      }));
    };

    toggleAddProductDialog = () => {
      this.setState(prevState => ({
        openedAddProductDialog: !prevState.openedAddProductDialog
      }));
    };

    render() {
      const {
        categories,
        categorySearchResult,
        classes,
        disabled,
        loadingCategories,
        loadingProducts,
        products,
        productSearchResult,
        sale,
        saveButtonState,
        onBack,
        onFetchCategories,
        onFetchProducts,
        onSaleDelete,
        onSubmit
      } = this.props;
      return (
        <>
          <Form
            initial={{
              name: sale && sale.name ? sale.name : "",
              type:
                sale && sale.type
                  ? sale.type
                  : (DISCOUNT_VALUE_TYPES.percentage as DiscountValueType),
              value: sale && sale.value ? sale.value : 0
            }}
            onSubmit={onSubmit}
          >
            {({ change, data, submit }) => (
              <Container width="md" key={disabled ? "loading" : "ready"}>
                <PageHeader
                  title={sale ? sale.name : undefined}
                  onBack={onBack}
                >
                  <IconButton
                    onClick={
                      !!onSaleDelete ? this.toggleDeleteSaleDialog : undefined
                    }
                    disabled={!onSaleDelete || disabled}
                  >
                    <DeleteIcon />
                  </IconButton>
                </PageHeader>
                <div className={classes.root}>
                  <div>
                    <SaleProperties
                      sale={sale}
                      data={data}
                      onChange={change}
                      disabled={disabled}
                    />
                    <div className={classes.cardSeparator} />
                    <SaleProducts
                      onAdd={this.toggleAddProductDialog}
                      products={products}
                      disabled={disabled}
                    />
                    <div className={classes.cardSeparator} />
                    <SaleCategories
                      categories={categories}
                      onAdd={this.toggleAddCategoryDialog}
                      disabled={disabled}
                    />
                  </div>
                  <div />
                </div>
                <SaveButtonBar onSave={submit} state={saveButtonState} />
              </Container>
            )}
          </Form>
          {sale && (
            <>
              <ActionDialog
                open={this.state.openedDeleteSaleDialog}
                title={i18n.t("Remove sale")}
                variant="delete"
                onClose={this.toggleDeleteSaleDialog}
                onConfirm={onSubmit}
              >
                <DialogContentText
                  dangerouslySetInnerHTML={{
                    __html: i18n.t(
                      "Are you sure you want to remove <strong>{{ name }}</strong>?",
                      { name: sale.name }
                    )
                  }}
                />
              </ActionDialog>
              <Form initial={{ category: { label: "", value: "" } }}>
                {({ change, data, submit }) => (
                  <ActionDialog
                    open={this.state.openedAddCategoryDialog}
                    title={i18n.t("Discount category")}
                    onClose={this.toggleAddCategoryDialog}
                    onConfirm={submit}
                  >
                    <SingleAutocompleteSelectField
                      fetchChoices={onFetchCategories}
                      choices={
                        categorySearchResult
                          ? categorySearchResult.map(c => ({
                              label: c.name,
                              value: c.id
                            }))
                          : []
                      }
                      onChange={change}
                      value={data.category}
                      loading={loadingCategories}
                      name="category"
                      label={i18n.t("Category")}
                    />
                  </ActionDialog>
                )}
              </Form>
              <Form initial={{ product: { label: "", value: "" } }}>
                {({ change, data, submit }) => (
                  <ActionDialog
                    open={this.state.openedAddProductDialog}
                    title={i18n.t("Discount product")}
                    onClose={this.toggleAddProductDialog}
                    onConfirm={submit}
                  >
                    <SingleAutocompleteSelectField
                      fetchChoices={onFetchProducts}
                      choices={
                        productSearchResult
                          ? productSearchResult.map(c => ({
                              label: c.name,
                              value: c.id
                            }))
                          : []
                      }
                      onChange={change}
                      value={data.product}
                      loading={loadingCategories}
                      name="product"
                      label={i18n.t("Product")}
                    />
                  </ActionDialog>
                )}
              </Form>
            </>
          )}
        </>
      );
    }
  }
);
SaleDetailsPage.displayName = "SaleDetailsPage";
export default SaleDetailsPage;
