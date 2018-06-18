import * as React from "react";

import Container from "../../../components/Container";
import PageHeader from "../../../components/PageHeader";
import i18n from "../../../i18n";
import SaleList from "../SaleList";

interface SaleListPageProps {
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
  onSaleClick?(id: string): () => void;
}

const SaleListPage: React.StatelessComponent<SaleListPageProps> = ({
  currency,
  pageInfo,
  sales,
  onNextPage,
  onPreviousPage,
  onSaleClick
}) => (
  <Container width="md">
    <PageHeader title={i18n.t("Sales")} />
    <SaleList
      currency={currency}
      pageInfo={pageInfo}
      sales={sales}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      onRowClick={onSaleClick}
    />
  </Container>
);
SaleListPage.displayName = "SaleListPage";
export default SaleListPage;
