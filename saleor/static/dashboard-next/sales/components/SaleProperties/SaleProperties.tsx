import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as React from "react";

import { DISCOUNT_VALUE_TYPES, DiscountValueType } from "../../";
import FormSpacer from "../../../components/FormSpacer";
import SingleSelectField from "../../../components/SingleSelectField";
import i18n from "../../../i18n";

interface SalePropertiesProps {
  sale?: {
    id: string;
    name: string;
    type: DiscountValueType;
    value: number;
  };
  data?: {
    name: string;
    value: number;
    type: DiscountValueType;
  };
  disabled?: boolean;
  onChange?(event: React.ChangeEvent<any>);
}

const choices = [
  { label: i18n.t("Percentage"), value: DISCOUNT_VALUE_TYPES.percentage },
  { label: i18n.t("Fixed"), value: DISCOUNT_VALUE_TYPES.fixed }
];
const decorate = withStyles(theme => ({
  root: {
    display: "grid" as "grid",
    gridColumnGap: theme.spacing.unit * 2 + "px",
    gridTemplateColumns: "1fr 1fr"
  },
  textRight: {
    textAlign: "right" as "right"
  }
}));
const SaleProperties = decorate<SalePropertiesProps>(
  ({ classes, sale, data, disabled, onChange }) => (
    <Card>
      <CardContent>
        <TextField
          disabled={disabled}
          fullWidth
          label={i18n.t("Name")}
          name="name"
          onChange={onChange}
          value={data.name}
        />
        <FormSpacer />
        <div className={classes.root}>
          <div>
            <TextField
              disabled={disabled}
              fullWidth
              label={i18n.t("Value")}
              name="value"
              onChange={onChange}
              type="number"
              value={data.value}
            />
          </div>
          <div>
            <SingleSelectField
              choices={choices}
              disabled={disabled}
              label={i18n.t("Discount type")}
              name="type"
              onChange={onChange}
              value={data.type}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
);
SaleProperties.displayName = "SaleProperties";
export default SaleProperties;
