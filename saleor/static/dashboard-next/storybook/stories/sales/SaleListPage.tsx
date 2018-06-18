import { storiesOf } from "@storybook/react";
import * as React from "react";

import SaleListPage from "../../../sales/components/SaleListPage";
import { sales } from "../../../sales/fixtures";
import Decorator from "../../Decorator";

storiesOf("Views / Sales / Sale list", module)
  .addDecorator(Decorator)
  .add("when loaded data", () => (
    <SaleListPage currency="USD" sales={sales} onSaleClick={() => () => {}} />
  ))
  .add("when loading data", () => <SaleListPage />);
