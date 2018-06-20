import { storiesOf } from "@storybook/react";
import * as React from "react";

import SaleDetailsPage from "../../../sales/components/SaleDetailsPage";
import { sales } from "../../../sales/fixtures";
import Decorator from "../../Decorator";

const sale = sales[0];

storiesOf("Views / Sales / Sale details", module)
  .addDecorator(Decorator)
  .add("default", () => (
    <SaleDetailsPage
      sale={sale}
      products={sale.products.edges.map(edge => edge.node)}
      productSearchResult={sale.products.edges.map(edge => edge.node)}
      categories={sale.categories.edges.map(edge => edge.node)}
      categorySearchResult={sale.categories.edges.map(edge => edge.node)}
      onBack={() => {}}
      onSaleDelete={() => {}}
      onSubmit={() => {}}
    />
  ))
  .add("when loading", () => <SaleDetailsPage disabled onBack={() => {}} />);
