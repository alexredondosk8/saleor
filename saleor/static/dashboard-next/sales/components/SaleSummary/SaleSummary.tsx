import { withStyles } from "@material-ui/core/styles";
import * as React from "react";

interface SaleSummaryProps {}

const decorate = withStyles(theme => ({ root: {} }));
const SaleSummary = decorate<SaleSummaryProps>(({ classes }) => <div />);
SaleSummary.displayName = "SaleSummary";
export default SaleSummary;
